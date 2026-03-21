const DEFAULT_CONFIG = { shift: true, ctrl: false };
const HTTP_PORT = 8765;

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openBorderless') {
      chrome.storage.local.get(['enabled', 'modifierConfig'], (result) => {
        if (result.enabled === false) {
          return;
        }

        const config = result.modifierConfig || DEFAULT_CONFIG;
        const hasShift = config.shift && message.shiftKey;
        const hasCtrl = config.ctrl && message.ctrlKey;

        if (!hasShift && !hasCtrl) {
          return;
        }

        fetch(`http://localhost:${HTTP_PORT}/open`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: message.url })
        })
        .then(response => response.json())
        .then(data => port.postMessage(data))
        .catch(error => port.postMessage({ success: false, error: error.message }));
      });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getEnabled') {
    chrome.storage.local.get(['enabled'], (result) => {
      sendResponse({ enabled: result.enabled !== false });
    });
    return true;
  }

  if (message.action === 'setEnabled') {
    chrome.storage.local.set({ enabled: message.enabled }, () => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.action === 'getModifierConfig') {
    chrome.storage.local.get(['modifierConfig'], (result) => {
      sendResponse({ config: result.modifierConfig || DEFAULT_CONFIG });
    });
    return true;
  }

  if (message.action === 'setModifierConfig') {
    chrome.storage.local.set({ modifierConfig: message.config }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

chrome.storage.local.get(['enabled', 'modifierConfig'], (result) => {
  if (result.enabled === undefined) {
    chrome.storage.local.set({ enabled: true });
  }
  if (!result.modifierConfig) {
    chrome.storage.local.set({ modifierConfig: DEFAULT_CONFIG });
  }
});
