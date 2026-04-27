import { Box, Card, Container } from "@mui/material";
import { ContextualGameRoom, GameDataContext, StoryBoardPlayer, UiStateContext } from "point-click-components";
import type { GameData } from "point-click-lib";
import { useCallback, useContext, useEffect, useRef } from "react";
import { ConversationMenu } from "./ConversationMenu";
import { ActionButtons } from "./game-ui/ActionButtons";
import { CommandLine } from "./game-ui/CommandLine";
import { InventoryTargets } from "./game-ui/InventoryTargets";
import { OptionsMenu } from "./game-ui/OptionsMenu";




export const getUiCondition = (gameState: GameData) => {
    return gameState.currentStoryBoardId
        ? 'story-board'
        : gameState.sequenceRunning
            ? 'sequence'
            : gameState.currentConversationId
                ? 'conversation'
                : 'verbs';
}

export const Layout = () => {

    const { gameState, gameDesign } = useContext(GameDataContext)
    const { dispatchUi } = useContext(UiStateContext)
    const ui = getUiCondition(gameState);
    const storyBoard = gameDesign.storyBoards.find(board => board.id === gameState.currentStoryBoardId)

    const boxRef = useRef<HTMLDivElement | null>(null)
    const handleResize = useCallback(() => {
        const containerWidth = boxRef.current?.offsetWidth;
        if (containerWidth) {
            dispatchUi({ type: 'SET_SCREEN_SIZE', width: containerWidth - 90, height: window.innerHeight - 120 })
        }
    }, [dispatchUi, boxRef.current])

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    return <Container component={'main'}
        maxWidth='md'
        sx={{ paddingY: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'absolute', inset: 0 }}
    >
        <Box component={Card} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, padding: 1, backgroundColor: 'secondary.light' }} ref={boxRef}>
            <Box>
                {ui === 'story-board' && storyBoard ? (
                    <StoryBoardPlayer storyBoard={storyBoard} />
                ) : (
                    <ContextualGameRoom />
                )}
                <Box sx={{ minHeight: 90 }}>
                    {ui === 'verbs' && <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 1, }}>
                        <CommandLine />
                        <InventoryTargets />
                    </Box>}
                    {ui === 'conversation' && (
                        <ConversationMenu />
                    )}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                {ui === 'verbs' && <ActionButtons />}
            </Box>
        </Box>

        <Box sx={{
            position: 'fixed',
            right: 0,
            top: 0,
            padding: 1
        }}>
            <OptionsMenu />
        </Box>
    </Container>
}
