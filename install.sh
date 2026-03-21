#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="$HOME/.config/chrome-borderless"
SERVICE_FILE="$HOME/.config/systemd/user/chrome-borderless.service"
AUTOSTART_FILE="$HOME/.config/autostart/chrome-borderless.desktop"

echo "Installing Chrome Borderless..."

mkdir -p "$INSTALL_DIR"

cp "$SCRIPT_DIR/daemon.py" "$INSTALL_DIR/daemon.py"
chmod +x "$INSTALL_DIR/daemon.py"

cp "$SCRIPT_DIR/daemon-wrapper.sh" "$INSTALL_DIR/daemon-wrapper.sh"
chmod +x "$INSTALL_DIR/daemon-wrapper.sh"

mkdir -p "$(dirname "$SERVICE_FILE")"
cat > "$SERVICE_FILE" << EOF
[Unit]
Description=Chrome Borderless HTTP Server
After=graphical-session.target

[Service]
Type=simple
ExecStart=$INSTALL_DIR/daemon-wrapper.sh
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
EOF

mkdir -p "$(dirname "$AUTOSTART_FILE")"
cat > "$AUTOSTART_FILE" << EOF
[Desktop Entry]
Type=Application
Name=Chrome Borderless
Exec=$INSTALL_DIR/daemon-wrapper.sh
Hidden=false
NoDisplay=true
X-GNOME-Autostart-enabled=true
EOF

echo ""
echo "Starting daemon..."
$INSTALL_DIR/daemon-wrapper.sh &
sleep 1

echo "Enabling auto-startup..."
systemctl --user daemon-reload 2>/dev/null || true
systemctl --user enable chrome-borderless 2>/dev/null || echo "Note: systemctl not available, using autostart instead"
systemctl --user restart chrome-borderless 2>/dev/null || true

echo ""
echo "Installation complete!"
echo ""
echo "The daemon is running and will auto-start on login."
echo ""
echo "Commands:"
echo "  systemctl --user start chrome-borderless   # Start now"
echo "  systemctl --user stop chrome-borderless    # Stop"
echo "  systemctl --user status chrome-borderless  # Check status"
echo ""
echo "To load the extension in Chrome:"
echo "  1. Go to chrome://extensions/"
echo "  2. Enable 'Developer mode'"
echo "  3. Click 'Load unpacked'"
echo "  4. Select: $SCRIPT_DIR"
