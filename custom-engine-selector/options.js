document.getElementById('save').addEventListener('click', () => {
    const engine = document.getElementById('engine').value;
    chrome.storage.sync.set({ engine }, () => {
      alert('Default engine saved!');
    });
  });
  