(function() {
  let port = null;
  let pendingMessages = [];
  let contextValid = true;

  function connect() {
    if (port) {
      try {
        port.disconnect();
      } catch (e) {}
      port = null;
    }

    try {
      port = chrome.runtime.connect({ name: 'borderless' });

      port.onMessage.addListener((response) => {
        // Handle response if needed
        console.log('Borderless: response', response);
      });

      port.onDisconnect.addListener(() => {
        port = null;
        // Retry connection after delay
        setTimeout(connect, 1000);
      });

      // Flush pending messages
      while (pendingMessages.length > 0 && port) {
        const msg = pendingMessages.shift();
        port.postMessage(msg);
      }
    } catch (e) {
      port = null;
      setTimeout(connect, 1000);
    }
  }

  function sendMessage(msg) {
    if (port && port.connected) {
      try {
        port.postMessage(msg);
      } catch (e) {
        pendingMessages.push(msg);
        connect();
      }
    } else {
      pendingMessages.push(msg);
      connect();
    }
  }

  function handleClick(event) {
    if (!contextValid) return;

    if (event.button !== 0 && event.button !== 1) return;

    const target = event.target.closest('a');
    if (!target) return;

    const url = target.href;
    if (!url || url.startsWith('javascript:')) return;

    event.preventDefault();
    event.stopPropagation();

    sendMessage({
      action: 'openBorderless',
      url: url,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      metaKey: event.metaKey
    });
  }

  window.addEventListener('unload', () => {
    contextValid = false;
  });

  document.addEventListener('click', handleClick, true);
  document.addEventListener('auxclick', handleClick, true);

  // Start connection
  connect();
})();
