# Installation Guide

This guide provides detailed installation instructions for the Open to Borderless Chrome extension.

## Prerequisites

- **Hyprland** window manager
- **Chromium-based browser** (Chrome, Chromium, Brave, Arc, etc.)
- **Python 3** (for the daemon)
- **Git** (for cloning)

## Installation

### Option 1: PKGBUILD (Arch Linux / Omarchy) - Recommended

```bash
# Clone the repository
git clone https://github.com/dfmknz/open-to-borderless.git
cd open-to-borderless

# Build and install
makepkg -si
```

The PKGBUILD will:
- Install the daemon to `/usr/bin/open-borderless-daemon`
- Install the wrapper to `/usr/bin/open-borderless-wrapper`
- Install the systemd service
- Install extension files to `/usr/share/open-borderless/extension/`
- Install documentation to `/usr/share/doc/open-borderless/`

After installation:
1. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select: `/usr/share/open-borderless/extension/`

2. Enable and start the daemon:
   ```bash
   systemctl --user enable --now open-borderless
   ```

### Option 2: Manual Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/dfmknz/open-to-borderless.git
cd open-to-borderless
```

#### Step 2: Load the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `extension/` directory
5. The extension icon should appear in your toolbar

#### Step 3: Install the Daemon

The daemon is a Python HTTP server that receives requests from the extension and executes Hyprland commands.

**Option A: Run directly (for testing)**
```bash
./daemon-wrapper.sh &
```

**Option B: Systemd service (recommended for permanent setup)**
```bash
# Copy the service file
mkdir -p ~/.config/systemd/user
cp systemd/open-borderless.service ~/.config/systemd/user/

# Enable and start
systemctl --user enable open-borderless
systemctl --user start open-borderless

# Verify it's running
systemctl --user status open-borderless
```

## Verifying Installation

1. Open the extension popup by clicking the icon in your toolbar
2. Toggle the extension to "Enabled" if needed
3. Configure your modifier preferences (Shift, Ctrl, or both)
4. Visit any webpage and left-click or middle-click + Shift on a link
5. A borderless Chromium window should open with that link

## Updating

### PKGBUILD Installation
```bash
cd open-to-borderless
git pull
makepkg -si
```

### Manual Installation
```bash
cd open-to-borderless
git pull

# Restart the daemon to pick up changes
pkill -f open-borderless
./daemon-wrapper.sh &

# Or restart via systemd (if using systemd)
systemctl --user restart open-borderless
```

**Note:** The daemon runs as a background service. When the daemon is updated, you must restart it for changes to take effect. The systemd service does not auto-reload on file changes.

## Uninstalling

### PKGBUILD Installation
```bash
# Remove the package
sudo pacman -R open-borderless

# Remove extension from Chrome at chrome://extensions/
```

### Manual Installation
```bash
# Stop and disable the service
systemctl --user stop open-borderless
systemctl --user disable open-borderless

# Remove files
rm -rf ~/.config/chrome-borderless
rm ~/.config/systemd/user/open-borderless.service

# Remove extension from Chrome at chrome://extensions/
```

## Troubleshooting

If the extension doesn't work after installation, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

## Next Steps

- Read [USAGE.md](USAGE.md) to learn how to configure the extension
- Check [ARCHITECTURE.md](ARCHITECTURE.md) to understand how it works
