import { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

import MessageList from '@/components/MessageList';
import SendInput from '@/components/SendInput';
import SendButton from '@/components/SendButton';

import type { Message } from '@/types/types';

const ChatContainer = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setMessages([
      { text: "Hello, how can I assist you?", isSent: false },
      { text: "I'm looking for travel suggestions.", isSent: true },
      { text: "What destination do you have in mind?", isSent: false },
    ]);
  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim()) return;


    const messageToSend: Message = { text: newMessage, isSent: true };

    setMessages((prevMessages) => [...prevMessages, messageToSend]);

    try {

      setError("");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: newMessage,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
        }
      });

      const aiMessage: Message = { text: response?.text ?? "error", isSent: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      setNewMessage("");

    } catch (error) {
      console.error("Error generating content:", error);

      setError(error instanceof Error ? error.message : "An unknown error occurred.");
    }


  }

  return (
    <div className="flex flex-col h-full">

      <MessageList messages={messages} />

      {error && (
        <div className="bg-red-100 text-red-700 p-2 m-2 rounded">
          Error: {error}
        </div>
      )}

      <form className="flex p-2 justify-end" onSubmit={handleSendMessage}>
        <SendInput message={newMessage} setNewMessage={setNewMessage} />
        <SendButton />
      </form>

    </div>
  );
};

export default ChatContainer;
