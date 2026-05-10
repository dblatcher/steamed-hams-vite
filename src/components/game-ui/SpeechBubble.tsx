import type { FunctionComponent } from "react"
import type { SpeechBubbleProps } from "point-click-components"
import Styled from "@emotion/styled"


const background = {
    backdropFilter: 'saturate(50%)',
    backgroundColor: 'rgba(0,255,255,.75)',
}

const Frame = Styled.span({
    ...background,
    border: `.1em solid black`,
    borderRadius: '1em',
    padding: '.2em 1em',
    fontFamily: '"Comic Sans", cursive, sans-serif',
})

const Tail = Styled.div({
    backgroundColor: 'black',
    position: 'absolute',
    bottom: -6,
    width: 6,
    height: 6,
    clipPath: `polygon(0 0, 100% 0, 50% 100%, 0 0)`
})

const Container = Styled.div({
    display: 'flex',
    position: 'relative'
})

export const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({
    actorData,
    text,
    fontSize,
    fromTextBoxLeftToActor,
    atLeftEdge,
    atRightEdge,
}) => {
    return <Container
        style={{
            fontSize,
            justifyContent: atRightEdge ? 'right' : atLeftEdge ? 'left' : 'center'
        }}
    >
        <Frame
            style={{
                color: actorData.dialogueColor || '#000000',
            }}>{text}</Frame>

        <Tail
            style={{
                left: fromTextBoxLeftToActor - 5,
            }}
        />
    </Container>
}
