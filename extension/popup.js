const DEFAULT_CONFIG = { shift: true, ctrl: false };

document.addEventListener('DOMContentLoaded', () => {
  const enableToggle = document.getElementById('enableToggle');
  const optShift = document.getElementById('optShift');
  const optCtrl = document.getElementById('optCtrl');
  const shortcutDisplay = document.getElementById('shortcutDisplay');
  const warning = document.getElementById('warning');
  const status = document.getElementById('status');

  function updateShortcutDisplay() {
    const parts = ['Middle'];
    if (optShift.checked) parts.push('Shift');
    if (optCtrl.checked) parts.push('Ctrl');
    shortcutDisplay.textContent = parts.join(' + ');
  }

  chrome.runtime.sendMessage({ action: 'getEnabled' }, (response) => {
    if (response) {
      enableToggle.checked = response.enabled;
    }
  });

  chrome.runtime.sendMessage({ action: 'getModifierConfig' }, (response) => {
    if (response && response.config) {
      optShift.checked = response.config.shift;
      optCtrl.checked = response.config.ctrl;
      updateShortcutDisplay();
    }
  });

  enableToggle.addEventListener('change', () => {
    chrome.runtime.sendMessage({
      action: 'setEnabled',
      enabled: enableToggle.checked
    });
    status.textContent = enableToggle.checked ? 'Extension: Enabled' : 'Extension: Disabled';
  });

  function saveModifierConfig() {
    const config = {
      shift: optShift.checked,
      ctrl: optCtrl.checked
    };
    chrome.runtime.sendMessage({
      action: 'setModifierConfig',
      config: config
    });
    updateShortcutDisplay();
  }

  function validateModifiers() {
    if (!optShift.checked && !optCtrl.checked) {
      warning.style.display = 'block';
      optShift.checked = true;
      saveModifierConfig();
      setTimeout(() => {
        warning.style.display = 'none';
      }, 2000);
      return false;
    }
    warning.style.display = 'none';
    return true;
  }

  optShift.addEventListener('change', () => {
    if (!validateModifiers()) return;
    saveModifierConfig();
  });

  optCtrl.addEventListener('change', () => {
    if (!validateModifiers()) return;
    saveModifierConfig();
  });

  status.textContent = 'Ready';
});
