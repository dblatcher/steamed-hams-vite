import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import { links } from "../constants";
import { AssetPreloader } from "./AssetPreloader";
import { BlueskyButton } from "./BlueskyButton";
import { GameCompleteMessage } from "./GameCompleteMessage";
import { GameIcon } from "./GameIcon";
import { GameImageBox } from "./GameImage";
import { row, rowJustify, rowLeft } from "./styles";

interface Props {
    start: { (): void }
    showGameEndMessage: boolean
    dismissGameEndMessage: { (): void }
}

export const LoadingScreen = ({ start, showGameEndMessage, dismissGameEndMessage }: Props) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    return <Box component={Card} sx={{ padding: 1 }}>
        <Box component={'header'} >
            <Box sx={rowLeft}>
                <GameIcon height={100} />
                <Box>
                    <Typography variant="h1">Steamed Hams</Typography>
                    <Typography>but it's a point and click adventure game</Typography>
                </Box>
            </Box>
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
            <GameImageBox imageId="title-chalmers.png" boxProps={{ sx: { flexBasis: 100 } }} />
        </Box>

        <GameCompleteMessage
            dismissGameEndMessage={dismissGameEndMessage}
            showGameEndMessage={showGameEndMessage} />
    </Box>
}
