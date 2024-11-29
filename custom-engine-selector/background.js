chrome.omnibox.onInputEntered.addListener((text) => {
    let [llmChoice, ...queryParts] = text.split(' ');
    let query = queryParts.join(' ');
  
    // Prevent sending empty queries
    if (!query) {
      alert("Please enter a query after the LLM choice.");
      return;
    }
  
    switch (llmChoice.toLowerCase()) {
      case "chatgpt":
        openLLM(query, 'https://chatgpt.com/?q=%s');
        break;
      case "claude":
        openLLM(query, 'https://claude.ai/new?q=%s');
        break;
      case "perplexity":
        openLLM(query, 'https://www.perplexity.ai/search?q=%s');
        break;
      case "gemini":
        openLLM(query, 'https://gemini.google.com/?q=%s'); // Assuming this is the correct URL structure
        break;
      default:
        alert("Invalid LLM choice. Please type 'chatgpt', 'claude', 'perplexity', or 'gemini'.");
    }
  });
  
  function openLLM(query, urlTemplate) {
    // Replace %s with the query to form the full URL
    const url = urlTemplate.replace('%s', encodeURIComponent(query));
  
    // Open the appropriate LLM page with the query
    chrome.tabs.create({ url });
  }