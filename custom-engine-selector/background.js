// Initialize default search engine
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    engine: 'Perplexity',
    engines: {
      'Perplexity': {
        name: 'Perplexity AI',
        search_url: 'https://www.perplexity.ai/search?q={searchTerms}'
      },
      'ChatGPT': {
        name: 'ChatGPT',
        search_url: 'https://chat.openai.com/chat?q={searchTerms}'
      },
      'Claude': {
        name: 'Claude AI',
        search_url: 'https://claude.ai/chat?q={searchTerms}'
      },
      'Gemini': {
        name: 'Google Gemini',
        search_url: 'https://gemini.google.com/app?q={searchTerms}'
      }
    }
  });

  chrome.contextMenus.create({
    id: 'searchWithEngine',
    title: 'Open in Default Engine',
    contexts: ['selection']
  });
});

// Function to update search provider
async function updateSearchProvider(engineName) {
  const { engines } = await chrome.storage.sync.get('engines');
  const engine = engines[engineName];
  
  if (engine) {
    await chrome.search.updateSearchProvider({
      name: engine.name,
      keyword: engineName.toLowerCase(),
      is_default: true,
      encoding: 'UTF-8',
      search_url: engine.search_url
    });
    
    // Update badge
    chrome.action.setBadgeText({ text: engineName.substring(0, 2) });
    chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
    
    // Show notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Search Engine Changed',
      message: `Default search engine is now ${engine.name}`
    });
  }
}

// Handle keyboard commands
chrome.commands.onCommand.addListener((command) => {
  let newEngine = '';
  switch (command) {
    case 'switch-to-chatgpt':
      newEngine = 'ChatGPT';
      break;
    case 'switch-to-perplexity':
      newEngine = 'Perplexity';
      break;
    case 'switch-to-claude':
      newEngine = 'Claude';
      break;
  }
  
  if (newEngine) {
    chrome.storage.sync.set({ engine: newEngine }, () => {
      updateSearchProvider(newEngine);
    });
  }
});

// Handle context menu search
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'searchWithEngine' && info.selectionText) {
    chrome.storage.sync.get(['engine', 'engines'], (data) => {
      const baseUrl = data.engines[data.engine].search_url;
      if (baseUrl) {
        chrome.tabs.create({ url: baseUrl.replace('{searchTerms}', encodeURIComponent(info.selectionText)) });
      }
    });
  }
});

// Handle omnibox search
chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.sync.get(['engine', 'engines'], (data) => {
    const baseUrl = data.engines[data.engine].search_url;
    if (baseUrl) {
      const searchUrl = baseUrl.replace('{searchTerms}', encodeURIComponent(text));
      chrome.tabs.create({ url: searchUrl });
    }
  });
});