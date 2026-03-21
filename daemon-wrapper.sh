#!/bin/bash
export WAYLAND_DISPLAY="${WAYLAND_DISPLAY}"
export DISPLAY="${DISPLAY}"
exec python3 /home/drew/.config/chrome-borderless/daemon.py
