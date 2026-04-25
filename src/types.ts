export type FileAsset = {
    id: string;
    href: string;
    originalFileName?: string;
    category?: string;
}


export type ImageAssetCategory = 'background' | 'item' | 'spriteSheet' | 'any'
export type ImageAsset = FileAsset & {
    category: ImageAssetCategory;
    rows?: number;
    cols?: number;
    widthScale?: number;
    heightScale?: number;
    img?: HTMLImageElement;
}
export type GetImageAsset = { (id: string): ImageAsset | undefined }


export type SoundAssetCategory = 'sfx' | 'music'
export type SoundAsset = FileAsset & {
    category: SoundAssetCategory;
}
export type GetSoundAsset = { (id: string): SoundAsset | undefined }