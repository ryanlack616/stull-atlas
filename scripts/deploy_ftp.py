#!/usr/bin/env python3
"""Deploy stull-atlas dist/ + brain.html to rlv.lol via Porkbun FTP."""

import ftplib
import os
import sys
from pathlib import Path

FTP_HOST = "pixie-ss1-ftp.porkbun.com"
FTP_USER = "rlv.lol"
FTP_PASS = os.environ.get("FTP_PASS", "")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = PROJECT_ROOT / "dist"
BRAIN_HTML = Path(r"C:\Users\PC\Desktop\claude-persist\bridge\brain.html")

SKIP_BUILD = "--skip-build" in sys.argv
DRY_RUN = "--dry-run" in sys.argv


def connect():
    """Connect to Porkbun FTP with TLS."""
    ftp = ftplib.FTP_TLS(FTP_HOST, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.prot_p()  # secure data connection
    print(f"Connected to {FTP_HOST} as {FTP_USER}")
    return ftp


def ensure_dir(ftp, path):
    """Recursively create remote directory."""
    parts = path.strip("/").split("/")
    current = ""
    for part in parts:
        current += f"/{part}"
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass  # already exists


def upload_file(ftp, local_path, remote_path):
    """Upload a single file."""
    ensure_dir(ftp, os.path.dirname(remote_path))
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)
    size = os.path.getsize(local_path)
    print(f"  {remote_path} ({size:,} bytes)")


def upload_directory(ftp, local_dir, remote_base="/"):
    """Upload entire directory tree."""
    local_dir = Path(local_dir)
    count = 0
    for local_file in sorted(local_dir.rglob("*")):
        if local_file.is_dir():
            continue
        rel = local_file.relative_to(local_dir)
        remote = f"{remote_base.rstrip('/')}/{rel.as_posix()}"
        upload_file(ftp, str(local_file), remote)
        count += 1
    return count


def main():
    if not FTP_PASS:
        print("ERROR: Set FTP_PASS environment variable")
        print('  $env:FTP_PASS = "your-password"')
        sys.exit(1)

    if not DIST_DIR.exists():
        print(f"ERROR: {DIST_DIR} not found. Run 'npm run build' first.")
        sys.exit(1)

    if DRY_RUN:
        files = list(DIST_DIR.rglob("*"))
        files = [f for f in files if f.is_file()]
        print(f"DRY RUN: Would upload {len(files)} files from dist/")
        if BRAIN_HTML.exists():
            print("DRY RUN: Would upload brain.html -> /brain/index.html")
        return

    ftp = connect()
    try:
        # Upload dist/ contents to root
        print(f"\n=== Uploading stull-atlas ({DIST_DIR}) ===")
        count = upload_directory(ftp, DIST_DIR, "/")
        print(f"  -> {count} files uploaded")

        # Upload brain.html
        if BRAIN_HTML.exists():
            print(f"\n=== Uploading brain.html ===")
            upload_file(ftp, str(BRAIN_HTML), "/brain/index.html")
            print("  -> brain page deployed to /brain/")
        else:
            print(f"\nWARNING: {BRAIN_HTML} not found, skipping brain deploy")

        print("\n=== Deploy complete! ===")
        print("  https://rlv.lol")
        print("  https://rlv.lol/brain")
    finally:
        ftp.quit()


if __name__ == "__main__":
    main()
