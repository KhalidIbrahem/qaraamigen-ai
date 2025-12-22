from pydub import AudioSegment
from pydub.silence import split_on_silence
import os


INPUT_AUDIO = "dataset/harvard_audio_direct/extracted_audio.mp3" 
OUTPUT_DIR = "dataset/processed_tracks"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def slice_audio():
    print(f"Loading {INPUT_AUDIO} (this might take a moment)...")
    sound = AudioSegment.from_mp3(INPUT_AUDIO)
    
    print("Detecting songs based on silence...")
    # Adjust min_silence_len (ms) and silence_thresh (dB) based on the recording noise
    chunks = split_on_silence(
        sound, 
        min_silence_len=2000, # Must be silent for 2 seconds
        silence_thresh=-32    # Silence threshold (adjust if tape hiss is loud)
    )

    print(f"Found {len(chunks)} potential tracks.")

    for i, chunk in enumerate(chunks):
        # Filter out tiny chunks (noise) less than 30 seconds
        if len(chunk) < 30000:
            continue
            
        out_file = os.path.join(OUTPUT_DIR, f"track_{i+1}.mp3")
        print(f"Exporting {out_file}...")
        chunk.export(out_file, format="mp3")

if __name__ == "__main__":
    slice_audio()