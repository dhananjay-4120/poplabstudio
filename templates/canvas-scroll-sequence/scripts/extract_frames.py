import os
import sys
import subprocess
import argparse

def extract_frames(video_path, output_dir, fps=30, width=1920):
    if not os.path.exists(video_path):
        print(f"Error: Video file '{video_path}' does not exist.")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)
    print(f"[*] Extracting frames from '{video_path}' at {fps}fps...")

    # Use ffmpeg to export clean, lightweight WebP frames
    cmd = [
        "ffmpeg",
        "-i", video_path,
        "-vf", f"fps={fps},scale={width}:-1",
        "-c:v", "libwebp",
        "-lossless", "0",
        "-q:v", "80",
        os.path.join(output_dir, "frame_%04d.webp")
    ]
    
    try:
        subprocess.run(cmd, check=True)
        count = len([f for f in os.listdir(output_dir) if f.endswith(".webp")])
        print(f"[+] Successfully extracted {count} WebP frames into '{output_dir}'.")
    except Exception as e:
        print(f"Error extracting frames: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split video into optimized WebP sequence for Apple-style scroll canvas")
    parser.add_argument("video", help="Path to input video (.mp4)")
    parser.add_argument("-o", "--output", default="./public/sequence", help="Output directory for frames")
    parser.add_argument("--fps", type=int, default=30, help="Frames per second to sample (default: 30)")
    parser.add_argument("--width", type=int, default=1920, help="Output width in px (default: 1920)")
    args = parser.parse_args()

    extract_frames(args.video, args.output, args.fps, args.width)