# Installation Guide

This guide provides detailed installation instructions for the Open to Borderless Chrome extension.

## Prerequisites

- **Hyprland** window manager
- **Chromium-based browser** (Chrome, Chromium, Brave, Arc, etc.)
- **Python 3** (for the daemon)
- **Git** (for cloning)

## Step 1: Clone the Repository

```bash
git clone https://github.com/dfmknz/open-to-borderless.git
cd open-to-borderless
```

## Step 2: Install the Extension

### Option A: Using the Install Script (Recommended)

```bash
./install.sh
```

This will:
- Copy the daemon to `~/.config/chrome-borderless/`
- Create the systemd service file
- Enable auto-startup
- Start the daemon

### Option B: Manual Installation

#### 2a. Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the directory containing the extension files
5. The extension icon should appear in your toolbar

#### 2b. Start the Daemon

The daemon is a Python HTTP server that receives requests from the extension and executes Hyprland commands.

**Option 1: Run directly (for testing)**

```bash
~/.config/chrome-borderless/daemon.py &
```

**Option 2: Systemd service (recommended for permanent setup)**

```bash
# Copy the service file
mkdir -p ~/.config/systemd/user
cp systemd/chrome-borderless.service ~/.config/systemd/user/

# Enable and start
systemctl --user enable chrome-borderless
systemctl --user start chrome-borderless

# Verify it's running
systemctl --user status chrome-borderless
```

**Option 3: Desktop autostart (alternative to systemd)**

The installer creates this automatically, but you can also do it manually:

```bash
mkdir -p ~/.config/autostart
cp systemd/chrome-borderless.desktop ~/.config/autostart/
```

## Step 3: Verify Installation

1. Open the extension popup by clicking the icon in your toolbar
2. Toggle the extension to "Enabled" if needed
3. Configure your modifier preferences (Shift, Ctrl, or both)
4. Visit any webpage and middle-click + Shift on a link
5. A borderless Chromium window should open with that link

## Updating

To update to the latest version:

```bash
cd open-to-borderless
git pull
./install.sh
# Or manually restart the daemon
pkill -f chrome-borderless
~/.config/chrome-borderless/daemon.py &
```

## Uninstalling

```bash
# Stop and disable the service
systemctl --user stop chrome-borderless
systemctl --user disable chrome-borderless

# Remove files
rm -rf ~/.config/chrome-borderless
rm ~/.config/systemd/user/chrome-borderless.service
rm ~/.config/autostart/chrome-borderless.desktop

# Remove extension from Chrome at chrome://extensions/
```

## Troubleshooting

If the extension doesn't work after installation, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

## Next Steps

- Read [USAGE.md](USAGE.md) to learn how to configure the extension
- Check [ARCHITECTURE.md](ARCHITECTURE.md) to understand how it works
