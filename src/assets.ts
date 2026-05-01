import _imageAssets from './game-data/imageAssets.json'
import _soundAssets from './game-data/soundAssets.json'
import _gameDesign from './game-data/game.json'
import type { ImageAsset, SoundAsset } from './types'
import { GameDesignSchema } from 'point-click-lib';


export const imageAssets = (_imageAssets as ImageAsset[]).map(asset => ({ ...asset, href: `images/${asset.id}` }));
export const soundAssets = (_soundAssets as SoundAsset[]).map(asset => ({ ...asset, href: `sounds/${asset.id}` }));
export const gameDesign = GameDesignSchema.parse(_gameDesign);


export const getSoundAsset = (id: string) => {
    const asset = soundAssets.find(asset => asset.id === id)
    if (!asset) {
        return undefined
    }
    return asset
};

export const getImageAsset = (id: string): ImageAsset | undefined => {
    const asset = imageAssets.find(asset => asset.id === id);
    if (!asset) {
        return undefined
    }
    return asset
}

export const loadImage = async (asset: ImageAsset): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        if (asset.img) {
            console.warn('asset already loaded', asset)
            return resolve(asset.img);
        }
        const image = new Image();
        image.src = asset.href;
        image.addEventListener('load', () => resolve(image), { once: true });
        image.addEventListener('error', (event) => reject(event), { once: true });
    });
};

export const loadSound = async (asset: SoundAsset): Promise<HTMLAudioElement> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = asset.href
        audio.addEventListener('canplay', () => resolve(audio), { once: true });
        audio.addEventListener('error', (event) => reject(event), { once: true });
    });
};
