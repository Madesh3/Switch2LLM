chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'searchWithEngine',
      title: 'Search with Default Engine',
      contexts: ['selection']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'searchWithEngine' && info.selectionText) {
      chrome.storage.sync.get('engine', ({ engine }) => {
        let url = '';
        if (engine === 'ChatGPT') url = `https://chat.openai.com/chat?q=${encodeURIComponent(info.selectionText)}`;
        else if (engine === 'Perplexity') url = `https://www.perplexity.ai/?q=${encodeURIComponent(info.selectionText)}`;
        else if (engine === 'Claude') url = `https://claude.ai/chat?q=${encodeURIComponent(info.selectionText)}`;
        chrome.tabs.create({ url });
      });
    }
  });
  