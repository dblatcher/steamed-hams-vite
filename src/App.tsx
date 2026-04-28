import { useState, type ReactNode } from 'react';
import { Game } from './components/Game';
import { LoadingScreen } from './components/LoadingScreen';
import { Container } from '@mui/material';


const Frame = ({ children }: { children: ReactNode }) => (
  <Container component={'main'}
    maxWidth='md'
    sx={{
      paddingY: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'absolute',
      inset: 0
    }}
  >{children}</Container>
)

function App() {
  const [started, setStarted] = useState(false);
  const [showGameEndMessage, setShowGameEndMessage] = useState(false);

  const returnToTitle = (reason: "game-end" | "restart") => {
    if (reason === 'game-end') {
      setShowGameEndMessage(true)
    }
    setStarted(false)
  }

  return <Frame>
    {started
      ? <Game logDebugMessages={false} returnToTitle={returnToTitle} />
      : <LoadingScreen start={() => setStarted(true)} showGameEndMessage={showGameEndMessage} />}
  </Frame>


}

export default App
