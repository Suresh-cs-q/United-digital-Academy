import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from './udaKnowledgeBase';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  // Quick questions for better user experience
  const quickQuestions = [
    "What courses do you offer?",
    "How do I get free access?",
    "What is the minimum deposit?",
    "Is Daman Markets safe?",
    "How long does access last?"
  ];

  // WARNING: Do not expose your API key in client-side code in a real production application.
  // This is for local development purposes only, as per the user's request.
  const API_KEY = 'AIzaSyA19qhBs7qrQ8Y_R1eJJ8Wa80m5NNjzPkM';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setChatHistory([{ sender: 'bot', text: 'Hello! I\'m your Academy AI Tutor. I can help you learn about our free courses in Forex trading, digital marketing, English communication, and AI. How can I assist you today?' }]);
    }
  }, [isOpen, chatHistory]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: message };
    setChatHistory(prevChat => [...prevChat, userMessage]);
    setIsLoading(true);
    setMessage('');

    try {
      // Create a prompt that includes the system instructions and user message
      const fullPrompt = `${SYSTEM_PROMPT}

User Question: ${message}

Please provide a helpful response about United Digital Academy based on the knowledge base above. Remember to respond in plain text without any markdown formatting.`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      
      // Clean up any remaining markdown formatting
      text = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown
      text = text.replace(/\*(.*?)\*/g, '$1'); // Remove italic markdown
      text = text.replace(/`(.*?)`/g, '$1'); // Remove code markdown
      text = text.replace(/#{1,6}\s/g, ''); // Remove header markdown
      text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Convert links to plain text
      text = text.replace(/^\s*[-*+]\s/gm, '• '); // Convert list items to bullet points
      
      const botMessage = { sender: 'bot', text };
      setChatHistory(prevChat => [...prevChat, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = { sender: 'bot', text: "I'm having trouble connecting right now. Please try again later or contact us directly at info@u-d.academy or +972 77-221-8883." };
      setChatHistory(prevChat => [...prevChat, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    if (isLoading) return;
    
    const userMessage = { sender: 'user', text: question };
    setChatHistory(prevChat => [...prevChat, userMessage]);
    setIsLoading(true);

    // Process the question using the same logic as handleSendMessage
    const processQuestion = async () => {
      try {
        const fullPrompt = `${SYSTEM_PROMPT}

User Question: ${question}

Please provide a helpful response about United Digital Academy based on the knowledge base above. Remember to respond in plain text without any markdown formatting.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up any remaining markdown formatting
        text = text.replace(/\*\*(.*?)\*\*/g, '$1');
        text = text.replace(/\*(.*?)\*/g, '$1');
        text = text.replace(/`(.*?)`/g, '$1');
        text = text.replace(/#{1,6}\s/g, '');
        text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        text = text.replace(/^\s*[-*+]\s/gm, '• ');
        
        const botMessage = { sender: 'bot', text };
        setChatHistory(prevChat => [...prevChat, botMessage]);
      } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage = { sender: 'bot', text: "I'm having trouble connecting right now. Please try again later or contact us directly at info@u-d.academy or +972 77-221-8883." };
        setChatHistory(prevChat => [...prevChat, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    processQuestion();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-label ${isOpen ? 'hidden' : ''}`}>AI Academy Agent</div>
      <button className="chatbot-toggle" onClick={toggleChat} aria-label="Toggle chat">
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h2>Academy AI Tutor</h2>
            <button onClick={toggleChat} className="close-chat-btn">&times;</button>
          </div>
          <div className="chatbot-history" ref={chatHistoryRef}>
            {chatHistory.length === 1 && !isLoading && (
              <div className="quick-questions">
                <p className="quick-questions-title">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button 
                    key={index} 
                    className="quick-question-btn"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                {chat.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about our courses or how to get free access..."
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
