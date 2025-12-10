# AI Travel Recommendations App

React/Typescript app to help users find travel destinations based on their input. Users can enter a location or preferences in natural text, and the AI will suggest relevant travel spots. An interactive map displays these suggestions, allowing for easy exploration of potential destinations.

## Components

- Header: Top section containing the app title and restart button

- ChatContainer: Overall layout for the chat UI

- Input Area:
  - SendInput: Text input for typing messages
  - SendButton: Button to send the message

- Message Display:
  - MessageList: Contains multiple MessageBubble components, one for each message

- Map:
  - TravelMap: Map with custom markers for each city of interest

## AI interaction

Connection to Gemini API:
  - Create a chat session with the AI to identify potential travel destinations
    - ai.chats.create
    - chat.sendMessage
  - Query the AI to get an array of unique city names with geographical coordinates based on the conversation history
    - ai.models.generateContent

## Installation

Build and run the Docker containers using the provided Makefile.

### Environment Configuration

Create an .env file in the root directory of your project and provide Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development mode

```
make dev
```

Starts a Vite server, serving the app at http://localhost:5173/ and allowing for live modifications.

### Production mode

```
make prod
```

Builds a static React app and starts an Nginx server, serving the app at http://localhost:8080/
