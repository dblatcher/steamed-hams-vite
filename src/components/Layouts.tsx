import { Box, Container } from "@mui/material";
import { ContextualGameRoom, GameDataContext, StoryBoardPlayer, UiStateContext } from "point-click-components";
import type { GameData } from "point-click-lib";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
            dispatchUi({ type: 'SET_SCREEN_SIZE', width: containerWidth - 60 })
        }
    }, [dispatchUi, boxRef.current])

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    return <Container maxWidth='md'>
        <OptionsMenu />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 1 }} ref={boxRef}>
            <Box>
                {ui === 'story-board' && storyBoard ? (
                    <StoryBoardPlayer storyBoard={storyBoard} />
                ) : (
                    <ContextualGameRoom />
                )}
            </Box>

            <Box>
                {ui === 'verbs' && <ActionButtons />}
            </Box>
        </Box>

        {ui === 'verbs' && <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CommandLine />
            <InventoryTargets />
        </Box>}
        {ui === 'conversation' && (
            <ConversationMenu />
        )}
    </Container>
}
