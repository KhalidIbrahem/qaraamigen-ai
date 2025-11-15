import numpy as np
from scipy.io import wavfile
import random



SR = 44100  # Sample Rate
BPM = 120   # Classic Dhaanto Tempo
BEAT_DUR = 90 / BPM
TOTAL_MINUTES = 2.0
TOTAL_SECONDS = TOTAL_MINUTES * 60

# --- HELPER: SAFE ADDITION ---
def add_sound_safe(buffer, sound, start_pos):
    """
    Safely adds a sound array to a buffer, clipping if it goes past the end.
    Prevents ValueError operands could not be broadcast together.
    """
    if start_pos >= len(buffer):
        return
        
    end_pos = start_pos + len(sound)
    
    # If sound fits perfectly
    if end_pos <= len(buffer):
        buffer[start_pos:end_pos] += sound
    else:
        # Sound is too long, trim it
        available_space = len(buffer) - start_pos
        buffer[start_pos:] += sound[:available_space]

# --- 1. SOUND DESIGN ENGINES ---

def generate_oud_pluck(freq, duration, volume=1.0):
    """
    Simulates a Somali Oud with dual strings (Chorus Effect).
    """
    n_samples = int(SR * duration)
    t = np.arange(n_samples) / SR
    
    # Physics: Exponential Decay (Pluck)
    envelope = np.exp(-4.0 * t) 
    
    # String 1 (Fundamental)
    wave1 = 0.6 * np.sin(2 * np.pi * freq * t)
    wave1 += 0.3 * np.sin(2 * np.pi * (freq * 2) * t) 
    wave1 += 0.1 * np.sin(2 * np.pi * (freq * 3) * t) 

    # String 2 (Slightly Detuned for Chorus Effect)
    detune = 1.002 # 0.2% variance
    wave2 = 0.6 * np.sin(2 * np.pi * (freq * detune) * t)
    wave2 += 0.3 * np.sin(2 * np.pi * (freq * 2 * detune) * t)
    wave2 += 0.1 * np.sin(2 * np.pi * (freq * 3 * detune) * t)

    # Combine
    sound = (wave1 + wave2) * 0.5 * envelope * volume
    return sound

def generate_drum_hit(type="kick"):
    """Procedural Percussion Synthesis"""
    dur = 0.3
    t = np.arange(int(SR * dur)) / SR
    
    if type == "kick":
        # Pitch sweep 150Hz -> 50Hz
        freq_sweep = np.linspace(150, 50, len(t))
        wave = np.sin(2 * np.pi * freq_sweep * t)
        env = np.exp(-10 * t)
        return wave * env * 0.8
        
    elif type == "clap":
        # Filtered White Noise
        noise = np.random.uniform(-1, 1, len(t))
        env = np.exp(-20 * t) 
        return noise * env * 0.4
    
    return np.zeros_like(t)

# --- 2. RHYTHM SECTION (The Dhaanto Loop) ---

def create_background_loop(total_len_samples):
    print("   -> Synthesizing Dhaanto Percussion...")
    buffer = np.zeros(total_len_samples)
    
    # 1 Bar = 4 Beats
    bar_samples = int(BEAT_DUR * 4 * SR)
    
    # Create one bar of rhythm
    one_bar = np.zeros(bar_samples)
    
    kick = generate_drum_hit("kick")
    clap = generate_drum_hit("clap")
    
    # Kick on 1
    add_sound_safe(one_bar, kick, 0)
    
    # Clap on 2 (The "Catch")
    pos_2 = int(BEAT_DUR * 1 * SR)
    add_sound_safe(one_bar, clap, pos_2)

    # Kick on 3
    pos_3 = int(BEAT_DUR * 2 * SR)
    add_sound_safe(one_bar, kick, pos_3)

    # Clap on 4
    pos_4 = int(BEAT_DUR * 3 * SR)
    add_sound_safe(one_bar, clap, pos_4)
    
    # "Ghost" clap for swing (on the 'and' of 4)

    pos_swing = int(BEAT_DUR * 3.5 * SR)
    add_sound_safe(one_bar, clap * 0.5, pos_swing)

    # Loop this bar to fill the duration
    current_pos = 0
    while current_pos < total_len_samples:
        add_sound_safe(buffer, one_bar, current_pos)
        current_pos += bar_samples
        
    return buffer

