# Architecture

This document explains how the Open to Borderless extension works internally.

## Overview

The extension consists of three main components:

1. **Chrome Extension** - Detects middle-click events and sends URLs
2. **HTTP Daemon** - Receives URLs and executes Hyprland commands
3. **Hyprland** - Window manager that creates borderless windows

## Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Chrome Browser                                  │
│  ┌─────────────────┐    ┌──────────────────┐    ┌──────────────────────┐  │
│  │  Content Script │───▶│  Background.js   │───▶│  HTTP Request        │  │
│  │  (content-      │    │  (service worker)│    │  localhost:8765/open │  │
│  │   script.js)     │    │                  │    │                      │  │
│  │                  │    │                  │    │                      │  │
│  │  Listens for     │    │  Validates       │    │                      │  │
│  │  auxclick events │    │  modifiers &     │    │                      │  │
│  │  on links        │    │  forwards URL    │    │                      │  │
│  └─────────────────┘    └──────────────────┘    └──────────┬───────────┘  │
│                                                             │              │
└─────────────────────────────────────────────────────────────│──────────────┘
                                                              │
                                                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Localhost (127.0.0.1)                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         HTTP Daemon (daemon.py)                     │   │
│  │                                                                       │   │
│  │   POST /open                                                        │   │
│  │   { "url": "https://example.com" }                                  │   │
│  │                                                                       │   │
│  │   Executes: hyprctl dispatch exec "chromium --app=https://example.com"│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
└──────────────────────────────────────│──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Hyprland                                       │
│                                                                             │
│   hyprctl dispatch exec "chromium --app=https://example.com"               │
│                                                                             │
│   Creates a new Chromium window with:                                       │
│   - --app flag (app mode, no browser chrome)                               │
│   - Borderless/frameless decorations                                       │
│   - Full URL loaded                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Content Script (`content-script.js`)

**Purpose:** Detect middle-click events on links

**Runs in:** Each webpage's context

**Responsibilities:**
- Listen for `auxclick` events (middle mouse button)
- Find the nearest parent `<a>` element
- Prevent default link behavior
- Send URL and modifier key state to background script via port connection

**Key code pattern:**
```javascript
document.addEventListener('auxclick', (e) => {
  if (e.button !== 1) return;  // Middle button only

  const link = e.target.closest('a');
  if (!link) return;

  e.preventDefault();

  // Send to background via port
  sendMessage({
    action: 'openBorderless',
    url: link.href,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey
  });
}, true);
```

### 2. Background Script (`background.js`)

**Purpose:** Handle messaging and validation

**Runs in:** Service worker context (Chrome MV3)

**Responsibilities:**
- Maintain port connection with content scripts
- Validate modifier keys against user configuration
- Forward validated requests to HTTP daemon
- Handle settings storage

**Key code pattern:**
```javascript
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    // Check if modifiers match user config
    if (matchesConfig(message)) {
      // Forward to HTTP daemon
      fetch('http://localhost:8765/open', {
        method: 'POST',
        body: JSON.stringify({ url: message.url })
      });
    }
  });
});
```

### 3. HTTP Daemon (`daemon.py`)

**Purpose:** Bridge between extension and Hyprland

**Runs in:** Background (systemd or autostart)

**Responsibilities:**
- Listen for HTTP POST requests
- Execute Hyprland commands via `hyprctl`
- Run Chromium with `--app` flag in frameless mode

**Key code pattern:**
```python
class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/open':
            url = parse_request()
            subprocess.run([
                'hyprctl', 'dispatch', 'exec',
                f'chromium --app={url}'
            ])
```

## Why HTTP Instead of Native Messaging?

Chrome's native messaging (`chrome.runtime.sendNativeMessage`) was initially used but had compatibility issues. HTTP was chosen because:

1. **Simpler setup** - No manifest registration required
2. **Easier debugging** - Can test with `curl`
3. **More reliable** - Standard HTTP is well-supported
4. **Cross-browser** - Works with any Chromium-based browser

## Data Flow

1. User middle-clicks a link while holding Shift
2. Content script detects `auxclick` event
3. Content script sends URL + modifier state via port
4. Background script validates against stored config
5. Background script sends HTTP POST to localhost:8765
6. HTTP daemon receives request
7. Daemon executes `hyprctl dispatch exec "chromium --app=<url>"`
8. Hyprland spawns new Chromium window in app mode
9. New window appears borderless

## Security Considerations

- **localhost only** - Daemon only accepts connections from localhost
- **No arbitrary code execution** - Daemon only executes predefined command
- **URL validation** - Basic check that URL is valid before processing
- **User consent** - Middle-click is an intentional user action

## Future Improvements

Potential enhancements that could be added:

1. **Multiple browser support** - Allow selecting between chromium, google-chrome, brave, etc.
2. **Window position/size** - Remember or configure window placement
3. **Per-domain rules** - Always open certain domains in borderless mode
4. **Keyboard shortcut** - Alternative to mouse-based activation
