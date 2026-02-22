'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatWidgetProps {
  verseRef: string;
  commentaryContext: string;
}

type GeminiHistoryItem = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

export function ChatWidget({ verseRef, commentaryContext }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiHistory = useRef<GeminiHistoryItem[]>([]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleQuestion = async (question: string) => {
    setError(null);

    const userMsg: ChatMessageType = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMsg]);

    // Add to Gemini history
    geminiHistory.current.push({ role: 'user', parts: [{ text: question }] });

    setIsStreaming(true);
    let assistantContent = '';
    const assistantMsgIndex = messages.length + 1;

    // Add a placeholder for the streaming response
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/gita/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verseRef,
          question,
          commentaryContext,
          history: geminiHistory.current.slice(0, -1), // exclude the latest user message (sent separately)
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantMsgIndex] = { role: 'assistant', content: assistantContent };
          return updated;
        });
      }

      // Add to Gemini history
      geminiHistory.current.push({ role: 'model', parts: [{ text: assistantContent }] });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'An error occurred.';
      setError(errMsg);
      // Remove the empty placeholder message on error
      setMessages((prev) => prev.slice(0, assistantMsgIndex));
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="mt-8 border border-earth-200 rounded-xl overflow-hidden bg-white/60">
      {/* Header / Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-earth-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center">
            <span className="text-saffron-600 text-sm font-devanagari">ॐ</span>
          </div>
          <div className="text-left">
            <div className="font-sans text-sm font-semibold text-earth-800">
              Ask a Question
            </div>
            <div className="font-sans text-xs text-earth-400">
              AI-guided inquiry about verse {verseRef}
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-earth-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Messages */}
          <div className="border-t border-earth-100 bg-earth-50/50 min-h-[200px] max-h-[400px] overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="font-serif text-earth-500 italic text-sm mb-4">
                  Ask anything about verse {verseRef} — its meaning, context, what different
                  commentators say, or how it relates to other teachings.
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    'What is the central teaching here?',
                    'How do Sankara and Ramanuja differ on this?',
                    'What does this mean for daily life?',
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuestion(prompt)}
                      disabled={isStreaming}
                      className="font-sans text-xs text-earth-600 bg-white border border-earth-200 rounded-full px-3 py-1.5 hover:border-saffron-300 hover:text-saffron-700 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} />
                ))}
                {isStreaming && messages[messages.length - 1]?.content === '' && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-white border border-earth-200 rounded-xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <ChatInput onSubmit={handleQuestion} disabled={isStreaming} />

          {error && (
            <div className="px-4 py-3 bg-saffron-50 border-t border-saffron-100 flex items-start gap-2">
              <span className="text-saffron-500 mt-0.5 flex-shrink-0">⏳</span>
              <p className="font-sans text-xs text-earth-700">{error}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
