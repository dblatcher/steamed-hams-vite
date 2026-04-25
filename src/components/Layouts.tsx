import { GameDataContext, TemplateLayout, UiStateContext } from "point-click-components"
import { useContext } from "react";


function CommandLine() {
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
        <div >
            <span>{text}</span>
            {hoverText && (
                <span style={{ color: 'red' }}>{' '}{hoverText}</span>
            )}
        </div>
    )
}


const VerbRadioButton = () => {
    const { gameDesign } = useContext(GameDataContext)
    const { uiState, dispatchUi } = useContext(UiStateContext)
    const { verbId } = uiState

    return <div >
        {gameDesign.verbs.map((verb) => (
            <label key={verb.id} >
                {verb.label ?? verb.id}
                <input type="radio" name="verb"
                    checked={verbId === verb.id}
                    onChange={({ target: { checked } }) => {
                        if (checked) {
                            dispatchUi({ type: 'SET_VERB', verbId: verb.id })
                            if (!verb.preposition) {
                                dispatchUi({ type: 'SET_ITEM' })
                            }
                        }
                    }} />
            </label>
        ))}
    </div>

}


const Controls = () => {

    const { gameState, gameDesign, dispatch } = useContext(GameDataContext)
    const { uiState, dispatchUi } = useContext(UiStateContext)

    const { verbs } = gameDesign
    const { items, actors } = gameState
    const { itemId: currentItemId, verbId } = uiState

    const player = actors.find(a => a.isPlayer)
    const currentVerb = verbs.find(verb => verb.id === verbId)

    return (<>
        <CommandLine />
        <VerbRadioButton />
        <div>
            {items.filter(item => item.actorId === player?.id).map((item) => (
                <button onClick={() => {
                    if (!currentItemId && currentVerb?.preposition) {
                        return dispatchUi({ type: 'SET_ITEM', itemId: item.id })
                    }
                    if (item.id === currentItemId) {
                        return dispatchUi({ type: 'SET_ITEM', itemId: undefined })
                    }
                    dispatchUi({ type: 'SET_ITEM', itemId: undefined })
                    dispatch({ type: 'TARGET-CLICK', target: item, verbId, itemId: currentItemId })
                }}>
                    {item.name ?? item.id}
                </button>
            ))}
        </div>
    </>
    )
}

export const Layout = () => {


    return (
        <TemplateLayout
            className="foo"
            MainControlsComponent={Controls}
        />
    )
}