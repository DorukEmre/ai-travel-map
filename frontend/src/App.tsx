import './App.css'
import Header from '@/components/Header';
import ChatContainer from '@/components/ChatContainer'
import { useState } from 'react';

function App() {

  const [restartKey, setRestartKey] = useState<number>(0);

  // Handler to increment restartKey, triggering chat reset
  const handleRestartChat = () => {
    setRestartKey(prevKey => prevKey + 1);
  };

  return (
    <main className="m-auto max-w-3xl p-4 min-h-screen">
      <Header onRestartKey={handleRestartChat} />

      <ChatContainer restartKey={restartKey} />

    </main>
  )
}

export default App
