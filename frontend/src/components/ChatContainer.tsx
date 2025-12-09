import { useEffect, useState } from 'react';
import { Chat, GoogleGenAI } from "@google/genai";

import MessageList from '@/components/MessageList';
import SendInput from '@/components/SendInput';
import SendButton from '@/components/SendButton';

import type { MarkerInfo, Message } from '@/types/types';
import TravelMap from '@/components/TravelMap';
import { createChatSession, INITIAL_MESSAGES, initialiseAI, queryCityNames } from '@/utils/chatUtils';



const ChatContainer = ({ restartKey }: { restartKey: number }) => {

  // AI initialisation
  const ai: GoogleGenAI = initialiseAI();

  // Chat instance
  const [chat, setChat] = useState<Chat>(createChatSession(ai));
  // Message list to be displayed
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  // New input message
  const [inputMessage, setInputMessage] = useState<string>("");
  // Error state
  const [error, setError] = useState<string>("");
  // List of formatted city names
  const [formattedCities, setFormattedCities] = useState<MarkerInfo[]>([]);

  // Reset chat session when restartKey changes (passed from Header)
  useEffect(() => {

    const initialiseChat = async () => {
      try {
        // Reset the chat instance
        setChat(createChatSession(ai));

        // Reset other states
        setMessages(INITIAL_MESSAGES);
        setInputMessage("");
        setError("");
        setFormattedCities([]);

      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown API error.");
      }
    };

    initialiseChat();

  }, [restartKey]);


  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputMessage.trim())
      return;

    // Input validation
    if (inputMessage.length > 200) {
      setError("Message is too long. Please limit to 200 characters.");
      return;
    }
    else if (error)
      setError("");

    try {
      // Send user message to AI and get response
      const response = await chat.sendMessage({ message: inputMessage });

      // Update message list with user and AI messages
      const userMessage: Message = { text: inputMessage, byUser: true };
      const aiMessage: Message = { text: response?.text ?? "error", byUser: false };
      const updatedMessages = [...messages, userMessage, aiMessage];

      setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);

      let citiesFromResponse = await queryCityNames(updatedMessages, ai);
      if (citiesFromResponse)
        setFormattedCities(citiesFromResponse);

      setInputMessage("");

    } catch (error) {
      console.error("Error generating content:", error);
      setError(error instanceof Error ? error.message : "Unknown API error.");
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

      {formattedCities && formattedCities.length > 0 &&
        <TravelMap cities={formattedCities} />
      }

      <form className="flex p-2 justify-end" onSubmit={handleSendMessage}>
        <SendInput message={inputMessage} setInputMessage={setInputMessage} />
        <SendButton />
      </form>

    </div>
  );
};

export default ChatContainer;
