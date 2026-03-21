# Troubleshooting

This guide covers common issues and their solutions.

## Extension Not Detecting Clicks

### Symptoms
- Click + Shift doesn't open a borderless window
- No console errors in extension popup

### Possible Causes

**Content script not loaded**
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
ps aux | grep open-borderless-daemon | grep -v grep
```

If not running, start it manually:
```bash
python3 /usr/bin/open-borderless-daemon &
```

### Check 2: Can you reach the daemon manually?

```bash
curl -X POST http://localhost:8765/open \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://example.com"}'
```

Should return: `{"success": true}`

### Check 3: Is the port in use?

```bash
lsof -i :8765
```

If another process is using port 8765, there may be a conflict.

## Daemon Won't Start

### Symptoms
Daemon fails to start or exits immediately.

### Check if Hyprland is ready
```bash
hyprctl version
```

### Check for conflicting processes
```bash
ps aux | grep -E "borderless|8765" | grep -v grep
```

### Possible fixes

1. **Start the daemon manually**
   ```bash
   python3 /usr/bin/open-borderless-daemon &
   ```

2. **Check autostart.conf entry**
   ```bash
   grep open-borderless ~/.config/hypr/autostart.conf
   ```

## Borderless Window Doesn't Open

### Symptoms
- Daemon is running
- `curl` test works
- But clicking links doesn't open windows

Can you manually open a borderless window?

```bash
hyprctl dispatch exec "chromium --app=https://example.com"
```

If this doesn't work, the issue is with Hyprland or Chromium.

## Daemon Not Starting After Boot

### Symptoms
- Daemon not running after reboot
- Borderless links not working

### Check autostart.conf
```bash
grep open-borderless ~/.config/hypr/autostart.conf
```

### Solution

1. Verify the entry exists in `~/.config/hypr/autostart.conf`:
   ```
   exec-once = python3 /usr/bin/open-borderless-daemon
   ```

2. If the entry is missing, add it:
   ```bash
   echo 'exec-once = python3 /usr/bin/open-borderless-daemon' >> ~/.config/hypr/autostart.conf
   ```

3. Reload Hyprland to apply:
   ```bash
   hyprctl reload
   ```

## Getting Help

If you encounter an issue not covered here:

1. Check daemon is running: `ps aux | grep open-borderless`
2. Check extension is loaded: `chrome://extensions/`
3. Check browser console for errors: F12 → Console

For additional help, open an issue on GitHub with:
- Your distribution and Hyprland version
- Chromium version
- Steps to reproduce
- Relevant logs
