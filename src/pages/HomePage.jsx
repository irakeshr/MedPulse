import React, { useState } from 'react';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import { chatWithAssistantApi } from '../server/allApi';

const QUICK_QUESTIONS = [
  { icon: "search", text: "Find a doctor" },
  { icon: "calendar_today", text: "Doctor availability" },
  { icon: "stethoscope", text: "Health information" },
  { icon: "medical_information", text: "Medical guidance" },
];

const HomePage = () => {
    const [switchPage, setSwitchPage] = useState(false);
    const [showAIPanel, setShowAIPanel] = useState(false);
    const [messages, setMessages] = useState([
      {
        role: "assistant",
        content: "Hi! I'm MedPulse AI Assistant. How can I help you today?\n\nI can help you with:\n• Finding doctors and checking availability\n• Health information and guidance\n• General medical questions\n\nWhat would you like to know?"
      }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async (messageText) => {
      if (!messageText.trim() || isLoading) return;

      const userMessage = { role: "user", content: messageText.trim() };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      scrollToBottom();

      try {
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        const res = await chatWithAssistantApi(messageText.trim(), history);

        if (res.data.success) {
          setMessages(prev => [...prev, { role: "assistant", content: res.data.response }]);
        } else {
          setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process your message. Please try again." }]);
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting. Please try again later." }]);
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      sendMessage(input);
    };

    return (
        <div>
           <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={true}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  toastClassName={() => "relative flex p-0 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"}
  bodyClassName={() => "flex text-sm font-white font-med block"}
  style={{ width: "auto", background: "none", boxShadow: "none" }} 
/>
            <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200 min-h-screen flex flex-col">
  
    {/* AI Banner */}
    <div className="bg-gradient-to-r from-[#13ecec]/20 via-[#13ecec]/10 to-[#13ecec]/20 dark:from-[#13ecec]/10 dark:via-[#13ecec]/5 dark:to-[#13ecec]/10 border-b border-primary/20">
      <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
          </div>
          <div>
            <h3 className="font-bold text-med-dark dark:text-white text-sm">MedPulse AI Assistant</h3>
            <p className="text-xs text-med-text-secondary dark:text-gray-400">Powered by Groq • Available 24/7</p>
          </div>
        </div>
        <button
          onClick={() => setShowAIPanel(!showAIPanel)}
          className="px-4 py-2 bg-primary hover:bg-primary/80 text-med-dark font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">chat</span>
          Chat Now
        </button>
      </div>
    </div>

    {/* AI Chat Panel */}
    {showAIPanel && (
      <div className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center p-4" onClick={() => setShowAIPanel(false)}>
        <div className="w-full max-w-lg h-[600px] bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#2a3838] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="bg-primary text-med-dark font-bold p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <span>MedPulse AI Assistant</span>
            </div>
            <button onClick={() => setShowAIPanel(false)} className="hover:bg-black/10 rounded-full p-1 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#102222]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-med-dark rounded-br-md"
                    : "bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white border border-gray-100 dark:border-[#2a3838] rounded-bl-md"
                }`}>
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1 mb-1 text-xs text-primary font-medium">
                      <span className="material-symbols-outlined text-sm">smart_toy</span>
                      MedPulse AI
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#1a2c2c] border border-gray-100 dark:border-[#2a3838] p-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q.text)}
                className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-[#1a2c2c] border border-gray-200 dark:border-[#2a3838] rounded-full text-xs text-med-dark dark:text-white hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-1"
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
                placeholder="Ask me anything about health..."
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
      </div>
    )}
  
  <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 max-w-[1440px] mx-auto w-full gap-12 lg:gap-20">
    <div className="hidden lg:flex flex-col justify-center flex-1 max-w-xl">
      <h1 className="text-4xl lg:text-5xl font-bold text-med-dark dark:text-white leading-[1.15] mb-6">
        Connect with the <br />
        <span className="text-primary">future of healthcare.</span>
      </h1>
      <p className="text-lg text-med-text-secondary dark:text-gray-400 mb-10 leading-relaxed">
        MedPulse bridges the gap between patients and medical professionals. Share symptoms securely, get verified advice, and join a community that cares.
      </p>
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-white dark:bg-[#1a2c2c] shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">verified_user</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-med-dark dark:text-white">Expert Guidance</h3>
            <p className="text-med-text-secondary dark:text-gray-400 mt-1 text-sm">Access insights from verified doctors and specialists quickly.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-white dark:bg-[#1a2c2c] shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">vital_signs</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-med-dark dark:text-white">Symptom Tracking</h3>
            <p className="text-med-text-secondary dark:text-gray-400 mt-1 text-sm">Log your health data and receive community-driven analysis.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-white dark:bg-[#1a2c2c] shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">smart_toy</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-med-dark dark:text-white">AI Assistant</h3>
            <p className="text-med-text-secondary dark:text-gray-400 mt-1 text-sm">Get instant health guidance from our AI assistant available 24/7.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-white dark:bg-[#1a2c2c] shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-med-dark dark:text-white">Privacy First</h3>
            <p className="text-med-text-secondary dark:text-gray-400 mt-1 text-sm">Your medical data is encrypted and remains under your control.</p>
          </div>
        </div>
      </div>
    </div>

    { switchPage ? <Register setLoginPage={setSwitchPage}/> :<Login setRegisterPage={setSwitchPage}/>} 

    <div className="mt-8 flex justify-center gap-6 text-sm text-med-text-secondary dark:text-gray-500 lg:hidden">
      <a className="hover:text-med-dark dark:hover:text-white transition-colors" href="#">Help Center</a>
      <a className="hover:text-med-dark dark:hover:text-white transition-colors" href="#">Privacy</a>
      <a className="hover:text-med-dark dark:hover:text-white transition-colors" href="#">Terms</a>
    </div>
  </main>
</div>
        </div>
    );
}

export default HomePage;
