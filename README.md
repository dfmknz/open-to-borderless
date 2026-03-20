# Open to Borderless

<p align="center">
  <img src="icon.png" alt="Open to Borderless Icon" width="128" height="128">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Window%20Manager-Hyprland-blue?style=flat-square" alt="Hyprland">
  <img src="https://img.shields.io/badge/Chrome%20Extension-MV3-green?style=flat-square" alt="Chrome MV3">
</p>

Open links in borderless (frameless) windows with **middle-click** + **modifier keys** on Hyprland.

## Features

- **Middle-click + Shift** to open links in borderless windows
- **Configurable modifiers** (Shift, Ctrl, or both)
- **Toggle on/off** from extension popup
- **Automatic startup** via systemd or autostart
- **Persistent settings** across browser sessions

## Requirements

- [Hyprland](https://github.com/hyprwm/Hyprland) window manager
- Chromium-based browser (Chrome, Chromium, Brave, Arc, etc.)
- Python 3

## Quick Install

```bash
# Clone the repository
git clone https://github.com/dfmknz/open-to-borderless.git
cd open-to-borderless

# Run the installer
./install.sh
```

## Manual Install

### 1. Load the Extension

1. Go to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the extension directory

### 2. Start the Daemon

```bash
# Option A: Run directly (requires restart after reboot)
~/.config/chrome-borderless/daemon.py &

# Option B: Systemd (recommended)
systemctl --user enable chrome-borderless
systemctl --user start chrome-borderless
```

## Usage

1. Open the extension popup by clicking the icon
2. Configure your preferred modifier keys (Shift, Ctrl, or both)
3. Middle-click any link while holding your chosen modifier(s)
4. The link opens in a borderless Chromium window

## Documentation

- [Installation Guide](docs/INSTALLATION.md) - Detailed setup instructions
- [Usage Guide](docs/USAGE.md) - How to configure and use
- [Compatibility](docs/COMPATIBILITY.md) - Supported systems
- [Architecture](docs/ARCHITECTURE.md) - How it works
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions

## How It Works

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Content Script │───▶│  Background.js    │───▶│  HTTP Daemon    │
│  (middle-click) │    │  (fetch localhost)│    │  (Python)       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                              ┌─────────────────┐
                                              │  Hyprland       │
                                              │  hyprctl dispatch│
                                              └─────────────────┘
```

## License

See individual files for their respective licenses.
