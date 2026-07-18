import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from "@mui/material"
import { GameDataContext, UiStateContext } from "point-click-components"
import { useContext, useState } from "react"


export const OptionsMenu = () => {

    const [isOpen, setIsOpen] = useState(false)
    const { dispatch, gameState } = useContext(GameDataContext)
    const { dispatchUi, uiState } = useContext(UiStateContext)

    const closeAndResume = () => {
        setIsOpen(false)
        dispatch({ type: 'SET-PAUSED', isPaused: false })
    }

    return <>
        <Button color="secondary"
            sx={{ borderRadius: '50%', padding: .5, width: 40, height: 40, boxSizing: 'border-box', minWidth: 40, fontSize: 'large' }}
            onClick={() => {
                dispatchUi({ type: 'SET_HIGHLIGHT', on: !uiState.highlightOn })
            }} variant="contained" title="highlight">🖍️</Button>

        <Button
            sx={{ borderRadius: '50%', padding: .5, width: 40, height: 40, boxSizing: 'border-box', minWidth: 40, fontSize: 'large' }}
            onClick={() => {
                setIsOpen(true)
                dispatch({ type: 'SET-PAUSED', isPaused: true })
            }} variant="contained" title="options">⚙️</Button>

        <Dialog open={isOpen} onClose={closeAndResume}>
            <DialogTitle>Options</DialogTitle>
            <DialogContent >
                <FormControlLabel control={<Checkbox checked={!!gameState.isSoundDisabled}
                    onChange={({ target: { checked } }) =>
                        dispatch({ type: 'SET-SOUND-DISABLED', isSoundDisabled: checked })
                    } />} label="sound off" />
                <Button color={'warning'} variant="contained" onClick={() => dispatch({ type: 'RESET', reason: 'restart' })}>quit game</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAndResume}>ok</Button>
            </DialogActions>
        </Dialog>
    </>
}