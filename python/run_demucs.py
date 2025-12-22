import subprocess
import os
import glob


INPUT_DIR = "dataset/processed_tracks"

OUTPUT_DIR = "dataset/separated_oud"

def separate_sources():
    # Find all mp3s
    tracks = glob.glob(os.path.join(INPUT_DIR, "*.mp3"))
    
    if not tracks:
        print("No tracks found! Run auto_slicer.py first.")
        return

    print(f"Found {len(tracks)} tracks to process with Demucs.")

    for track in tracks:
        print(f"--> Separating: {track}")
        
        
       
        cmd = [
            "demucs",
            "-n", "htdemucs", 
            "--two-stems", "other", 
            "-o", OUTPUT_DIR,
            track
        ]
        
        subprocess.run(cmd)

if __name__ == "__main__":
    separate_sources()