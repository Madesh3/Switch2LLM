document.getElementById('saveButton').addEventListener('click', function() {
  const chatgptPrefix = document.getElementById('chatgpt').value.trim();
  const claudePrefix = document.getElementById('claude').value.trim();
  const perplexityPrefix = document.getElementById('perplexity').value.trim();

  // Save the prefixes to chrome storage
  chrome.storage.sync.set({
    chatgptPrefix,
    claudePrefix,
    perplexityPrefix,
  }, function() {
    alert("Custom prefixes saved!");
  });
});

// On load, populate the fields with saved values
window.onload = function() {
  chrome.storage.sync.get(['chatgptPrefix', 'claudePrefix', 'perplexityPrefix'], function(data) {
    document.getElementById('chatgpt').value = data.chatgptPrefix || 'chatgpt';
    document.getElementById('claude').value = data.claudePrefix || 'claude';
    document.getElementById('perplexity').value = data.perplexityPrefix || 'perplexity';
  });
};
