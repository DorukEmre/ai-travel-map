import type { MarkerInfo, Message } from "@/types/types";
import { GoogleGenAI } from "@google/genai";


const INITIAL_MESSAGES = [
  { text: "Hello, where would you like to travel?", byUser: false },
];

const initialiseAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("API key is required to initialise GoogleGenAI.");
  }

  return new GoogleGenAI({ apiKey });
};

const createChatSession = (ai: GoogleGenAI) => {

  return ai.chats.create({
    model: "gemini-2.0-flash-lite",
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      systemInstruction: "Be concise and to the point in your answers. Help the user identify relevant travel destinations and suggest potential travel locations. If the user deviates from the topic, say: \"I can't answer that, where would you like to travel?\"",
    },
    history: [
      {
        role: "model",
        parts: [{ text: "Hello, where would you like to travel?" }],
      },
    ],
  });
};


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

const queryCityNames = async (messages: Message[], ai: GoogleGenAI) => {
  if (!messages || messages.length == 0)
    return;

  const messagesStr = JSON.stringify(messages);
  console.log('messages: ', messagesStr);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
    contents: "Check this conversation for recommended city names or cities suggested by the user. Return a json containing an array of objects, without duplicate cities, based on this model: [{ city: \"Madrid\", position: [40.417, -3.704], popupText: \"The city that never sleeps, mostly because everyone's on their third ración of jamón.\" },]. Conversation: " + messagesStr,
  });

  console.log(response.text);

  if (response?.text) {
    const citiesFromResponse: MarkerInfo[] = extractJsonArray(response.text);
    console.log(citiesFromResponse);
    return citiesFromResponse;
  }

  return [];
}


export { INITIAL_MESSAGES, initialiseAI, createChatSession, queryCityNames };