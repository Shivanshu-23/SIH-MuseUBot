import React, { useState, useEffect } from "react";
import "../Styles/ChatInterface.css";
import io from "socket.io-client";

// Connect to WebSocket server
const socket = io.connect("http://localhost:5000");

function ChatInterface() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

<<<<<<< HEAD
  // Sample responses for the chatbot (you can replace this with actual API calls)
  const sampleResponses = {
    "events": "The upcoming events include a special art exhibition on October 15th and a live history performance on October 20th.",
    "shows": "The next museum shows include 'Ancient Egypt: Secrets Revealed' at 3 PM and 'Renaissance Art Highlights' at 5 PM.",
    "hours": "The museum is open from 9 AM to 7 PM on weekdays and 10 AM to 6 PM on weekends.",
    "tickets": "Tickets are available for Rs15 for adults, Rs10 for seniors, and free for children under 12."
  };
=======
    // Handle message submission
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;
>>>>>>> 1abb8c4cb24def09a3f900d6e651977792190d75

        // Add user's message to chat
        const newMessages = [...messages, { sender: "user", text: inputValue }];
        setMessages(newMessages);

        // Send message to WebSocket server
        socket.emit("user_message", inputValue);

        // Clear input
        setInputValue("");
    };

    // Handle reset conversation
    const handleResetConversation = () => {
        socket.emit("user_message", "/reset_conversation");
    };

    // Listen for bot response
    useEffect(() => {
        const handleBotResponse = (data) => {
            const newMessages = data.map((item) => ({
                sender: "bot",
                text: item.text,
            }));
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };

<<<<<<< HEAD
  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <h2>Museum Chat</h2>
        </div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message Rs{message.sender}`}>
              <div className="message-text">{message.text}</div>
=======
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
                   
                        <button
                            onClick={handleResetConversation}
                            className="reset-button"
                        >
                            Reset Conversation
                        </button>
                   

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
>>>>>>> 1abb8c4cb24def09a3f900d6e651977792190d75
            </div>
        </div>
    );
}

export default ChatInterface;
