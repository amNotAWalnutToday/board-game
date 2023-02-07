import React, { useEffect, useState, FC } from 'react';
import GameBoard from './components/GameBoard';

interface board {
    players: any,
    round: number,
    turn: string,
    squares: any,
    chance: [],
    prize: [],
}

const Game = () => {
    const [loading, setLoading] = useState(true);

    const createSquare = (
        name:string, 
        number:number,
        ownedBy:string, 
        properties:number,
    ) => {
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

    const createPlayer = (
        name: string,
        location: number,
        turnOrder: number,
        dice1: number, 
        dice2: number, 
        money: number, 
        cards: [], 
        owned: []
    ) => {
        return { 
            name,
            location,
            turnOrder, 
            dice1, 
            dice2, 
            money,
            cards,
            owned, 
        }
    }

    const populatePlayers = () => {
        const players = []
        for(let i = 1; i <= 4; i++) {
            const newPlayer = createPlayer(`player ${i}`, 1, i, 0, 0, 1000, [], []);
            players.push(newPlayer);
        } 
        return players;
    }

    const [gameBoard, setGameBoard] = useState<board>(
        {
            players: populatePlayers(),
            round: 1,
            turn: '/*players name*/',
            squares: populateSquares(),
            chance: [],
            prize: [],
        }
    );

    const [playerTemplate, setPlayerTemplate] = useState<object>(
        {
            name: '',
            location: 1,
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
        console.log(gameBoard);
    }, [loading]);

    return(
        <div className="game-screen" >
            {!loading && <GameBoard gameBoard={gameBoard} />}
            <button onClick={() => {
                const abc = {...gameBoard};
                const cba = [...abc.players];
                cba[0].location+=1;
                abc.players = cba;
                setGameBoard(abc);
            }} >gooooooooo</button>
        </div>
    )
}

export default Game;
