
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Zap } from 'lucide-react';
import api from '../../services/api/client';
import { Message } from '../../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Salom! Men Buddy AI Pro-man. Hozirda menda "Thinking Mode" yoqilgan, murakkab texnik savollaringizga va o\'quvchilar muammolariga chuqur tahliliy yechim bera olaman. Qanday yordam kerak?' }
  ]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('chat/history/');
        if (res.data && res.data.length > 0) {
          setMessages(res.data);
        }
      } catch (err) {
        console.error('Chat history fetch ignored or failed', err);
      }
    };
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    // Optimistic UI update
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await api.post('chat/send/', { text: userMessage });
      // Backend returns both user msg and model msg inside array
      const newMessages = res.data;
      if (Array.isArray(newMessages)) {
        // Appending only the model's reply (index 1) since we already added user's locally
        const modelReply = newMessages.find((m: any) => m.role === 'model');
        if (modelReply) {
          setMessages(prev => [...prev, modelReply]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "Kechirasiz, javob olishda xatolik yuz berdi." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Kechirasiz, hozirda men bilan bog'lanib bo'lmayapti. Iltimos, keyinroq urinib ko'ring." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl shadow-[0_0_40px_rgba(96,165,250,0.15)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        >
          <div className="relative">
            <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1 border-2 border-[#0a0a0c]">
              <Zap className="w-3 h-3 text-[#0a0a0c] fill-current" />
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed sm:absolute bottom-0 right-0 sm:bottom-auto sm:right-auto sm:relative w-screen sm:w-[380px] md:w-[400px] h-[70vh] sm:h-[550px] max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-6rem)] bg-[#121214] border border-white/10 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                <Bot className="text-white w-6 h-6" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121214] rounded-full"></div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm flex items-center">
                  Buddy AI Pro
                  {/* FIX: Wrapping Zap in a span with title to fix the property 'title' error on Lucide icons */}
                  <span title="Thinking mode active">
                    <Zap className="w-3 h-3 ml-1 text-yellow-300 fill-current" />
                  </span>
                </h4>
                <p className="text-blue-200 text-[10px] uppercase font-bold tracking-widest">Active Analysis</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg border ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none border-blue-500'
                  : 'bg-white/5 text-slate-200 rounded-tl-none border-white/10'
                  }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-slate-300 p-4 rounded-2xl rounded-tl-none flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Chuqur tahlil qilinmoqda...</span>
                  </div>
                  <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]"></div>
                  </div>
                  <style>{`
                    @keyframes loading {
                      0% { width: 0%; transform: translateX(-100%); }
                      50% { width: 50%; transform: translateX(50%); }
                      100% { width: 0%; transform: translateX(200%); }
                    }
                  `}</style>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-[#0a0a0c]">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Savolingiz yoki o'quvchi muammosi..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:bg-slate-700 hover:bg-blue-500 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500 mt-2">
              Gemini 3 Pro + Max Thinking Mode faol.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
