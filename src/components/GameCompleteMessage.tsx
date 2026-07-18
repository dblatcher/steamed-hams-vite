import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { links } from "../constants"

interface Props {
    showGameEndMessage: boolean
    dismissGameEndMessage: { (): void }
}


export const GameCompleteMessage = ({ showGameEndMessage, dismissGameEndMessage }: Props) => {

    return <Dialog open={showGameEndMessage} onClose={dismissGameEndMessage}>
        <DialogTitle>Game Complete</DialogTitle>
        <DialogContent>
            <DialogContentText> Well done, you finished the game.</DialogContentText>
            <DialogContentText>Why not make your own on <a target="_blank" href={links.POINT_AND_CLICK}>Point And Click</a>?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={dismissGameEndMessage}>done</Button>
        </DialogActions>
    </Dialog>
}