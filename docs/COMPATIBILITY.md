# Compatibility

## Supported Systems

### Required

| Component | Version | Notes |
|-----------|---------|-------|
| **Hyprland** | Any recent version | Window manager required |
| **Python** | 3.x | For the HTTP daemon |
| **Chromium-based browser** | Recent | Chrome, Chromium, Brave, Arc, etc. |

### Hyprland-Based Distributions

The extension is compatible with any Hyprland-based distribution, including:

- **Omarchy** - Optimized for Basecamp/37signals products
- **Hyprland Arch** - Standard Arch Linux + Hyprland
- **nixOS Hyprland** - Nix-based Hyprland setups
- **Fedora Hyprland** - Fedora with Hyprland
- Any custom Hyprland installation

## Not Supported (Yet)

The extension requires **Hyprland** and will not work with other window managers or operating systems.

### Window Managers

| Window Manager | Status | Notes |
|----------------|--------|-------|
| **Sway** | Not supported | Would need `swaymsg exec` instead of `hyprctl` |
| **i3 / i3-gaps** | Not supported | Would need `i3-msg exec` |
| **bspwm** | Not supported | Would need different command approach |
| **XMonad** | Not supported | Would need different command approach |
| **GNOME Shell** | Not supported | Would require GNOME extensions |
| **KDE Plasma** | Not supported | Would need `kstart` or custom scripts |
| **SwayFX** | Not supported | Same as Sway |

### Operating Systems

| Operating System | Status | Notes |
|-----------------|--------|-------|
| **Windows** | Not supported | Would need different window command approach |
| **macOS** | Not supported | Would need different window command approach |
| **BSD** | Not supported | Would need porting |

## Why Hyprland?

The extension uses `hyprctl dispatch exec` to open borderless windows:

```bash
hyprctl dispatch exec "chromium --app=<url>"
```

This command is specific to Hyprland and creates a frameless window running Chromium in app mode.

## Adapting for Other Window Managers

If you want to use this concept with a different window manager, you would need to modify `daemon.py`:

### Sway

```python
def open_borderless_window(url):
    cmd = ['swaymsg', 'exec', f'chromium --app={url}']
    ...
```

### i3

```python
def open_borderless_window(url):
    cmd = ['i3-msg', 'exec', f'chromium --app={url}']
    ...
```

### X11 with wmctrl

```python
def open_borderless_window(url):
    # Open in app mode
    subprocess.run(['chromium', f'--app={url}'])
    # Then use wmctrl to make borderless
    ...
```

### macOS

```python
def open_borderless_window(url):
    # Use osascript or similar
    cmd = ['osascript', '-e', f'tell app "Chromium" to open location "{url}"']
    ...
```

### Windows

```python
def open_borderless_window(url):
    # Use PowerShell or start command
    cmd = ['start', '', f'--app={url}']
    ...
```

## Browser Support

The extension uses Chrome Manifest V3 APIs and requires a Chromium-based browser:

| Browser | Supported | Notes |
|---------|-----------|-------|
| **Google Chrome** | ✅ Yes | Full support |
| **Chromium** | ✅ Yes | Full support |
| **Brave** | ✅ Yes | Full support |
| **Arc** | ✅ Yes | Full support |
| **Edge** | ✅ Yes | Should work |
| **Firefox** | ❌ No | Different extension API |
| **Safari** | ❌ No | Different extension API |
| **Opera** | ⚠️ Unknown | May work |

## Browser Extension Store

The extension is designed for manual installation (Load unpacked). Publishing to the Chrome Web Store would require:

1. A Google developer account
2. Paying the one-time developer fee ($5)
3. Meeting Chrome Web Store policies
4. Submitting for review
