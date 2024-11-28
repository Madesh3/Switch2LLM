document.addEventListener('DOMContentLoaded', () => {
  // Update active engine button
  chrome.storage.sync.get(['engine', 'engines'], ({ engine, engines }) => {
    const activeBtn = document.getElementById(engine.toLowerCase());
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
  });

  // Add click handlers for all engine buttons
  const engines = ['perplexity', 'chatgpt', 'claude', 'gemini'];
  engines.forEach(engineId => {
    const button = document.getElementById(engineId);
    if (button) {
      button.addEventListener('click', () => {
        const engineName = engineId.charAt(0).toUpperCase() + engineId.slice(1);
        
        // Update storage and search provider
        chrome.storage.sync.set({ engine: engineName }, () => {
          chrome.runtime.getBackgroundPage((backgroundPage) => {
            backgroundPage.updateSearchProvider(engineName);
          });
          window.close();
        });
      });
    }
  });
});