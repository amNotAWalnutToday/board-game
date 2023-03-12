import React, { useState } from 'react';
import { Player, currency } from '../../Game';
import ChanceCard from '../cards/ChanceCard';

type Props = {
    localPlayer: Player;
    luckCards: {
        show: boolean,
        type: string,
        number: number,
    };
    useChance: () => void,
    useChest: () => void,
}

const ChancePrompt = ( {localPlayer, luckCards, useChance, useChest}: Props ) => {
    const [flipped, setFlipped] = useState<string>('no-flip');

    return (
        <>
            <div className="underlay"/>  
            <div className="prompt" >
                <div className="prompt-menu" >
                    <ChanceCard 
                        luckCards={luckCards} 
                        flipped={flipped}
                        setFlipped={setFlipped}
                    />
                    <p className='text-plain' >
                        Your Money: 
                        {' '}{currency}{localPlayer.money}
                    </p>
                    <div className="btn-group">
                        <button 
                            className='buy-btn' 
                            onClick={luckCards.type === 'chance'
                                ? useChance
                                : useChest 
                            }
                            disabled={flipped !== 'flipped' ? true : false}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChancePrompt;
