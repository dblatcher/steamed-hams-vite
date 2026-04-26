import { ButtonGroup, Button, Typography } from "@mui/material"
import { GameDataContext, UiStateContext } from "point-click-components"
import { useContext } from "react"
import { ItemIIcon } from "./ItemIcon"

const VerbIcon = ({ verbId }: { verbId: string }) => {

    switch (verbId) {
        case 'USE':
            return "🤏"
        case 'WALK':
            return "🚶‍➡️"
        case 'LOOK':
            return "👀"
        case 'TALK':
            return "💬"
        default:
            return "?"
    }
}


export const ActionButtons = () => {
    const { gameDesign, gameState } = useContext(GameDataContext)
    const { uiState, dispatchUi } = useContext(UiStateContext)
    const { verbId, itemId } = uiState
    const { items, actors, } = gameState
    const player = actors.find(a => a.isPlayer)


    return <ButtonGroup orientation="vertical" >
        {gameDesign.verbs.map((verb) => (
            <Button key={verb.id}
                sx={{ minHeight: 50, minWidth: 50, padding: .5, height: 50 }}
                title={verb.label ?? verb.id}
                variant={(verbId === verb.id && !itemId) ? 'contained' : 'outlined'} onClick={() => {
                    dispatchUi({ type: 'SET_ITEM' })
                    dispatchUi({ type: 'SET_VERB', verbId: verb.id })
                }}>
                <Typography sx={{ fontSize: '40px' }}>
                    <VerbIcon verbId={verb.id} />
                </Typography>
            </Button>
        ))}

        {items.filter(item => item.actorId === player?.id).map((item) => (
            <Button
                title={`use ${item.name ?? item.id}`}
                sx={{ minHeight: 50, minWidth: 50, padding: .5, height: 50 }}
                variant={item.id === itemId ? 'contained' : 'outlined'}
                onClick={() => {
                    dispatchUi({ type: 'SET_ITEM', itemId: item.id })
                    dispatchUi({ type: 'SET_VERB', verbId: 'USE' })
                }}>
                <ItemIIcon item={item} />
            </Button>
        ))}

    </ButtonGroup>

}
