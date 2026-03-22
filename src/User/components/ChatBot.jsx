import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { chatWithAssistantApi } from "../../server/allApi";

const QUICK_QUESTIONS_GENERAL = [
  { icon: "health_and_safety", text: "General health tips" },
  { icon: "stethoscope", text: "When to see a doctor" },
  { icon: "medication", text: "Medicine information" },
  { icon: "emoji_emotions", text: "Mental health support" },
];

const QUICK_QUESTIONS_BOOKING = [
  { icon: "search", text: "Find a doctor" },
  { icon: "calendar_today", text: "Doctor availability" },
  { icon: "event", text: "My appointments" },
  { icon: "history", text: "Past appointments" },
];

const LoadingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-white dark:bg-[#1a2c2c] border border-gray-100 dark:border-[#2a3838] p-3 rounded-2xl rounded-bl-md">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  </div>
);

const ToolResultIndicator = ({ tools }) => (
  <div className="flex flex-wrap gap-1 mb-2">
    {tools.map((tool, index) => (
      <div
        key={index}
        className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
      >
        <span className="material-symbols-outlined text-xs">auto_awesome</span>
        <span>{tool.tool.replace(/([A-Z])/g, ' $1').trim()}</span>
      </div>
    ))}
  </div>
);

const MessageBubble = ({ message }) => (
  <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[85%] p-3 rounded-2xl text-sm ${
        message.role === "user"
          ? "bg-primary text-med-dark rounded-br-md"
          : "bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white border border-gray-100 dark:border-[#2a3838] rounded-bl-md"
      }`}
    >
      {message.role === "assistant" && (
        <div className="flex items-center gap-1 mb-1 text-xs text-primary font-medium">
          <span className="material-symbols-outlined text-sm">smart_toy</span>
          MedPulse AI
          {message.toolResults && message.toolResults.length > 0 && (
            <span className="ml-1 text-[10px] bg-primary/20 px-1.5 py-0.5 rounded-full">
              AI + Real Data
            </span>
          )}
        </div>
      )}
      {message.toolResults && message.toolResults.length > 0 && (
        <ToolResultIndicator tools={message.toolResults} />
      )}
      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
    </div>
  </div>
);

const ChatBot = ({ initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm MedPulse AI Assistant. How can I help you today? You can ask me about health topics, doctor availability, appointments, or general medical information. Remember, I'm not a substitute for professional medical advice!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: "user", content: messageText.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await chatWithAssistantApi(messageText.trim(), history);

      if (res.data.success) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: res.data.response,
          toolResults: res.data.toolResults || []
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Sorry, I couldn't process your message. Please try again."
        }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble connecting. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 sm:w-96 h-[500px] bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#2a3838] flex flex-col overflow-hidden z-[9999] animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-primary text-med-dark font-bold p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <span>MedPulse AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-black/10 rounded-full p-1 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#102222]">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about doctors, appointments..."
                className="flex-1 bg-gray-50 dark:bg-[#203030] border border-transparent focus:border-primary/50 rounded-xl px-4 py-2.5 text-sm text-med-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-med-dark rounded-xl px-4 py-2.5 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 w-14 h-14 bg-primary hover:bg-primary/90 text-med-dark rounded-full shadow-lg flex items-center justify-center transition-all z-[9999] ${
          isOpen ? "rotate-90" : "hover:scale-110"
        }`}
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-2xl">close</span>
        ) : (
          <span className="material-symbols-outlined text-2xl">chat</span>
        )}
      </button>
    </>
  );
};

export const QuickQuestionButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1a2c2c] border border-gray-200 dark:border-[#2a3838] rounded-xl text-sm text-med-dark dark:text-white hover:border-primary hover:bg-primary/5 transition-all w-full text-left"
  >
    <span className="material-symbols-outlined text-primary">{icon}</span>
    <span>{text}</span>
  </button>
);

export const ChatBotWithQuickQuestions = ({ initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm MedPulse AI Assistant. How can I help you today?\n\nI can help you with:\n• Finding doctors and checking availability\n• Viewing your appointments\n• General health questions\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingQuestions, setShowBookingQuestions] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { stats } = useSelector((state) => state.userDetail);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: "user", content: messageText.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await chatWithAssistantApi(messageText.trim(), history, stats?._id);

      if (res.data.success) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: res.data.response,
          toolResults: res.data.toolResults || []
        }]);
        
        if (res.data.toolResults && res.data.toolResults.length > 0) {
          setShowBookingQuestions(true);
        }
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Sorry, I couldn't process your message. Please try again."
        }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble connecting. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (text) => {
    sendMessage(text);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 sm:w-96 h-[500px] bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#2a3838] flex flex-col overflow-hidden z-[9999] animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-primary text-med-dark font-bold p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <span>MedPulse AI</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-black/10 rounded-full p-1 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#102222]">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {(showBookingQuestions ? QUICK_QUESTIONS_BOOKING : QUICK_QUESTIONS_GENERAL).map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q.text)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-[#1a2c2c] border border-gray-200 dark:border-[#2a3838] rounded-full text-xs text-med-dark dark:text-white hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-1 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-xs text-primary">{q.icon}</span>
                {q.text}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about doctors, appointments..."
                className="flex-1 bg-gray-50 dark:bg-[#203030] border border-transparent focus:border-primary/50 rounded-xl px-4 py-2.5 text-sm text-med-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-med-dark rounded-xl px-4 py-2.5 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 w-14 h-14 bg-primary hover:bg-primary/90 text-med-dark rounded-full shadow-lg flex items-center justify-center transition-all z-[9999] ${
          isOpen ? "rotate-90" : "hover:scale-110"
        }`}
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-2xl">close</span>
        ) : (
          <span className="material-symbols-outlined text-2xl">chat</span>
        )}
      </button>
    </>
  );
};

export default ChatBot;
