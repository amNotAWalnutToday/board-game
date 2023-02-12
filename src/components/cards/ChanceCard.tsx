import React, { useState, useEffect } from 'react';
import { Player } from '../../Game';

type Props = {
    localPlayer: Player;
    luckCards: {
        show: boolean,
        type: string,
        number: number,
    };
}

const ChanceCard = ( {localPlayer, luckCards}: Props ) => {
    const [currentCard, setCurrentCard] = useState<string>();
    const [cards, setCards] = useState<string[]>(
        [
            'Advance to go',
            'Advance to last navy square',
            'Advance to last pink square',
            'Advance to last Station',
            'Advance to last utility',
            'Go forward 3 spaces',
            'Go backwards 3 spaces',
            'Random location pass go',
        ]
    );

    useEffect(() => {
        setCurrentCard(cards[luckCards.number]);
    }, []);

    return (
        <ul className="chance-card" >
            <li className="card-name plain">Chance</li>
            <li className='card-name' >{currentCard}</li>
        </ul>
    )
}

export default ChanceCard;
