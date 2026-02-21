import type { ChatMessage as ChatMessageType } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-saffron-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
          <span className="text-saffron-600 text-xs font-devanagari">ॐ</span>
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-xl px-4 py-3 ${
          isUser
            ? 'bg-saffron-500 text-white rounded-br-sm'
            : 'bg-white border border-earth-200 text-ink rounded-bl-sm'
        }`}
      >
        {isUser ? (
          <p className="font-serif text-sm leading-relaxed text-white whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div className="font-serif text-sm leading-relaxed text-ink prose-sm prose-headings:font-sans prose-headings:font-semibold prose-headings:text-earth-800 prose-strong:font-semibold prose-strong:text-earth-900 prose-ol:pl-4 prose-ul:pl-4">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h3 className="font-sans font-semibold text-earth-800 text-sm mt-3 mb-1">{children}</h3>,
                h2: ({ children }) => <h3 className="font-sans font-semibold text-earth-800 text-sm mt-3 mb-1">{children}</h3>,
                h3: ({ children }) => <h3 className="font-sans font-semibold text-earth-800 text-sm mt-3 mb-1">{children}</h3>,
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-earth-900">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-saffron-300 pl-3 italic text-earth-600 my-2">{children}</blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
