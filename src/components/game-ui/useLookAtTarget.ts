import { GameDataContext } from "point-click-components"
import type { CommandTarget } from "point-click-lib"
import { useCallback, useContext } from "react"
import type { MouseEvent } from "react"


export const useLookAtTarget = () => {
    const { gameDesign, dispatch } = useContext(GameDataContext)
    const lookAtTarget = useCallback((target: CommandTarget, event: MouseEvent) => {
        event.preventDefault()
        const lookVerb = gameDesign.verbs.find(verb => verb.isLookVerb)
        if (lookVerb) {
            dispatch({
                type: 'SEND-COMMAND', command: {
                    target,
                    verb: lookVerb
                }
            })
        }
    }, [gameDesign, dispatch])
    return lookAtTarget
}