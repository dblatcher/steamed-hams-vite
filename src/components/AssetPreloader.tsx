import { useEffect, useState } from "react";
import { imageAssets, loadImage, loadSound, soundAssets } from "../assets";


interface Props {
    reportReady: { (): void }
}

const useStringList = (initialList?: string[]): [string[], { (item: string): void }] => {
    const [list, setList] = useState<string[]>(initialList ?? []);
    const addItem = (item: string) =>
        setList(existingItems => Array.from(new Set([...existingItems, item])))
    return [list, addItem]
}

const AssetProgress = ({
    label,
    loaded,
    failed,
    expectedTotal,
}: {
    label: string;
    loaded: string[];
    failed: string[];
    expectedTotal: number;
}) => {

    return <section style={{ display: 'flex', gap: 10 }}>
        <label style={{ display: 'flex', gap: 4 }}>
            <span>{label}</span>
            <progress max={expectedTotal} value={loaded.length} >
                {loaded.length} / {expectedTotal}
            </progress>
            <span>{loaded.length} / {expectedTotal} </span>
        </label>
        {
            failed.length > 0 && (
                <details>
                    <summary style={{ color: 'red' }}>failed to load {failed.length} files:</summary>
                    <ol>
                        {failed.map((url, index) => <li key={index}>{url}</li>)}
                    </ol>
                </details>
            )
        }
    </section>
}

export const AssetPreloader = ({ reportReady }: Props) => {
    const [imagesLoaded, addLoadedImage] = useStringList();
    const [imagesFailed, addFailedImage] = useStringList();
    const [soundsLoaded, addLoadedSound] = useStringList();
    const [soundsFailed, addFailedSound] = useStringList();
    const isReady = (imagesLoaded.length + imagesFailed.length >= imageAssets.length) && (soundsLoaded.length + soundsFailed.length >= soundAssets.length);

    useEffect(() => {
        imageAssets.forEach(asset => {
            loadImage(asset)
                .then(image => {
                    asset.img = image;
                    addLoadedImage(asset.href)
                })
                .catch(error => {
                    console.error('image load fail', { asset, error })
                    addFailedImage(asset.href)
                })
        });

        soundAssets.forEach(asset => {
            loadSound(asset)
                .then(() => {
                    addLoadedSound(asset.href)
                })
                .catch(error => {
                    console.error('sound load fail', { asset, error })
                    addFailedSound(asset.href)
                })
        })
    }, [])

    useEffect(() => {
        if (isReady) { reportReady() }
    }, [isReady, reportReady])

    return <div>
        <AssetProgress label="loading images"
            loaded={imagesLoaded}
            failed={imagesFailed}
            expectedTotal={imageAssets.length} />
        <AssetProgress label="loading sounds"
            loaded={soundsLoaded}
            failed={soundsFailed}
            expectedTotal={soundAssets.length} />
    </div>
}
