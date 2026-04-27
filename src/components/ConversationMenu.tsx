import { Box, Button, Typography } from "@mui/material";
import { GameDataContext } from "point-click-components";
import { useContext } from "react";


export const ConversationMenu = () => {
    const { dispatch, gameState } = useContext(GameDataContext)
    const { conversations, currentConversationId } = gameState;
    const currentConversation = conversations.find(c => c.id === currentConversationId);
    const currentBranch = currentConversation?.currentBranch ?? currentConversation?.defaultBranch ?? '';
    const branch = currentConversation && currentConversation.branches[currentBranch]


    if (!branch) {
        return <section>ERR</section>
    }

    return <Box component={'section'}>
        {branch.choices.filter(choice => !choice.disabled).map((choice, index) => (
            <Box key={index} >
                <Button sx={{
                    paddingY:.5,
                    width:'100%'
                }}
                    onClick={() => {
                        dispatch({ type: 'CONVERSATION-CHOICE', choice })
                    }}>
                    <Typography sx={{textTransform: 'none', fontSize:'small'}}>
                        {choice.text}
                    </Typography>
                </Button>
            </Box>
        ))}
    </Box>
}