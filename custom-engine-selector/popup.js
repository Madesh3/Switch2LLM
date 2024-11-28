document.getElementById('search').addEventListener('click', () => {
    chrome.storage.sync.get('engine', ({ engine }) => {
      const query = prompt('Enter your search query:');
      if (query) {
        let url = '';
        if (engine === 'ChatGPT') url = `https://chat.openai.com/chat?q=${encodeURIComponent(query)}`;
        else if (engine === 'Perplexity') url = `https://www.perplexity.ai/?q=${encodeURIComponent(query)}`;
        else if (engine === 'Claude') url = `https://claude.ai/chat?q=${encodeURIComponent(query)}`;
        chrome.tabs.create({ url });
      }
    });
  });
  