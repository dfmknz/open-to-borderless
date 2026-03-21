# Troubleshooting

This guide covers common issues and their solutions.

## Extension Not Detecting Clicks

### Symptoms
- Middle-click + Shift doesn't open a borderless window
- No console errors in extension popup

### Possible Causes

1. **Extension disabled**
   - Check the toggle in the extension popup is ON

2. **Wrong modifier configured**
   - Verify your modifier settings match what you're pressing
   - Open popup and check the shortcut display (e.g., "Middle + Shift")

3. **Content script not loaded**
   - Reload the extension at `chrome://extensions/`
   - Refresh the webpage

## Extension Context Invalidated Error

### Symptoms
Console shows: `Extension context invalidated`

### Cause
Chrome's extension API connection becomes invalid when the extension reloads.

### Solution
1. Reload the extension at `chrome://extensions/`
2. Refresh the webpage
3. If persisting, restart the browser

## HTTP Daemon Issues

### Symptoms
- Extension popup shows no errors
- But borderless window doesn't open
- Console shows network error

### Check 1: Is the daemon running?

```bash
ps aux | grep daemon.py | grep -v grep
```

If no output, start the daemon:
```bash
~/.config/chrome-borderless/daemon.py &
```

### Check 2: Can you reach the daemon manually?

```bash
curl -X POST http://localhost:8765/open \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://example.com"}'
```

Should return: `{"success": true}`

If not, check the daemon logs or restart it.

### Check 3: Is the port in use?

```bash
lsof -i :8765
```

If another process is using port 8765, you'll need to change the port in `daemon.py`.

## Daemon Won't Start

### Symptoms
Running `daemon.py` exits immediately or shows an error

### Cause
Python version issue or missing modules

### Solution
```bash
# Check Python version
python3 --version

# Should be Python 3.6+

# Run with explicit python3
python3 ~/.config/chrome-borderless/daemon.py
```

## Borderless Window Doesn't Open

### Symptoms
- Daemon is running
- `curl` test works
- But clicking links doesn't open windows

### Check 1: Is `hyprctl` working?

```bash
hyprctl version
```

### Check 2: Can you manually open a borderless window?

```bash
hyprctl dispatch exec "chromium --app=https://example.com"
```

If this doesn't work, the issue is with Hyprland or Chromium, not the extension.

### Check 3: Is Chromium installed?

```bash
which chromium
which google-chrome-stable
```

If not found, install Chromium:
```bash
# Arch Linux
sudo pacman -S chromium

# Ubuntu/Debian
sudo apt install chromium-browser
```

## Systemd Service Not Starting

### Symptoms
- `systemctl --user status chrome-borderless` shows failed
- Daemon not running after reboot

### Check logs
```bash
journalctl --user -u chrome-borderless
```

### Common fixes

1. **Service file location**
   ```bash
   systemctl --user enable chrome-borderless
   systemctl --user start chrome-borderless
   ```

2. **Daemon permissions**
   ```bash
   chmod +x ~/.config/chrome-borderless/daemon.py
   ```

3. **DBus issues**
   ```bash
   systemctl --user start chrome-borderless
   ```

## Permission Denied Errors

### Symptoms
Cannot create socket or execute daemon

### Solution
```bash
chmod +x ~/.config/chrome-borderless/daemon.py
```

## Getting Help

If you encounter an issue not covered here:

1. Check Hyprland is running: `hyprctl monitors`
2. Check Chromium is installed: `which chromium`
3. Check daemon is running: `ps aux | grep daemon.py`
4. Check extension is loaded: `chrome://extensions/`
5. Check browser console for errors: F12 → Console

For additional help, open an issue on GitHub with:
- Your distribution and Hyprland version
- Chromium version
- Steps to reproduce
- Relevant logs
