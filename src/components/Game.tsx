import { GameRunner } from 'point-click-components';
import { gameDesign, getImageAsset, getSoundAsset } from '../assets';
import { Layout } from './Layouts';
import { SpeechBubble } from './game-ui/SpeechBubble';

interface Props {
    logDebugMessages?: boolean;
    returnToTitle: { (reason: "game-end" | "restart"): void }
}

export const Game = ({ logDebugMessages, returnToTitle }: Props) => {
    return (
        <GameRunner
            Layout={Layout}
            SpeechBubbleComponent={SpeechBubble}
            gameDesign={gameDesign}
            getImageAsset={getImageAsset}
            getSoundAsset={getSoundAsset}
            initialRoomSize={{
                roomWidth: 500,
                roomHeight: 500,
            }}
            options={{
                eventReporter: {
                    reportReset(reason) {
                        returnToTitle(reason)
                    },
                },
                debugLogger: (message, subject) => {
                    if (logDebugMessages) {
                        console.log(message, subject)
                    }
                },
                allowLocalSaves: true
            }}
        />
    )
}

