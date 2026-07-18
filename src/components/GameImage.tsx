import { ImageBlock } from "point-click-components"
import { getImageAsset } from "../assets"
import { Box, type BoxProps } from "@mui/material"

interface Props {
    imageId: string,
    col?: number,
    row?: number,
    height?: number,
    boxProps?: BoxProps
}

export const GameImageBox = ({ imageId, col, row, height = 100, boxProps }: Props) => {

    return <Box {...boxProps} style={{ ...boxProps?.style, height }}>
        <ImageBlock frame={{ imageId, col, row }} fitHeight getImageAsset={getImageAsset} />
    </Box>
}