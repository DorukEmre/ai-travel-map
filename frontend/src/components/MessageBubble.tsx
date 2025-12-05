import type { Message } from "@/types/types";

const MessageBubble = ({ text, isSent }: Message) => {

  let bgColorClass = isSent
    ? "bg-emerald-800 text-gray-200"
    : "bg-slate-950 text-gray-200";

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`p-3 rounded-lg max-w-xs ${bgColorClass}`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
