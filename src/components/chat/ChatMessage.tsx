import type { ChatMessage as ChatMessageType } from '@/lib/types';

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
        <p className={`font-serif text-sm leading-relaxed whitespace-pre-wrap ${isUser ? 'text-white' : 'text-ink'}`}>
          {message.content}
        </p>
      </div>
    </div>
  );
}
