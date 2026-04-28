import { useState } from "react";
import { AssetPreloader } from "./AssetPreloader";
import { GameIcon } from "./GameIcon";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import { row } from "./styles";

interface Props {
    start: { (): void }
    showGameEndMessage: boolean
}

export const LoadingScreen = ({ start, showGameEndMessage }: Props) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    return <Box component={Card} sx={{ padding: 1 }}>
        <Box component={'header'} >
            <Box sx={row}>
                <GameIcon height={100} />
                <Typography variant="h1">Steamed Hams</Typography>
            </Box>
            <Box sx={row}>
                <Typography>but it's a point and click adventure game</Typography>
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
            <Typography>This game was build using <a target="_blank" href="http://point-and-click-seven.vercel.app/">Point And Click</a>, a free web-based adventure game editor.</Typography>
        </Box>
        {showGameEndMessage && (
            <section>
                <p>
                    <strong>Well done, you finished the game.</strong>
                </p>
            </section>
        )}
    </Box>
}
