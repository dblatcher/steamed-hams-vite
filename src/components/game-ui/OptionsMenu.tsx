import { GameDataContext } from "point-click-components"
import { useContext } from "react"


export const OptionsMenu = () => {

    const { dispatch, gameState } = useContext(GameDataContext)

    return <div >
        <label >
            <input type="checkbox"
                checked={!!gameState.isPaused}
                onChange={({ target: { checked } }) =>
                    dispatch({ type: 'SET-PAUSED', isPaused: checked })
                } />
            paused
        </label>
        <label >
            <input type="checkbox"
                checked={!!gameState.isSoundDisabled}
                onChange={({ target: { checked } }) =>
                    dispatch({ type: 'SET-SOUND-DISABLED', isSoundDisabled: checked })
                } />
            sound off
        </label>
        <button onClick={() => dispatch({ type: 'RESET', reason: 'restart' })}>reset</button>
    </div>
}