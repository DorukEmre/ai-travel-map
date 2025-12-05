import { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

import MessageList from '@/components/MessageList';
import SendInput from '@/components/SendInput';
import SendButton from '@/components/SendButton';

import type { Message } from '@/types/types';


const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const createNewChatSession = () => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      systemInstruction: "Be concise and to the point in your answers. Be sarcastic. Help the user identify relevant travel destinations and suggest potential travel locations.",
    },
    history: [
      {
        role: "model",
        parts: [{ text: "Hello, where would you like to travel?" }],
      },
    ],
  });
};

const INITIAL_MESSAGES = [
  { text: "Hello, where would you like to travel?", isSent: false },
];

const ChatContainer = ({ restartKey }: { restartKey: number }) => {

  // Chat instance
  const [chat, setChat] = useState(createNewChatSession);
  // Message list to be displayed
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  // New message input
  const [newMessage, setNewMessage] = useState<string>("");
  // Error state
  const [error, setError] = useState<string>("");


  // Reset chat session when restartKey changes (passed from Header)
  useEffect(() => {

    setChat(createNewChatSession()); // Reset the chat instance

    setMessages(INITIAL_MESSAGES); // Reset the message list

    setNewMessage("");
    setError("");

  }, [restartKey]);


  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim())
      return;

    // Input validation
    if (newMessage.length > 200) {
      setError("Message is too long. Please limit to 200 characters.");
      return;
    }
    else if (error)
      setError("");

    try {
      // Send user message to AI and get response
      const response = await chat.sendMessage({ message: newMessage });

      // Update message list with user and AI messages
      const userMessage: Message = { text: newMessage, isSent: true };
      const aiMessage: Message = { text: response?.text ?? "error", isSent: false };
      setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);

      setNewMessage("");

    } catch (error) {
      console.error("Error generating content:", error);

      setError(error instanceof Error ? error.message : "An unknown error occurred.");
    }

  };

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
