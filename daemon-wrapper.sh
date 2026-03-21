#!/bin/bash

MAX_RETRIES=200
RETRY_INTERVAL=3

for ((i=1; i<=MAX_RETRIES; i++)); do
    export WAYLAND_DISPLAY="${WAYLAND_DISPLAY}"
    export DISPLAY="${DISPLAY}"
    
    # Test if hyprctl works
    if hyprctl dispatch exec "echo ready" 2>/dev/null; then
        exec python3 /home/drew/.config/chrome-borderless/daemon.py
    fi
    
    echo "Waiting for Hyprland... (attempt $i/$MAX_RETRIES)"
    sleep $RETRY_INTERVAL
done

# Exit with error if Hyprland never responded
echo "Failed to connect to Hyprland after $MAX_RETRIES attempts"
exit 1
