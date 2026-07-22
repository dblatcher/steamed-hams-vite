import _imageAssets from './game-data/imageAssets.json'
import _soundAssets from './game-data/soundAssets.json'
import _gameDesign from './game-data/game.json'
import type { FileAsset, GetImageAsset, GetSoundAsset, ImageAsset, SoundAsset } from 'point-click-components'
import { GameDesignSchema } from 'point-click-lib';


export const imageAssets = (_imageAssets as ImageAsset[]).map(asset => ({ ...asset, href: `images/${asset.id}` }));
export const soundAssets = (_soundAssets as SoundAsset[]).map(asset => ({ ...asset, href: `sounds/${asset.id}` }));
export const gameDesign = GameDesignSchema.parse(_gameDesign);


export const getSoundAsset: GetSoundAsset = (id: string) => {
    const asset = soundAssets.find(asset => asset.id === id)
    if (!asset) {
        return undefined
    }
    return asset
};

export const getImageAsset: GetImageAsset = (id: string): ImageAsset | undefined => {
    const asset = imageAssets.find(asset => asset.id === id);
    if (!asset) {
        return undefined
    }
    return asset
}

const loadedAssetUrls = new Map<string, string | undefined>()

export const loadAssetAndSetObjectUrl = async (asset: FileAsset): Promise<string | undefined> => {
    if (asset.href.startsWith("blob")) {
        return asset.href
    }

    if (loadedAssetUrls.has(asset.href)) {
        return loadedAssetUrls.get(asset.href)
    }
    loadedAssetUrls.set(asset.href, undefined)
    try {
        const response = await fetch(asset.href)
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob);
        loadedAssetUrls.set(asset.href, objectUrl)
        asset.href = objectUrl
        return (objectUrl)
    } catch (err) {
        console.error('failed to load asset', asset, err)
        loadedAssetUrls.delete(asset.href)
        throw err
    }
};
