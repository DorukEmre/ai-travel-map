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

  const [chat] = useState(() =>
    ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
        systemInstruction: "Be concise and to the point in your answers, and also sarcastic",
      },
      history: [
        {
          role: "model",
          parts: [{ text: "Hello, where would you like to travel?" }],
        },
      ],
    })
  );

  useEffect(() => {
    setMessages([
      { text: "Hello, where would you like to travel?", isSent: false },
    ]);

  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim()) return;

    setError("");

    try {
      console.log(chat.getHistory());

      const response = await chat.sendMessage({ message: newMessage });

      const userMessage: Message = { text: newMessage, isSent: true };
      const aiMessage: Message = { text: response?.text ?? "error", isSent: false };

      setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);

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
