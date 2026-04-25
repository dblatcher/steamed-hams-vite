import { useState } from 'react';
import './App.css';
import { Game } from './components/Game';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [started, setStarted] = useState(false);
  const [showGameEndMessage, setShowGameEndMessage] = useState(false);
  if (!started) {
    return <LoadingScreen start={() => setStarted(true)} showGameEndMessage={showGameEndMessage} />
  }
  return (
    <Game logDebugMessages={false} returnToTitle={(reason: "game-end" | "restart") => {
      if (reason === 'game-end') {
        setShowGameEndMessage(true)
      }
      setStarted(false)
    }} />
  )
}

export default App
