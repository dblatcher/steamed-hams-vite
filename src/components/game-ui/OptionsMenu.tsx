import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material"
import { GameDataContext } from "point-click-components"
import { useContext, useState } from "react"


export const OptionsMenu = () => {

    const [isOpen, setIsOpen] = useState(false)
    const { dispatch, gameState } = useContext(GameDataContext)

    return <>

        <Button
            sx={{ borderRadius: '50%', padding: .5, width: 40, height: 40, boxSizing: 'border-box', minWidth: 40, fontSize:'large' }}
            onClick={() => {
                setIsOpen(true)
                dispatch({ type: 'SET-PAUSED', isPaused: true })
            }} variant="contained" title="options">⚙️</Button>

        <Dialog open={isOpen} onClose={() => {
            setIsOpen(false)
            dispatch({ type: 'SET-PAUSED', isPaused: false })
        }}>
            <DialogTitle>Options</DialogTitle>

            <DialogContent >

                <label >
                    <input type="checkbox"
                        checked={!!gameState.isSoundDisabled}
                        onChange={({ target: { checked } }) =>
                            dispatch({ type: 'SET-SOUND-DISABLED', isSoundDisabled: checked })
                        } />
                    sound off
                </label>
                <button onClick={() => dispatch({ type: 'RESET', reason: 'restart' })}>reset</button>
            </DialogContent>
        </Dialog>
    </>
}