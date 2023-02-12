import { Player } from '../Game';
import ChanceCard from './cards/ChanceCard';

type Props = {
    localPlayer: Player;
    luckCards: {
        show: boolean,
        type: string,
        number: number,
    };
    useChance: () => void
}

const ChancePrompt = ( {localPlayer, luckCards, useChance}: Props ) => {
    return (
        <>
            <div className="underlay"/>  
            <div className="prompt" >
                <div className="prompt-menu" >
                    <ChanceCard localPlayer={localPlayer} luckCards={luckCards} />
                    <p className='text-plain' >
                        Your Money: 
                        <span className='money'> £{localPlayer.money}</span>
                    </p>
                    <div className="btn-group">
                        <button className='buy-btn' onClick={useChance}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChancePrompt;
