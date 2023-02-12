import React, { useState, useEffect } from 'react';

type Props = {
    luckCards: {
        show: boolean,
        type: string,
        number: number,
    };
    flipped: string,
    setFlipped: any,
}

const ChanceCard = ( {luckCards, flipped, setFlipped}: Props ) => {
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

    const toggleFlip = () => setFlipped('flipping');

    return (
        <ul 
            className={`chance-card ${flipped}`} 
            onClick={flipped === 'flipped' ? undefined : toggleFlip}
            onAnimationEnd={() => {
                    flipped === 'flipping'
                        ? setFlipped('flipped flipping-part-2')
                        : setFlipped('flipped');
                }
            }
            
        >
            {flipped !== 'flipped' && flipped !== 'flipped flipping-part-2' ? '' 
            :<div>
                <li className="card-name plain">{luckCards.type}</li>
                <li className='card-name' >{currentCard}</li>
            </div>}
        </ul>
    )
}

export default ChanceCard;
