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

    return(
        <div 
            className="dice" 
            onDragLeave={(e) => {
                rollDice(diceNum);
            }}
            draggable="true"
        >
            <p>
                {diceNum === 1 
                    ? localPlayer.dice1.number 
                    : localPlayer.dice2.number
                }
            </p>
        </div>
    )
}

export default Dice;
