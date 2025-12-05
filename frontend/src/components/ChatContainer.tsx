import MessageList from '@/components/MessageList';
import SendInput from '@/components/SendInput';
import SendButton from '@/components/SendButton';

const ChatContainer = () => {

  const messages = [
    { text: "Hello, how can I assist you?", isSent: false },
    { text: "I'm looking for travel suggestions.", isSent: true },
    { text: "What destination do you have in mind?", isSent: false },
  ];

  return (
    <div className="flex flex-col h-full">

      <MessageList messages={messages} />

      <div className="flex p-2 justify-end">
        <SendInput />
        <SendButton />
      </div>

    </div>
  );
};

export default ChatContainer;
