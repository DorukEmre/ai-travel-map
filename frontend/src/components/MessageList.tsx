import MessageBubble from '@/components/MessageBubble';

import type { Message } from '@/types/types';

interface MessageListProps {
  messages: ReadonlyArray<Message>;
}

const MessageList = ({ messages }: MessageListProps) => {

  const formatText = (text: string) => {
    console.log(text);
    // Convert bold syntax **text** to <strong>text</strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert italic syntax *text* to <em>text</em>
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert bullet points into list items
    formattedText = formattedText.replace(/[\*]\s+(.*?)(?=\s*\*|\n|$)/g, '<li>$1</li>');

    // Check for bullet list items and wrap in <ul>
    const bulletListItems = formattedText.match(/<li>.*?<\/li>/g);
    if (bulletListItems) {
      formattedText = `<ul class="list-disc pl-5">${bulletListItems.join('')}</ul>`;
    }

    // Replace new lines with <br />
    formattedText = formattedText.replace(/\n/g, '<br />');

    return formattedText;
  };


  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id ?? index}
          text={<span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />}
          isSent={msg.isSent}
        />
      ))}
    </div>
  );
};

export default MessageList;
