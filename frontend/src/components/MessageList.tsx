import MessageBubble from '@/components/MessageBubble';

import type { MessageListProps } from '@/types/types';


const MessageList = ({ messages }: MessageListProps) => {

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id ?? index}
          text={msg.text}
          isSent={msg.isSent}
        />
      ))}
    </div>
  );
};

export default MessageList;
