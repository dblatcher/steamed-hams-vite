import { Box } from "@mui/material"
import { GameImageBox } from "./GameImage"
import { colors } from "../constants"


export const TitleHeader = () => {

    return <Box component={'header'} sx={{ position: 'relative', maxWidth: 500, margin: '0 auto', minHeight: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <GameImageBox imageId="title-skinner.png" boxProps={{ sx: { minWidth: 100, position: 'absolute', left: 0, top: 0 } }} />
        <GameImageBox imageId="title-chalmers.png" boxProps={{ sx: { minWidth: 100, position: 'absolute', bottom: 0, right: 0 } }} />

        <div style={{
            fontFamily: 'cursive',
            color: colors.text,
            fontSize: 30,
            lineHeight: 1,
            transformOrigin: 'bottom',
            transform: "scale(1.5) rotate(-25deg)"
        }}>
            <div style={{ paddingLeft: "4rem" }}>Skinner</div>
            <div style={{ paddingLeft: "6rem", fontSize: 20, }}>& the</div>
            <div>Superintendent</div>
        </div>
    </Box>

}