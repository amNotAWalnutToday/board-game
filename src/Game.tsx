import React, { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import Dice from './components/Dice';

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
        dice1: {number: number, hasRolled: boolean}, 
        dice2: {number: number, hasRolled: boolean}, 
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
            const newPlayer = createPlayer(
                `player ${i}`,
                1,
                i, 
                {number: 1, hasRolled: false}, 
                {number: 1, hasRolled: false}, 
                1000, 
                [], 
                []
            );
            players.push(newPlayer);
        } 
        return players;
    }

    const [gameBoard, setGameBoard] = useState<board>(
        {
            players: populatePlayers(),
            round: 1,
            turn: 'player 1',
            squares: populateSquares(),
            chance: [],
            prize: [],
        }
    );

    const choosePlayer = () => {
        return gameBoard.players[0];
    }

    const [localPlayer, setLocalPlayer] = useState<any>(choosePlayer())

    const [playerTemplate, setPlayerTemplate] = useState<object>(
        {
            name: '',
            location: 1,
            turnOrder: 1,
            dice1: {number: 6, hasRolled: false},
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

    const syncPlayer = (user: {turnOrder: number}) => {
        const board = {...gameBoard};
        const players = [...gameBoard.players];
        switch(user.turnOrder) {
            case 1: 
                players[0] = user
                break;
            case 2:
                players[1] = user
                break;
            case 3:
                players[2] = user
                break;
            case 4: 
                players[3] = user
                break;
        }
        board.players = players;
        setGameBoard(board);
    }

    const moveSpaces = (rolledNum: number, user:{location: number}) => {
        if(user.location + rolledNum > 40) {
            const difference = 40 - (user.location + rolledNum);
            user.location = 0 - difference;
        } else {
            user.location += rolledNum;
        }
        return user;
    }

    const rollDice = (diceNum: number) => {
        if(gameBoard.turn !== localPlayer.name) return;
        const ran = Math.ceil(Math.random() * 6);
        let user = {...localPlayer};
        //if(user.dice1.hasRolled && diceNum === 1) return;
        //if(user.dice2.hasRolled && diceNum === 2) return; 
        if(diceNum === 1) {
            user.dice1.number = ran
            user.dice1.hasRolled = true;
        } else {
            user.dice2.number = ran;
            user.dice2.hasRolled = true;
        }
        user = moveSpaces(ran, user)
        setLocalPlayer(user);
        syncPlayer(user);
    }

    return(
        <div className="game-screen" >
            {<GameBoard gameBoard={gameBoard} />}
            {!loading && <Dice localPlayer={localPlayer} diceNum={1} rollDice={rollDice}/>}
            {!loading && <Dice localPlayer={localPlayer} diceNum={2} rollDice={rollDice}/>}
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
