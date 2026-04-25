import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { gameDesign, getImageAsset } from '../assets';

export const GameIcon = (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    const { thumbnailAssetId } = gameDesign;
    const asset = thumbnailAssetId ? getImageAsset(thumbnailAssetId) : undefined;
    const alt = asset ? `icon: ${asset.id}` : "icon: [MISSING]";
    return <img alt={alt} {...props} src={asset?.href}  />
}