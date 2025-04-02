const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 5000 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log("Received message:", message);
        
        const { message: userMessage, personality } = JSON.parse(message);

        // Define different responses based on personality
        let botResponse = "";

        switch (personality) {
            case "casual":
                botResponse = casualResponse(userMessage);
                break;
            case "witty":
                botResponse = wittyResponse(userMessage);
                break;
            case "formal":
            default:
                botResponse = formalResponse(userMessage);
                break;
        }

        // Send the adjusted response back to the client
        ws.send(botResponse);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

function formalResponse(message) {
    return `Formal Response: You asked, "${message}". How may I assist you further?`;
}

function casualResponse(message) {
    return `Casual Response: Yo! You just said: "${message}". What's up?`;
}

function wittyResponse(message) {
    return `Witty Response: Oh, you said: "${message}". Let's see if I can outsmart you on that! 😏`;
}

console.log("Server running on port 5000");