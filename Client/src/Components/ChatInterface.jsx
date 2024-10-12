import React, { useState } from 'react';
import '../Styles/ChatInterface.css';

function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  // Sample responses for the chatbot (you can replace this with actual API calls)
  const sampleResponses = {
    "events": "The upcoming events include a special art exhibition on October 15th and a live history performance on October 20th.",
    "shows": "The next museum shows include 'Ancient Egypt: Secrets Revealed' at 3 PM and 'Renaissance Art Highlights' at 5 PM.",
    "hours": "The museum is open from 9 AM to 7 PM on weekdays and 10 AM to 6 PM on weekends.",
    "tickets": "Tickets are available for $15 for adults, $10 for seniors, and free for children under 12."
  };

  const getBotResponse = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery.includes('event')) return sampleResponses["events"];
    if (lowerCaseQuery.includes('show')) return sampleResponses["shows"];
    if (lowerCaseQuery.includes('hour')) return sampleResponses["hours"];
    if (lowerCaseQuery.includes('ticket')) return sampleResponses["tickets"];
    return "I'm sorry, I don't have information about that. Can you try rephrasing your query?";
  };

  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user's message to chat
    const newMessages = [...messages, { sender: 'user', text: inputValue }];

    // Add bot's response after a delay (simulate thinking)
    setMessages(newMessages);
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 1000);

    // Clear input
    setInputValue('');
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <h2>Museum Chat</h2>
        </div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
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
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;
