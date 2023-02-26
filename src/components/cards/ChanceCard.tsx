import React, { useState, useEffect } from 'react';
import { currency } from '../../Game';

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
            'Restart the Samsara with an extra 200 mora.',
            'It\'s time for the Sabzeruz festival, visit Sumeru City.',
            'Pay tribute to Cloud Retainer at Mt. Aocang.',
            'Take part in the Nilotpala cup in Port Osmos.',
            'Submit a light novel manuscript for a contest at the Yae Publishing House.',
            'Go rolling with Sayu and advance 3 Spaces.',
            'Adventure with Bennet in a dungeon and get lost, go backwards 3 spaces.',
            'Fall into a wormhole, teleport somewhere random.',
        ]
    );
    const [chestCards, setChestCards] = useState<string[]>(
        [
            'Paimon robs Mora for food, lose 100 Mora',
            'Participate in the Weinlesefest festival and run a stall, receive 100 Mora in profits.',
            'Collect 50 Mora from each player as they take your specialities.',
            'Give 50 Mora to each player to take their specialities.',
            'Trick every other player into a wormhole. Everyone else forced to a random location.',
            'Catch Klee fish blasting with every other player, send them to solitary confinement!',
            'Get caught fish blasting with Klee, take a trip to Solitary Confinement!',
            'Get out of Solitary Confinement early for good behaviour.(get out of jail free card.)',
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
            {flipped !== 'flipped' && flipped !== 'flipped flipping-part-2' 
            ? <div className='card-back'><div className='chance-icon card-back' ></div></div> 
            :<div className='card-front' >
                <li className="card-name plain">{luckCards.type}</li>
                <li className='chance-icon card-back' ></li>
                <li className='chance-card-description' >{currentCard}</li>
            </div>}
        </ul>
    )
}

export default ChanceCard;
