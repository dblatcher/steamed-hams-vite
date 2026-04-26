import { GameDataContext } from "point-click-components"
import type { AspectRatio, StaticFrameParamsS } from "point-click-lib"
import { useContext, type CSSProperties } from "react"
import type { ImageAsset } from "../../types"


const getAspectRatioStyle = (aspectRatio?: AspectRatio, fitHeight = false) => {
    return !aspectRatio ? {
        height: '100%',
        width: '100%',
        margin: 0,
    } : fitHeight ? {
        height: '100%',
        width: 'auto',
        aspectRatio: `${aspectRatio.x}/${aspectRatio.y}`,
        margin: 0,
    } : {
        height: 'auto',
        width: '100%',
        aspectRatio: `${aspectRatio.x}/${aspectRatio.y}`,
        margin: 0,
    }
}

 const getBackgroundStyle = (imageAsset: ImageAsset, col = 0, row = 0, filter?: string): CSSProperties => {
    const { href, rows, cols } = imageAsset

    if (typeof cols === 'undefined' && typeof rows === 'undefined') {
        return {
            backgroundImage: `url(${href})`,
            width: '100%',
            height: '100%',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            filter,
        }
    }

    return {
        backgroundImage: `url(${href})`,
        backgroundPositionX: `${-100 * col}%`,
        backgroundPositionY: `${-100 * row}%`,
        backgroundSize: `${100 * (cols || 1)}% ${100 * (rows || 1)}%`,
        width: '100%',
        height: '100%',
        filter,
    }
}

export const ImageBlock: React.FunctionComponent<{
    frame: StaticFrameParamsS,
    aspectRatio?: AspectRatio,
    filter?: string,
    fitHeight?: boolean,
}> = ({ frame, aspectRatio, filter, fitHeight }) => {
    const { getImageAsset } = useContext(GameDataContext)
    const asset = getImageAsset(frame.imageId)
    if (!asset) {
        return null
    }

    return <figure role="img" style={getAspectRatioStyle(aspectRatio, fitHeight)}>
        <div style={{
            ...getBackgroundStyle(asset, frame.col, frame.row, filter),
        }}>
        </div>
    </figure>

}