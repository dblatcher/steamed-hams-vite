import { Typography } from "@mui/material";
import { GameDataContext, UiStateContext } from "point-click-components";
import { useContext } from "react";


export function CommandLine() {
    const { gameDesign } = useContext(GameDataContext)
    const { uiState } = useContext(UiStateContext)
    const { itemId, hoverTarget, verbId } = uiState
    const verb = gameDesign.verbs.find(verb => verb.id === verbId)
    const item = gameDesign.items.find(item => item.id === itemId)

    let text = '>'
    if (verb) {
        text = `${verb.label}`;
        if (item) {
            text += ` ${item.name || item.id} ${verb.preposition}`
        }
    }
    const hoverText = hoverTarget ? hoverTarget.name || hoverTarget.id : '...';

    return (
        <Typography >
            <span>{text}</span>
            {hoverText && (
                <span style={{ color: 'red' }}>{' '}{hoverText}</span>
            )}
        </Typography>
    )
}
