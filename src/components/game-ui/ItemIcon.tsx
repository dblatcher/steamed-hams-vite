import type { ItemData } from "point-click-lib"
import { ImageBlock } from "point-click-components"
import { getImageAsset } from "../../assets"

export const ItemIIcon = ({ item, disabled }: { item: ItemData, disabled?: boolean }) => {

    return (<>
        {item.imageId ? (
            <ImageBlock
                getImageAsset={getImageAsset}
                frame={{
                    imageId: item.imageId,
                    col: item.col,
                    row: item.row
                }} filter={disabled ? 'opacity(0.5)' : undefined} />
        ) : item.name ?? item.id}
    </>
    )
}