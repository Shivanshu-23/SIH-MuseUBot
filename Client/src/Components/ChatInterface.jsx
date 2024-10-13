import React, { useState, useEffect } from "react";
import "../Styles/ChatInterface.css";
import io from "socket.io-client";

// Connect to WebSocket server
const socket = io.connect("http://localhost:5000");

function ChatInterface() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    // Handle message submission
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        // Add user's message to chat
        const newMessages = [...messages, { sender: "user", text: inputValue }];
        setMessages(newMessages);

        // Send message to WebSocket server
        socket.emit("user_message", inputValue);

        // Clear input
        setInputValue("");
    };

    // Listen for bot response
    useEffect(() => {
        const handleBotResponse = (data) => {
            let botResponse = "";
            data.forEach((item) => {
                botResponse += item.text + " ";
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: botResponse },
            ]);
        };

        socket.on("bot_response", handleBotResponse);

        // Clean up the event listener
        return () => {
            socket.off("bot_response", handleBotResponse);
        };
    }, []);

    return (
        <div className="chat-container">
            <div className="chat-window">
                <div className="chat-header">
                    <h2>Museum Chat</h2>
                </div>
                <div className="chat-body">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${message.sender}`}
                        >
                            <div className="message-text">{message.text}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="chat-input-form">
                    <input
                        type="text"
                        placeholder="Ask a question about the museum..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="chat-input"
                    />
                    <button type="submit" className="send-button">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatInterface;
