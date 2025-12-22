import requests
from bs4 import BeautifulSoup
import subprocess
import os
import re

# --- CONFIGURATION ---
TARGET_URL = "https://nrs.lib.harvard.edu/urn-3:fhcl.loeb:33901487"
OUTPUT_DIR = "dataset/harvard_audio_direct"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def download_stream(url, filename):
    print(f"   Downloading to: {filename}")
    cmd = [
        "yt-dlp",
        url,
        "-o", filename,
 
        "--user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "--referer", "https://nrs.lib.harvard.edu/",
        "--no-check-certificate", 
        "--quiet", "--no-warnings"
    ]
    try:
        subprocess.run(cmd, check=True)
        print(f"   [SUCCESS] Saved.")
    except subprocess.CalledProcessError:
        print(f"   [FAILED] Download error.")
        
        
        
def parse_harvard_page(url):
    print(f"--- ANALYZING HARVARD LINK ---")
    
    session = requests.Session()
   
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Referer': 'https://library.harvard.edu/'
    }
    session.headers.update(headers)
    
    try:
        response = session.get(url, allow_redirects=True)
        final_url = response.url
        print(f"Resolved URL: {final_url}")
        
         
        # it's usually an HLS manifest or a player page.
        if "mps.lib.harvard.edu/sds/audio/" in final_url:
            filename = os.path.join(OUTPUT_DIR, "harvard_audio_direct.mp3")
            download_stream(final_url, filename)
            return

        # Fallback to BeautifulSoup parsing if direct download fails...
      

    except Exception as e:
        print(f"   [CRITICAL] Script encountered an error: {e}")

if __name__ == "__main__":
    parse_harvard_page(TARGET_URL)