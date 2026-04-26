import { Box, Container } from "@mui/material";
import { ContextualGameRoom, GameDataContext, StoryBoardPlayer } from "point-click-components";
import type { GameData } from "point-click-lib";
import { useContext } from "react";
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
    const ui = getUiCondition(gameState);

    const storyBoard = gameDesign.storyBoards.find(board => board.id === gameState.currentStoryBoardId)

    return <Container maxWidth='xl'>
        <OptionsMenu />
        <CommandLine />
        <Box sx={{ display: 'flex', justifyContent:'space-between' }}>
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
        {ui === 'verbs' && <InventoryTargets />}
        {ui === 'conversation' && (
            <ConversationMenu />
        )}
    </Container>
}
