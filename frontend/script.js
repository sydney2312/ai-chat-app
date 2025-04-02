// script.js
const socket = io('http://localhost:5000'); // Connect to the WebSocket server

// Listen for messages from the backend (AI response)
socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');
    messageDiv.textContent = `AI: ${data.text}`;
    messagesDiv.appendChild(messageDiv);
});

// Send user message to the backend
function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    if (userMessage) {
        const messagesDiv = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.textContent = `You: ${userMessage}`;
        messagesDiv.appendChild(messageDiv);
        socket.emit('message', userMessage);
        document.getElementById('userMessage').value = ''; // Clear the input field
    }
}