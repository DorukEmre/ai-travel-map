type Message = {
  id?: string;
  text: string;
  isSent: boolean;
};

interface MessageListProps {
  messages: ReadonlyArray<Message>;
}

export { Message, MessageListProps };
