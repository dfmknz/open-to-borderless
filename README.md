# Open to Borderless

<p align="center">
  <img src="icon.png" alt="Open to Borderless Icon" width="128" height="128">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Window%20Manager-Hyprland-blue?style=flat-square" alt="Hyprland">
  <img src="https://img.shields.io/badge/Chrome%20Extension-MV3-green?style=flat-square" alt="Chrome MV3">
</p>

Open links in borderless (frameless) windows with **left-click** or **middle-click** + **modifier keys** on Hyprland. Useful when you want to open web apps to your current workspace rather than the one chromium is on.
## Features

- **Left-click or Middle-click + Shift/Ctrl** to open links in borderless windows
- **Configurable modifiers** (Shift, Ctrl, or both)
- **Toggle on/off** from extension popup
- **Automatic startup** via Hyprland autostart
- **Persistent settings** across browser sessions

## Requirements

- [Hyprland](https://github.com/hyprwm/Hyprland) window manager
- Chromium-based browser (Chrome, Chromium, Brave, Arc, etc.)
- Python 3

## Installation

### PKGBUILD (Arch Linux / Omarchy)

```bash
# Clone the repository
git clone https://github.com/dfmknz/open-to-borderless.git
cd open-to-borderless

# Build and install
makepkg -si
```

## Usage

1. Open the extension popup by clicking the icon
2. Configure your preferred modifier keys (Shift, Ctrl, or both)
3. Left-click or middle-click any link while holding your chosen modifier(s)
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
│  Content Script │───▶│  Background.js   │───▶│  HTTP Daemon    │
│  (click events) │    │ (fetch localhost)│    │  (Python)       │
└─────────────────┘    └──────────────────┘    └────────┬────────┘
                                                        │
                                                        ▼
                                              ┌─────────────────┐
                                              │  Daemon Wrapper │
                                              │  (sets env vars)│
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  Hyprland       │
                                              │ hyprctl dispatch│
                                              └─────────────────┘
```

## License

See individual files for their respective licenses.
