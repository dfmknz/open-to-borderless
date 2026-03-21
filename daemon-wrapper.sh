#!/bin/bash

MAX_RETRIES=200
RETRY_INTERVAL=3

for ((i=1; i<=MAX_RETRIES; i++)); do
    export WAYLAND_DISPLAY="${WAYLAND_DISPLAY}"
    export DISPLAY="${DISPLAY}"
    
    # Test if Hyprland is ready
    if hyprctl activeworkspace > /dev/null 2>&1; then
        exec python3 /usr/bin/open-borderless-daemon
    fi
    
    echo "Waiting for Hyprland... (attempt $i/$MAX_RETRIES)"
    sleep $RETRY_INTERVAL
done

# Exit with error if Hyprland never responded
echo "Failed to connect to Hyprland after $MAX_RETRIES attempts"
exit 1
