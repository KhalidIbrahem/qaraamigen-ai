import numpy as np
from scipy.io import wavfile
import random

# ==============================================================================
# PROJECT: PROCEDURAL OUD ENGINE (PHYSICS-BASED MODELING)
# Author: KHALID IBRAHIM
# 
# ==============================================================================

class OudSynthesizer:
    """
    A Karplus-Strong physical model implementation using only NumPy.
    Simulates the physics of a plucked string instrument (Somali Oud).
    """
    def __init__(self, sample_rate=44100):
        self.sr = sample_rate
        self.decay_factor = 0.996  # High decay = metallic/string sound
        
    def generate_string_pluck(self, freq, duration_sec):
        """
        Simulates a string pluck using a ring buffer (Delay Line).
        P = SampleRate / Frequency
        """
        if freq == 0: # Rest
            return np.zeros(int(self.sr * duration_sec))

        # 1. Calculate Delay Line Length (The Physics of Pitch)
        N = int(self.sr / freq)
        
        # 2. Excitation (The Pluck)
        # Initialize ring buffer with white noise (energy burst)
        ring_buffer = np.random.uniform(-1, 1, N)
        
        # 3. Simulation Loop (Karplus-Strong Algorithm)
        # Output length
        n_samples = int(self.sr * duration_sec)
        output = np.zeros(n_samples)
        
        # Pointer for ring buffer
        ptr = 0
        
        for i in range(n_samples):
            output[i] = ring_buffer[ptr]
            
            # Low-Pass Filtering (Simulates energy loss/acoustic absorption)
            # Average current sample and previous sample
            prev_val = ring_buffer[ptr]
            next_ptr = (ptr + 1) % N
            curr_val = ring_buffer[next_ptr]
            
            # Update buffer with decayed average
            new_val = 0.5 * (prev_val + curr_val) * self.decay_factor
            ring_buffer[ptr] = new_val
            
            # Increment pointer
            ptr = next_ptr
            
        return output

class DhaantoSequencer:
    """
    Custom sequencer handling the 'Camel Gait' (Galloping Swing).
    Unlike Western 4/4 quantization, this applies a micro-timing offset.
    """
    def __init__(self, synth, bpm=110):
        self.synth = synth
        self.bpm = bpm
        self.beat_dur = 60 / bpm
        
    def apply_somali_swing(self, note_type, note_index):
        """
        Calculates duration based on Dhaanto Polyrhythm.
        Instead of equal 8th notes (50/50), we use a Lilt (approx 58/42 or 60/40).
        """
        if note_type == "quarter":
            return self.beat_dur
        
        elif note_type == "eighth":
            # If it's the DOWN beat (1, 2, 3, 4) -> Longer
            if note_index % 2 == 0:
                swing_ratio = 0.60 # The "Gallop" Step
            # If it's the UP beat (The 'and') -> Shorter
            else:
                swing_ratio = 0.40 # The Catch Step
                
            return self.beat_dur * swing_ratio * 2 # *2 because beat_dur is quarter

    def render_measure(self, melody_indices):
        """
        Renders a sequence of notes using the scale and swing logic.
        """
        # Pentatonic Scale (Approximating Oud Maqam)
        # Root, b2 (approx), 4, 5, b7
        freqs = {
            0: 0,       # Rest
            1: 146.83,  # D3 (Root)
            2: 174.61,  # F3 (Minor 3rd)
            3: 196.00,  # G3 (4th)
            4: 220.00,  # A3 (5th)
            5: 261.63,  # C4 (Minor 7th)
            6: 293.66   # D4 (Octave)
        }
        
        audio_buffer = []
        
        for idx, scale_degree in enumerate(melody_indices):
            freq = freqs.get(scale_degree, 0)
            
            # Apply Dhaanto Swing Logic
            duration = self.apply_somali_swing("eighth", idx)
            
            # Synthesize
            pluck = self.synth.generate_string_pluck(freq, duration)
            audio_buffer.append(pluck)
            
        return np.concatenate(audio_buffer)

# --- EXECUTION ---
if __name__ == "__main__":
    print("Initializing Oud Physics Engine...")
    oud = OudSynthesizer(sample_rate=44100)
    seq = DhaantoSequencer(oud, bpm=108)
    
    # A typical Dhaanto repeating phrase (8 notes per bar)
    # Note sequence simulates the pentatonic melody
    pattern = [1, 1, 4, 3, 1, 0, 5, 4,  1, 1, 6, 5, 4, 3, 1, 0]
    
    print("Synthesizing Dhaanto Rhythm with Micro-timing...")
    wave_data = seq.render_measure(pattern)
    
    # Normalize and Save
    wave_data = wave_data / np.max(np.abs(wave_data))
    wavfile.write("dhaanto_simulation.wav", 44100, (wave_data * 32767).astype(np.int16))
    print("Done. Generated 'dhaanto_simulation.wav'")