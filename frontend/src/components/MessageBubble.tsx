
interface MessageBubbleProps {
  text: React.ReactNode;
  isSent: boolean;
}

const MessageBubble = ({ text, isSent }: MessageBubbleProps) => {

  let bgColorClass = isSent
    ? "bg-emerald-800"
    : "bg-zinc-800";

  let rounded = isSent
    ? "rounded-tl-lg rounded-bl-lg rounded-br-lg"
    : "rounded-tr-lg rounded-br-lg rounded-bl-lg";

  let justify = isSent
    ? "justify-end"
    : "justify-start";

  return (
    <div className={`flex mb-2 ${justify}`}>
      <div
        className={`p-4 max-w-sm ${rounded} ${bgColorClass}`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
