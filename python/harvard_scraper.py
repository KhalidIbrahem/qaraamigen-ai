import requests
from bs4 import BeautifulSoup
import subprocess
import os
import time
import re

# --- CONFIGURATION ---
INPUT_FILE = 'harvard_somali_data.csv'
OUTPUT_DIR = 'dataset/audio_files'

os.makedirs(OUTPUT_DIR, exist_ok=True)

# --- 1. NETWORK FUNCTIONS ---


def resolve_nrs_link(nrs_url):

    try:

        response = requests.head(nrs_url, allow_redirects=True, timeout=5)
        final_url = response.url

        # Check if the final destination is the Media Server (MPS/SDS)
        if 'mps.lib.harvard.edu' in final_url or 'sds' in final_url:
            return final_url
        return None
    except:
        return None


def get_audio_url(component_id):
    """
    Scrapes the catalog page for ANY link that looks like a digital object.
    """
    # Try the finding aid URL
    catalog_url = f"https://id.lib.harvard.edu/ead/c/{component_id}/catalog"

    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(catalog_url, headers=headers, timeout=10)

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')

            all_links = soup.find_all('a', href=True)

            for link in all_links:
                href = link['href']

                # Check for NRS links
                if 'nrs.harvard.edu' in href:
                    resolved = resolve_nrs_link(href)
                    if resolved:
                        return resolved

                # Check for direct MPS/SDS links (rare but possible)
                if 'mps.lib.harvard.edu' in href:
                    return href

                # Check for "Listen" text specifically
                if link.string and "Listen" in link.string:
                    if 'nrs' in href:
                        return resolve_nrs_link(href)
                    return href

        return None
    except Exception as e:
        # print(f"Debug: {e}")
        return None


def download_audio(url, filename):
    if os.path.exists(filename):
        print(f"   [EXISTS] Skipping.")
        return

    # Use yt-dlp to handle the stream
    cmd = [
        "yt-dlp",
        url,
        "-o", filename,
        "--quiet", "--no-warnings"
    ]

    try:
        subprocess.run(cmd, check=True)
        print(f"   [SUCCESS] Downloaded: {os.path.basename(filename)}")
    except:
        print(f"   [ERROR] Download failed.")

# --- 2. PARSER LOOP ---


print(f"--- PARSING HARVARD ARCHIVE (NRS RESOLVER MODE) ---")

track_count = 0

with open(INPUT_FILE, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        # 1. Regex to find ID
        id_match = re.search(r'(mus00044c\d+)', line)

        if id_match:
            mus_id = id_match.group(1)

            # 2. Improved Title Extraction

            clean_line = line.replace(mus_id, "").strip()

            # Split by tabs first, take the longest segment usually being the title
            parts = [p.strip() for p in re.split(
                r'\t|,', clean_line) if len(p.strip()) > 3]

            if parts:
                raw_title = parts[0]
                safe_title = re.sub(
                    r'[^\w\s-]', '', raw_title)[:40].strip().replace(" ", "_")
            else:
                safe_title = "Audio_Track"

            print(f"Checking: {mus_id} | {safe_title}")

            # 3. Get Audio Link
            audio_url = get_audio_url(mus_id)

            if audio_url:
                print(f"   -> FOUND AUDIO: {audio_url}")
                filename = os.path.join(
                    OUTPUT_DIR, f"{mus_id}_{safe_title}.mp3")
                download_audio(audio_url, filename)
                track_count += 1
                time.sleep(1)
            else:
                pass


print(f"\nDone. Processed {track_count} files.")