# --- 3. MELODY COMPOSER (The "Brain") ---

def compose_melody(total_len_samples):
    print("   -> Composing Oud Improvisation...")
    buffer = np.zeros(total_len_samples)
    
    # Qaraami Scale: A Minor Pentatonic
    scale = [52, 55, 57, 60, 62, 64, 67, 69, 72, 74, 76]
    
    current_idx = 4 
    current_time = 0.0
    
    # Structure Anchors (Low -> High -> Low)
    def get_gravity_target(progress):
        if progress < 0.2: return 2   # Intro: Low
        if progress < 0.5: return 5   # Verse: Mid
        if progress < 0.8: return 9   # Solo: High/Fast
        return 2                      # Outro: Low
    
    while current_time < TOTAL_SECONDS:
        
        progress = current_time / TOTAL_SECONDS
        target_idx = get_gravity_target(progress)
        
        # Pitch Logic
        dist = target_idx - current_idx
        if abs(dist) > 3:
            step = 1 if dist > 0 else -1
        else:
            step = random.choice([-1, -1, 0, 1, 1, 2, -2])
            
        current_idx += step
        current_idx = max(0, min(len(scale)-1, current_idx))
        midi_note = scale[current_idx]
        freq = 440.0 * (2 ** ((midi_note - 69) / 12))
        
        # Rhythm Logic
        rhythm_choice = random.choices([0.5, 1.0, 1.5], weights=[50, 40, 10])[0]
        
        # Swing Logic
        swing_delay = 0.0
        beat_pos = (current_time / BEAT_DUR) % 4
        if rhythm_choice == 0.5 and (beat_pos % 1) > 0.4:
            swing_delay = 0.05 
            
        # Render Note
        duration_sec = rhythm_choice * BEAT_DUR
        
        if random.random() < 0.9: # 10% chance of silence
            loudness = random.uniform(0.7, 1.0)
            note_audio = generate_oud_pluck(freq, duration_sec * 1.5, loudness)
            
            start_samp = int((current_time + swing_delay) * SR)
            add_sound_safe(buffer, note_audio, start_samp)
        
        current_time += duration_sec

    return buffer

# --- 4. MIXER & FX ---

def apply_reverb(signal):
    print("   -> Applying Hall Reverb...")
    delay_ms = 250
    decay = 0.4
    delay_samples = int(delay_ms * SR / 1000)
    
    # Create the echo
    echo = np.zeros_like(signal)
    # Only shift if delay is smaller than signal
    if len(signal) > delay_samples:
        echo[delay_samples:] = signal[:-delay_samples]
    
    return signal + (echo * decay)

def main():
    print(f"Generating {TOTAL_MINUTES} minute Qaraami Masterpiece...")
    total_samples = int(SR * TOTAL_SECONDS)
    
    # 1. Generate Layers
    drums = create_background_loop(total_samples)
    oud = compose_melody(total_samples)
    
    # 2. Apply FX
    oud_wet = apply_reverb(oud)
    
    # 3. Mix
    print("   -> Mixing Tracks...")
    final_mix = (drums * 1.0) + (oud_wet * 0.8)
    
    # 4. Master
    max_val = np.max(np.abs(final_mix))
    if max_val > 0:
        final_mix = final_mix / max_val
    
    # 5. Export
    filename = "qaraami_masterpiece.wav"
    wavfile.write(filename, SR, (final_mix * 32767).astype(np.int16))
    print(f"DONE! File saved as: {filename}")

if __name__ == "__main__":
    main()