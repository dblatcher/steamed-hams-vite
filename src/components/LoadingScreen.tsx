import { useState } from "react";
import { AssetPreloader } from "./AssetPreloader";
import { GameIcon } from "./GameIcon";

interface Props {
    start: { (): void }
    showGameEndMessage: boolean
}


export const LoadingScreen = ({ start, showGameEndMessage }: Props) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    return <div className="frame loading-screen">
        <main>
            <header>
                <GameIcon height={70}/>
                <h1>Your game name here</h1>
            </header>
            <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <p>This is the loading screen to display while the assets for you game are being fetched.</p>
                    <p>You can add any content here.</p>
                </div>
                <div>
                    {assetsLoaded && (
                        <button onClick={start}>start</button>
                    )}
                </div>
            </section>
            <section>
                <p>This game was build using Point And Click, a free web-based adventure game editor.</p>
            </section>
            {showGameEndMessage && (
                <section>
                    <p>
                        <strong>Well done, you finished the game.</strong>
                    </p>
                </section>
            )}
            <footer>
                <AssetPreloader reportReady={() => setAssetsLoaded(true)} />
            </footer>
        </main>
    </div>
}
