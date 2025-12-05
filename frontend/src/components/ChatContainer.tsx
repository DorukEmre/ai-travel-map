import { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

import MessageList from '@/components/MessageList';
import SendInput from '@/components/SendInput';
import SendButton from '@/components/SendButton';

import type { MarkerInfo, Message } from '@/types/types';
import TravelMap from '@/components/TravelMap';


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

const COMMON_WORDS = [
  "Hello", "Oh", "How", "Well", "Instagrammable", "You", "Or", "If", "Any", "So", "Are", "I", "What", "Where", "Why", "When"
]

const ChatContainer = ({ restartKey }: { restartKey: number }) => {

  // Chat instance
  const [chat, setChat] = useState(createNewChatSession);
  // Message list to be displayed
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  // New message input
  const [newMessage, setNewMessage] = useState<string>("");
  // Error state
  const [error, setError] = useState<string>("");
  // List of city names
  const [extractedCityNames, setExtractedCityNames] = useState<string[]>([]);
  const [formattedCities, setFormattedCities] = useState<MarkerInfo[]>([]);


  // Reset chat session when restartKey changes (passed from Header)
  useEffect(() => {

    setChat(createNewChatSession()); // Reset the chat instance

    setMessages(INITIAL_MESSAGES); // Reset the message list

    setNewMessage("");
    setError("");
    setExtractedCityNames([]);
    setFormattedCities([]);

  }, [restartKey]);

  const extractJsonArray = (response: string) => {
    const jsonMatch = response.match(/```json\n([\s\S]*?)```/);
    console.log("jsonMatch: ", jsonMatch);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    }
    return [];
  };

  useEffect(() => {

    const queryCityNames = async () => {
      if (!extractedCityNames || extractedCityNames.length == 0)
        return;

      let citiesStr = extractedCityNames.join(", ");

      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: "Check this list for city names and return a json containing an array of objects on this model: [{ city: \"Madrid\", position: [40.417, -3.704], popupText: \"The city that never sleeps, mostly because everyone's on their third ración of jamón.\" },]. List: " + citiesStr,
        });
        console.log("Request: " + "Check this list for real city names and return a json containing an array of objects on this model: [{ city: \"Madrid\", position: [40.417, -3.704], popupText: \"The city that never sleeps, mostly because everyone's on their third ración of jamón.\" },]. List: " + citiesStr)
        console.log(response.text);

        if (response?.text) {
          const citiesFromResponse: MarkerInfo[] = extractJsonArray(response.text);
          console.log(citiesFromResponse);
          setFormattedCities(citiesFromResponse);
        }

      } catch (error) {
        console.log("Error: " + error);

      }
    }

    queryCityNames();

  }, [extractedCityNames]);


  useEffect(() => {
    console.log("formattedCities length: ", formattedCities.length)
  }, [formattedCities]);


  const extractCityNamesFromMessages = (msgs: Message[]): string[] => {
    const cities: string[] = [];

    // A simple regex to match potential city names
    const cityRegex = /\b[A-Z][a-z]+(?: [A-Z][a-z]+)*\b/g;

    msgs.forEach(msg => {
      const matches = msg.text.match(cityRegex);
      if (matches) {
        matches.forEach(match => {
          if (!COMMON_WORDS.includes(match)) {
            cities.push(match);
          }
        });
      }
    });

    return [...new Set(cities)]; // Remove duplicates
  };


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
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, userMessage, aiMessage];
        // Extract city names after updating messages
        const cities = extractCityNamesFromMessages(updatedMessages);
        console.log(cities);
        setExtractedCityNames(cities);
        return updatedMessages;
      });

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

      {formattedCities && formattedCities.length > 0 &&
        <TravelMap cities={formattedCities} />
      }

      <form className="flex p-2 justify-end" onSubmit={handleSendMessage}>
        <SendInput message={newMessage} setNewMessage={setNewMessage} />
        <SendButton />
      </form>

    </div>
  );
};

export default ChatContainer;
