import React, { useEffect, useState, FC } from 'react';
import GameBoard from './components/GameBoard';

interface board {
    players: [object],
    round: number,
    turn: string,
    squares: any,
    chance: [],
    prize: [],
}

const Game: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const createSquare = (name:string, number:number, ownedBy:string, properties:number) => {
        return { name, number, ownedBy, properties };
    }

    const populateSquares = () => {
        const squares = [];
        for(let i = 1; i <= 40; i++) {
            const square = createSquare('', i, 'market', 0);
            squares.push(square);
        }
        return squares;
    }

    const [gameBoard, setGameBoard] = useState<board>(
        {
            players: [/*p1, p2, p3, p4*/{}],
            round: 1,
            turn: '/*players name*/',
            squares: populateSquares(),
            chance: [],
            prize: [],
        }
    )
    const [players, setPlayers] = useState(
        [
            {
                player1: undefined,/*player({...player1})*/
            },
            {
                player2: undefined,
            },
            {
                player3: undefined,
            },
            {
                player4: undefined,
            }
        ]
    )
    const [player, setPlayer] = useState<object>(
        {
            name: '',
            turnOrder: 1,
            dice1: 6,
            dice2: 6,
            money: 0,
            cards: [],
            owned: [{}],  
        }
    )
    const [squareTemplate, setSquareTemplate] = useState<object>(
        {
            name: 'go',
            number: 1,
            ownedBy: 'none',
            properties: 0
        }
    )

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        if(gameBoard.squares.length < 40) populateSquares();
    }, [loading]);

    return(
        <div className="game-screen" >
            <h1>Gameboard</h1>
            {!loading && <GameBoard gameBoard={gameBoard} />}
        </div>
    )
}

export default Game;
