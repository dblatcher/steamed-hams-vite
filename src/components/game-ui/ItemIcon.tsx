import type { ItemData } from "point-click-lib"
import { ImageBlock } from "./ImageBlock"

export const ItemIIcon = ({ item, disabled }: { item: ItemData, disabled?: boolean }) => {

    return (<>
        {item.imageId ? (
            <ImageBlock frame={{
                imageId: item.imageId,
                col: item.col,
                row: item.row
            }} filter={disabled ? 'opacity(0.5)' : undefined} />
        ) : item.name ?? item.id}
    </>
    )
}