# Usage Guide

This guide explains how to configure and use the Open to Borderless extension.

## Opening the Popup

Click the extension icon in your Chrome toolbar to open the settings popup.

## Modifier Configuration

The extension requires **left-click** or **middle-click** plus at least one modifier key.

### Available Modifiers

| Modifier | Description |
|----------|-------------|
| **Shift** | Default, enabled on first install |
| **Ctrl** | Optional, can be enabled alongside Shift |

### Setting Your Preferred Combo

1. Open the extension popup
2. Check the modifiers you want to use:
   - ☑ **Shift** - Required
   - ☐ **Ctrl** - Optional
   - ☑ **Shift** + ☑ **Ctrl** - Either modifier works
3. At least one modifier must be checked
4. Settings save automatically

The shortcut display shows your current configuration:
- `Left + Shift` or `Middle + Shift` (Shift only)
- `Left + Ctrl` or `Middle + Ctrl` (Ctrl only)
- `Left + Shift + Ctrl` or `Middle + Shift + Ctrl` (Either modifier)

## Enabling/Disabling

Use the **Extension Enabled** toggle in the popup to quickly enable or disable the feature without losing your modifier settings.

## How to Open a Borderless Window

1. Navigate to any webpage
2. Hold your configured modifier key(s) (Shift, Ctrl, or both)
3. **Left-click** or **Middle-click** on any link
4. The link opens in a new borderless (frameless) Chromium window

### Middle-Click on Trackpad

On most laptops, middle-click can be simulated with:
- **Three-finger tap** (depending on touchpad settings)
- **Click + tap** with another finger simultaneously

## Window Behavior

The borderless window has:
- **No window decorations** (no title bar, borders, or shadows)
- **Full functionality** (all links work, JavaScript runs, etc.)
- **Hyprland controls** (move, resize, close with keyboard shortcuts)

### Closing a Borderless Window

Use the standard Hyprland methods:
- `Super + Q` (if configured)
- `killactive` keybinding (default: `Super + Shift + Q`)
- Click the close button if added via Hyprland rules

## Settings Persistence

All settings are stored in Chrome's extension storage:
- Enabled/disabled state
- Modifier configuration

These persist across browser restarts and extension reloads.

## Resetting Settings

To reset to defaults:
1. Open the popup
2. Uncheck all modifiers (if possible)
3. The extension will automatically revert to Shift + Middle

Or remove the extension and reinstall.

## Keyboard Shortcuts

Currently, the only keyboard component is the modifier keys. Future versions may add customizable keyboard shortcuts.
