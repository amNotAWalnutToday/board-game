import React, { useEffect, useState } from 'react';

const Game = () => {
    const [loading, setLoading] = useState(true);
    const [gameBoard, setGameBoard] = useState<any>(
        {
            players: [/*p1, p2, p3, p4*/],
            round: 1,
            turn: '/*players name*/',
            squares: [/*1-40*/],
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

    const createSquare = (name:string, number:number, ownedBy:string, properties:number) => {
        return { name, number, ownedBy, properties };
    }

    const populateSquares = () => {
        const board = {...gameBoard};
        const squares = [];
        for(let i = 1; i <= 40; i++) {
            const square = createSquare('', i, 'market', 0);
            squares.push(square);
        }
        board.squares.push(...squares);
        setGameBoard({board});
    }

    const mapSquares = () => {
        console.log(gameBoard);
        if(gameBoard.squares.length < 40) populateSquares();
        const board = {...gameBoard};
        const squares = board.squares;
        console.log('squares', squares);
        
        return squares.map((item:any, i:number) => {
            return <div className="square">{item.ownedBy}{i}</div>
        })
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [loading]);

    return(
        <div className="game-screen" >
            <h1>Gameboard</h1>
            <div id="game-board">
               {!loading ? mapSquares() : ''} 
            </div>
        </div>
    )
}

export default Game;
