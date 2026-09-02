import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  User,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../../context/AppContext';

export const AIChatSection: React.FC = () => {
  const {
    currentUser,
    devScoreReport,
    aiChatMessages,
    isAILoading,
    isAIDemoMode,
    sendAIChatMessage,
    clearAIChat,
    setActiveAssistantTab,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPills = [
    'Which skills should I learn?',
    'How can I improve my resume?',
    'What jobs match my profile?',
    'What projects should I build?',
    'How can I prepare for interviews?',
    'What should I learn next?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChatMessages, isAILoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAILoading) return;
    const msg = inputMessage;
    setInputMessage('');
    sendAIChatMessage(msg);
  };

  const handlePillClick = (prompt: string) => {
    if (isAILoading) return;
    sendAIChatMessage(prompt);
  };

  return (
    <div className="flex flex-col h-[750px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">DevNexus Career Advisor</h2>
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Gemini 3.7 Flash
              </span>
              {isAIDemoMode && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Preview Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Grounded in your profile: DevScore ({devScoreReport.overallScore} pts), {currentUser.skills.length} skills & {currentUser.codingStats.leetCodeSolved} LeetCode solves
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearAIChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
            title="Clear conversation history"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Chat
          </button>
        </div>
      </div>

      {/* Profile Context Ribbon */}
      <div className="bg-slate-950/40 border-b border-slate-800/60 px-6 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-slate-500 font-medium">Context:</span>
          <span className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            {currentUser.fullName}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 font-mono text-[11px] bg-slate-800/60 px-1.5 py-0.5 rounded">
            DevScore: {devScoreReport.overallScore}/1000
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">Target: Backend / Distributed Systems</span>
        </div>
        <button
          onClick={() => setActiveAssistantTab('recommendations')}
          className="text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1 shrink-0 ml-2"
        >
          View Full Plan <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {aiChatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4.5 ${
                  isUser
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none shadow-lg shadow-blue-500/10'
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                {isUser ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="text-sm leading-relaxed prose prose-invert max-w-none prose-headings:text-white prose-headings:font-semibold prose-h3:text-base prose-h3:mt-2 prose-h3:mb-2 prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-cyan-300 prose-code:text-cyan-300 prose-code:bg-slate-900/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}

                {/* Follow-up suggestions inside message */}
                {msg.suggestedPills && msg.suggestedPills.length > 0 && !isUser && (
                  <div className="mt-4 pt-3 border-t border-slate-700/50">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Suggested Follow-ups:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedPills.map((pill, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePillClick(pill)}
                          disabled={isAILoading}
                          className="text-xs px-2.5 py-1 bg-slate-900/80 hover:bg-slate-700 border border-slate-700/80 hover:border-cyan-500/40 text-slate-300 hover:text-white rounded-lg transition-all text-left"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[11px] mt-2 ${isUser ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 overflow-hidden">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
              )}
            </div>
          );
        })}

        {isAILoading && (
          <div className="flex gap-3.5 justify-start">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl rounded-tl-none p-4 max-w-[80%] flex items-center gap-3">
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
              </div>
              <span className="text-xs text-slate-400">Analyzing developer profile & generating advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="bg-slate-950/60 border-t border-slate-800/80 px-6 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs text-slate-500 shrink-0 flex items-center gap-1 font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Prompts:
          </span>
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handlePillClick(pill)}
              disabled={isAILoading}
              className="text-xs shrink-0 px-3 py-1 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 rounded-full transition-all disabled:opacity-50"
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="bg-slate-950 border-t border-slate-800 px-6 py-4 flex items-center gap-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask anything (e.g. Which skills should I learn next? How to improve my resume?)"
          disabled={isAILoading}
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isAILoading}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
