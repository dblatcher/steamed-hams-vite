import { Box, Button } from "@mui/material"
import { GameDataContext, UiStateContext } from "point-click-components"
import type { ItemData, Verb } from "point-click-lib"
import { useContext } from "react"
import { ItemIIcon } from "./ItemIcon"



const ItemTargetButton = ({ item, currentVerb }: { item: ItemData, currentVerb?: Verb }) => {

    const { dispatch } = useContext(GameDataContext)
    const { uiState, dispatchUi } = useContext(UiStateContext)
    const { itemId: currentItemId, verbId } = uiState
    const disabled = item.id === currentItemId || currentVerb?.isNotForItems;

    return <Button
        sx={{ minHeight: 50, minWidth: 50, padding: .5 }}
        onPointerEnter={() => {
            dispatchUi({ type: 'SET_HOVER_TARGET', hoverTarget: item })
        }}
        onPointerLeave={() => {
            if (uiState.hoverTarget?.type === 'item' && uiState.hoverTarget.id === item.id) {
                dispatchUi({ type: 'SET_HOVER_TARGET' })
            }
        }}
        disabled={disabled}
        variant={'contained'}
        onClick={() => {
            dispatch({ type: 'TARGET-CLICK', target: item, verbId, itemId: currentItemId })
        }}>
        <ItemIIcon item={item} disabled={disabled} />
    </Button>

}


export const InventoryTargets = () => {
    const { gameState, gameDesign } = useContext(GameDataContext)
    const { uiState } = useContext(UiStateContext)
    const { verbs } = gameDesign
    const { items, actors } = gameState
    const { verbId } = uiState

    const player = actors.find(a => a.isPlayer)
    const currentVerb = verbs.find(verb => verb.id === verbId)


    return (
        <Box sx={{ gap: 1, display: 'flex' }}>
            {items.filter(item => item.actorId === player?.id).map((item) => (
                <ItemTargetButton key={item.id} item={item} currentVerb={currentVerb} />
            ))}
        </Box>
    )
}
