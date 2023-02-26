import { useState } from "react"

type Props = {
    localPlayer: {
        dice1: {
                number: number, 
                hasRolled: boolean
            }, 
        dice2: {
            number: number, 
            hasRolled: boolean
        },
    },
    diceNum: number,
    rollDice: (diceNum: number) => void,
}

const Dice = ({localPlayer, diceNum, rollDice}: Props) => {
    const [isRolling, setIsRolling] = useState(false);
    const [pseudoNum, setPseudoNum] = useState<number>(2);
    const [timer, setTimer] = useState<any>();

    const mapNumber = (num: number) => {
        const amount = [];
        for(let i = 0; i < num; i++) amount.push(i);
        return amount.map((item, i) => {
            return (
                <span key={i} className="dice-circle" />
            )
        });
    }

    return(
        <div 
            className={`dice 
                ${isRolling 
                    ? 'rolling' 
                    : ''
                } 
                ${localPlayer.dice1.hasRolled && diceNum === 1
                    ? 'rolled'
                    : ''
                }
                ${localPlayer.dice2.hasRolled && diceNum === 2
                    ? 'rolled'
                    : ''}`
            }
            onDragLeave={(e) => {
                if(diceNum === 1 && !localPlayer.dice1.hasRolled)setIsRolling(true);
                if(diceNum === 2 && !localPlayer.dice2.hasRolled)setIsRolling(true);
            }}
            onTouchMove={(e) => {
                if(diceNum === 1 && !localPlayer.dice1.hasRolled)setIsRolling(true);
                if(diceNum === 2 && !localPlayer.dice2.hasRolled)setIsRolling(true);
            }}
            onAnimationStart={(() => {
                    const interval = setInterval(() => {
                        const ran = Math.ceil(Math.random() * 6);
                        setPseudoNum(ran);
                    }, 100);
                    setTimer(interval);
                })
            }
            onAnimationEnd={() => {
                rollDice(diceNum);
                setIsRolling(false);
                clearInterval(timer);
            }}
            draggable="true"
        >
            {!isRolling 
            ? <p>
                {diceNum === 1 
                    ? <span className={`dice-${localPlayer.dice1.number}`}>
                        {mapNumber(localPlayer.dice1.number)}
                    </span>
                    : <span className={`dice-${localPlayer.dice2.number}`}>
                        {mapNumber(localPlayer.dice2.number)}
                    </span>
                }
            </p>
            : <p>
                <span className={`dice-${pseudoNum}`}>
                    {mapNumber(pseudoNum)}
                </span>
            </p> }
        </div>
    )
}

export default Dice;
