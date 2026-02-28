"""
Split digitalfire_reference.db into chunks for GitHub Pages deployment.

GitHub Pages has a 100 MB per-file limit. Our DB is ~122 MB.
Split into 8 chunks (~15 MB each) for good download UX.
Writes a manifest JSON so the app knows how to reassemble.
"""

import os
import json
import hashlib

SOURCE = os.path.join(os.path.dirname(__file__), '..', 'public', 'digitalfire_reference.db')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'db')
CHUNK_SIZE = 16 * 1024 * 1024  # 16 MB chunks

def split():
    source = os.path.abspath(SOURCE)
    out_dir = os.path.abspath(OUT_DIR)
    
    if not os.path.exists(source):
        print(f"ERROR: {source} not found")
        return
    
    os.makedirs(out_dir, exist_ok=True)
    
    total_size = os.path.getsize(source)
    print(f"Source: {source}")
    print(f"Size: {total_size:,} bytes ({total_size / 1048576:.1f} MB)")
    
    # Read and split
    chunks = []
    with open(source, 'rb') as f:
        idx = 0
        while True:
            data = f.read(CHUNK_SIZE)
            if not data:
                break
            
            chunk_name = f"digitalfire.db.{idx:03d}"
            chunk_path = os.path.join(out_dir, chunk_name)
            
            with open(chunk_path, 'wb') as out:
                out.write(data)
            
            chunk_hash = hashlib.md5(data).hexdigest()
            chunk_info = {
                "file": chunk_name,
                "size": len(data),
                "md5": chunk_hash
            }
            chunks.append(chunk_info)
            
            print(f"  {chunk_name}: {len(data):>10,} bytes  md5:{chunk_hash}")
            idx += 1
    
    # Write manifest
    manifest = {
        "totalSize": total_size,
        "chunkSize": CHUNK_SIZE,
        "chunks": chunks
    }
    
    manifest_path = os.path.join(out_dir, "manifest.json")
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n{len(chunks)} chunks written to {out_dir}")
    print(f"Manifest: {manifest_path}")
    
    # Verify total
    total_check = sum(c["size"] for c in chunks)
    assert total_check == total_size, f"Size mismatch: {total_check} != {total_size}"
    print(f"Verified: all chunks sum to {total_size:,} bytes ✓")

if __name__ == '__main__':
    split()
