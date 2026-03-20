#!/usr/bin/env python3
import json
import os
import sys

HOST_MANIFEST = {
    "name": "com.chrome_borderless.daemon",
    "description": "Chrome Borderless Window Daemon",
    "path": os.path.expanduser("~/.config/chrome-borderless/daemon.py"),
    "type": "stdio"
}

def register_chrome():
    manifest_path = os.path.expanduser("~/.config/google-chrome/NativeMessagingHosts/com.chrome_borderless.json")
    os.makedirs(os.path.dirname(manifest_path), exist_ok=True)
    with open(manifest_path, 'w') as f:
        json.dump(HOST_MANIFEST, f, indent=2)
    print(f"Registered for Chrome at {manifest_path}")

def register_chromium():
    manifest_path = os.path.expanduser("~/.config/chromium/NativeMessagingHosts/com.chrome_borderless.json")
    os.makedirs(os.path.dirname(manifest_path), exist_ok=True)
    with open(manifest_path, 'w') as f:
        json.dump(HOST_MANIFEST, f, indent=2)
    print(f"Registered for Chromium at {manifest_path}")

if __name__ == '__main__':
    register_chrome()
    register_chromium()
    print("Native messaging host registered successfully!")
