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
    const [chanceCards, setChanceCards] = useState<string[]>(
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
    const [chestCards, setChestCards] = useState<string[]>(
        [
            'pay 100',
            'receive 100',
            'collect 10 from each player',
            'give 10 to each player',
            'every other player randomize locations but dont buy or pay tax',
            'every other player goes to jail',
            'go to jail',
            'get outta jail free card',
        ]
    )

    useEffect(() => {
        luckCards.type === 'chance'
            ? setCurrentCard(chanceCards[luckCards.number])
            : setCurrentCard(chestCards[luckCards.number]);
    }, []);

    return (
        <ul className="chance-card" >
            <li className="card-name plain">Chance</li>
            <li className='card-name' >{currentCard}</li>
        </ul>
    )
}

export default ChanceCard;
