import numpy as np
import librosa
from qaraami_mir import QaraamiExtractor
import os
import glob

# DEMUCS OUTPUT FOLDER
INPUT_STEMS_DIR = "dataset/separated_oud/htdemucs"


def extract_smart_notes(y, sr):
    """
    Uses Onset Detection to find actual musical notes, ignoring noise.
    """
    print("   -> Detecting Onsets (Plucks)...")

    onset_frames = librosa.onset.onset_detect(y=y, sr=sr, backtrack=True)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)

    print("   -> Detecting Pitch (F0)...")
    # 2. Extract Pitch for the whole file
    # fmin=70 (D2) to fmax=400 (G4) covers the Oud range
    f0, voiced_flag, voiced_probs = librosa.pyin(y, fmin=70, fmax=400, sr=sr)
    times = librosa.times_like(f0, sr=sr)

    notes_events = []

    # 3. Align Pitch to Onsets
    # We look at the time BETWEEN two onsets to determine the note
    for i in range(len(onset_times) - 1):
        start_t = onset_times[i]
        end_t = onset_times[i+1]
        duration = end_t - start_t

        # Find indices in the F0 array that correspond to this time slice
        idx_start = np.searchsorted(times, start_t)
        idx_end = np.searchsorted(times, end_t)

        # Get all pitch readings for this one note
        pitch_segment = f0[idx_start:idx_end]

        # Filter out silence (NaNs)
        clean_segment = pitch_segment[~np.isnan(pitch_segment)]

        if len(clean_segment) > 0:
            # TAKE THE MEDIAN: This removes vibrato and sliding noise
            median_pitch = np.median(clean_segment)

            # Filter out obvious errors (e.g., extremely low bass rumble)
            if median_pitch > 60:
                notes_events.append({
                    'pitch': median_pitch,
                    'duration': duration
                })

    return notes_events


def transcribe_collection():
    # Find the 'other.wav' files recursively
    oud_tracks = glob.glob(f"{INPUT_STEMS_DIR}/**/other.wav", recursive=True)

    if not oud_tracks:
        print(
            f"No 'other.wav' files found in {INPUT_STEMS_DIR}. Did you run Demucs?")
        return

    extractor = QaraamiExtractor()

    for audio_path in oud_tracks:
        print(f"--- Processing: {audio_path} ---")

        try:
            # Load first 60 seconds (enough for a portfolio demo)
            y, sr = librosa.load(audio_path, sr=22050, duration=60)

            # Run the new "Smart" extraction
            note_events = extract_smart_notes(y, sr)

            print(f"   -> Found {len(note_events)} distinct notes.")

            if len(note_events) > 0:
                # Analyze using your MIR tool (V2 Logic)
                analysis = extractor.analyze_note_events(note_events)

                track_name = audio_path.split(os.sep)[-2]
                os.makedirs("dataset/sheet_music", exist_ok=True)
                xml_filename = f"dataset/sheet_music/{track_name}.musicxml"

                extractor.export_musicxml(analysis, xml_filename)
            else:
                print(
                    "   [SKIP] No clear notes detected (Audio might be silent).")

        except Exception as e:
            print(f"   [ERROR] Failed to process track: {e}")


if __name__ == "__main__":
    transcribe_collection()
