chrome.omnibox.onInputEntered.addListener(function(text) {
  let [prefix, ...queryParts] = text.split(' ');
  let query = queryParts.join(' ');

  console.log('Prefix:', prefix);
  console.log('Query:', query);

  // Prevent sending empty queries
  if (!query) {
    alert("Please enter a query after the prefix.");
    return;
  }

  // Get the custom prefixes from chrome storage
  chrome.storage.sync.get(
    ['chatgptPrefix', 'claudePrefix', 'perplexityPrefix'],
    function(data) {
      console.log('Stored prefixes:', data); // Add this line

      // Use the default prefix if the user hasn't set any custom prefix
      const chatgptPrefix = data.chatgptPrefix || 'chatgpt';
      const claudePrefix = data.claudePrefix || 'claude';
      const perplexityPrefix = data.perplexityPrefix || 'perplexity';

      // Match the prefix with user input
      switch (prefix.toLowerCase()) {
        case chatgptPrefix:
          openLLM(query, 'https://chatgpt.com/?q=%s');
          break;
        case claudePrefix:
          openLLM(query, 'https://claude.ai/new?q=%s');
          break;
        case perplexityPrefix:
          openLLM(query, 'https://www.perplexity.ai/search?q=%s');
          break;
        default:
          alert("Invalid prefix. Please use the correct prefix.");
      }
    }
  );
});

// The openLLM function
function openLLM(query, urlTemplate) {
  // Replace %s with the query to form the full URL
  const url = urlTemplate.replace('%s', encodeURIComponent(query));

  // Open the appropriate LLM page with the query
  chrome.tabs.create({ url });
}
