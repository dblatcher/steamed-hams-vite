import { Box, Button, Typography } from "@mui/material";
import { GameDataContext, useConversationBranch } from "point-click-components";
import { useContext } from "react";


export const ConversationMenu = () => {
    const { dispatch } = useContext(GameDataContext)
    const branch = useConversationBranch()

    if (!branch) {
        return null
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