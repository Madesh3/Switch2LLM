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
    createNotification("Prefixes updated!");
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

// Create and show a new notification
function createNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Apply fade-in effect
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 10); // Small delay to ensure the CSS transition is applied

  // Fade out and remove the notification after 2 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.remove();
    }, 2000); // Matches the CSS transition duration
  }, 2000);
}
