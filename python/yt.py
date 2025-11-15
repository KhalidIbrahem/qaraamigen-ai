import subprocess
import os
import requests

# --- CONFIGURATION ---
HARVARD_DIR = "dataset/harvard_audio"
YOUTUBE_DIR = "dataset/youtube_downloads"

os.makedirs(HARVARD_DIR, exist_ok=True)
os.makedirs(YOUTUBE_DIR, exist_ok=True)

def download_with_ytdlp(url, output_path, is_youtube=False):
    print(f"\n--- STARTING DOWNLOAD ---")
    print(f"URL: {url}")

    # base command
    cmd = ["yt-dlp", url]

    if is_youtube:
        # 1. Corrected flag: --no-playlist
        # 2. Ensures high quality mp4 merging
        cmd += [
            "-o", os.path.join(output_path, "%(title)s.%(ext)s"),
            "--no-playlist",
            "--format", "bestvideo+bestaudio/best",
            "--merge-output-format", "mp4"
        ]
    else:
        # For Harvard: use --impersonate to mimic a real browser fingerprint
        # This is often more effective than just a User-Agent string.
        cmd += [
            "-o", os.path.join(output_path, "harvard_audio.mp3"),
            "--impersonate", "chrome",
            "--referer", "https://nrs.lib.harvard.edu/",
            "--no-check-certificate"
        ]

    try:
        subprocess.run(cmd, check=True)
        print(f"--- [SUCCESS] Saved to {output_path} ---")
    except subprocess.CalledProcessError as e:
        print(f"--- [FAILED] Download error. Check if FFmpeg is installed and yt-dlp is updated. ---")

def process_harvard_link(url):
    """Follows redirects before downloading."""
    session = requests.Session()
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
    try:
        response = session.get(url, headers=headers, allow_redirects=True)
        final_url = response.url
        print(f"Resolved Harvard URL: {final_url}")
        download_with_ytdlp(final_url, HARVARD_DIR, is_youtube=False)
    except Exception as e:
        print(f"Failed to resolve Harvard link: {e}")

if __name__ == "__main__":
    # 1. Harvard Link
    h_url = "https://nrs.lib.harvard.edu/urn-3:fhcl.loeb:42390430"
    process_harvard_link(h_url)

    # 2. YouTube Link (Radio/Playlist mix)
    y_url = "https://www.youtube.com/watch?v=fZJYdJ9yhNQ&list=RDfZJYdJ9yhNQ&start_radio=1"
    download_with_ytdlp(y_url, YOUTUBE_DIR, is_youtube=True)