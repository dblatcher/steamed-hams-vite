import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import { links } from "../constants";
import { AssetPreloader } from "./AssetPreloader";
import { BlueskyButton } from "./BlueskyButton";
import { GameCompleteMessage } from "./GameCompleteMessage";
import { frameStyle, row, rowJustify } from "./styles";
import { TitleHeader } from "./TitleHeader";

interface Props {
    start: { (): void }
    showGameEndMessage: boolean
    dismissGameEndMessage: { (): void }
}

export const LoadingScreen = ({ start, showGameEndMessage, dismissGameEndMessage }: Props) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    return <Box component={Card} sx={frameStyle}>
        <TitleHeader />
        <Box sx={row}>
            <Typography variant="subtitle1">Steamed Hams, but it's a point and click adventure game</Typography>
        </Box>
        <Box component={'section'} >
            <Box sx={row}>
                <Button onClick={start} disabled={!assetsLoaded} variant="contained">start</Button>

            </Box>
            <Box sx={row}>
                <AssetPreloader reportReady={() => setAssetsLoaded(true)} />
            </Box>
        </Box>
        <Box sx={row}>
            <Typography>This game was build using <a target="_blank" href={links.POINT_AND_CLICK}>Point And Click</a>, a free web-based adventure game editor.</Typography>
        </Box>

        <Box sx={rowJustify}>
            <BlueskyButton label="share on bluesky" postText="play this" />
        </Box>

        <GameCompleteMessage
            dismissGameEndMessage={dismissGameEndMessage}
            showGameEndMessage={showGameEndMessage} />
    </Box>
}
