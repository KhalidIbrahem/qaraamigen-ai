import numpy as np
import xml.etree.ElementTree as ET
from xml.dom import minidom

class QaraamiExtractor:
    """
    V3: Fixed MusicXML Duration Logic so notes appear in MuseScore.
    """
    def __init__(self):
        self.MICROTONE_THRESHOLDS = [150, 350] 

    def analyze_note_events(self, note_events):
        """
        Input: List of dictionaries [{'pitch': 146.8, 'duration': 0.5}, ...]
        Output: List of processed notes with MIDI and Microtone data.
        """
        processed_notes = []
        
        for event in note_events:
            freq = event['pitch']
            duration = event['duration']
            
            if freq <= 0 or np.isnan(freq): continue 

            # Convert Hz to MIDI
            midi_float = 69 + 12 * np.log2(freq / 440.0)
            midi_int = int(round(midi_float))
            
            # Calculate deviation (Cents)
            deviation = (midi_float - midi_int) * 100
            
            # Detect Microtone
            note_type = "Standard"
            if abs(deviation) > 35: 
                note_type = "Microtonal_Neutral"
            
            # Calculate Rhythm Type
            # We enforce a 'Divisions' value of 4 in the XML
            # Quarter = 4, Eighth = 2, 16th = 1, Half = 8
            xml_type = "quarter"
            xml_duration = 4
            
            if duration < 0.2: 
                xml_type = "16th"
                xml_duration = 1
            elif duration < 0.4: 
                xml_type = "eighth"
                xml_duration = 2
            elif duration < 0.8: 
                xml_type = "quarter"
                xml_duration = 4
            else: 
                xml_type = "half"
                xml_duration = 8

            processed_notes.append({
                "midi": midi_int,
                "cents_dev": deviation,
                "type": note_type,
                "rhythm_type": xml_type,
                "xml_duration": xml_duration
            })
            
        return processed_notes

    def export_musicxml(self, notes_data, filename="qaraami_sheet.xml"):
        score = ET.Element("score-partwise", version="3.1")
        part_list = ET.SubElement(score, "part-list")
        score_part = ET.SubElement(part_list, "score-part", id="P1")
        ET.SubElement(score_part, "part-name").text = "Somali Oud (AI)"
        
        part = ET.SubElement(score, "part", id="P1")
        measure = ET.SubElement(part, "measure", number="1")
        
        # Setup Attributes
        attributes = ET.SubElement(measure, "attributes")
        divisions = ET.SubElement(attributes, "divisions")
       
        divisions.text = "4" 
        
        ET.SubElement(ET.SubElement(attributes, "key"), "fifths").text = "0"
        
        time = ET.SubElement(attributes, "time")
        ET.SubElement(time, "beats").text = "4"
        ET.SubElement(time, "beat-type").text = "4"
        
        clef = ET.SubElement(attributes, "clef")
        ET.SubElement(clef, "sign").text = "G"
        ET.SubElement(clef, "line").text = "2"

        step_map = {0:'C', 1:'C', 2:'D', 3:'D', 4:'E', 5:'F', 6:'F', 7:'G', 8:'G', 9:'A', 10:'A', 11:'B'}
        
        current_measure_duration = 0
        MAX_MEASURE_DURATION = 16 
        measure_count = 1

        for i, note_info in enumerate(notes_data):
            if i > 500: break 
            
            if current_measure_duration + note_info['xml_duration'] > MAX_MEASURE_DURATION:
                measure = ET.SubElement(part, "measure", number=str(measure_count + 1))
                measure_count += 1
                current_measure_duration = 0

            note = ET.SubElement(measure, "note")
            
            # Pitch
            pitch = ET.SubElement(note, "pitch")
            midi_val = note_info['midi']
            octave_val = (midi_val // 12) - 1
            step_val = step_map.get(midi_val % 12, 'C')
            
            ET.SubElement(pitch, "step").text = step_val
            ET.SubElement(pitch, "octave").text = str(octave_val)
            
            # Alter (Sharps/Flats)
            remainder = midi_val % 12
            if remainder in [1, 3, 6, 8, 10]:
                ET.SubElement(pitch, "alter").text = "1" 
                # (Optional: Add accidental display here if needed)
            
            # Microtones
            if note_info['type'] == "Microtonal_Neutral":
                alter = pitch.find("alter")
                if alter is None: alter = ET.SubElement(pitch, "alter")
                alter.text = f"{note_info['cents_dev'] / 100.0:.2f}" 
            
            # ---  DURATION ---
       
            ET.SubElement(note, "duration").text = str(note_info['xml_duration'])
            ET.SubElement(note, "type").text = note_info['rhythm_type']
            
            current_measure_duration += note_info['xml_duration']

        xmlstr = minidom.parseString(ET.tostring(score)).toprettyxml(indent="   ")
        with open(filename, "w") as f:
            f.write(xmlstr)
        print(f"   [SUCCESS] XML Saved: {filename}")