import React, { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import Dice from './components/Dice';
import BuyPrompt from './components/BuyPrompt';

interface board {
    players: any,
    round: number,
    turn: string,
    squares: any,
    chance: [],
    prize: [],
}

export type Player = {
    name: string,
    location: number,
    turnOrder: number,
    dice1: number,
    dice2: number,
    money: number,
    cards: [],
    owned: [],
}

const Game = () => {
    const [loading, setLoading] = useState(true);
    const [canBuy, setCanBuy] = useState(false);

    const createSquare = (
        name:string, 
        number:number,
        ownedBy:string | null = null, 
        properties:number = 0,
        cost: number = 0,
    ) => {
        return { name, number, ownedBy, properties, cost };
    }

    const checkExceptions = (num: number) => {
        const exceptions = [
            num === 1,
            num === 11,
            num === 21,
            num === 31,
        ];
        if(exceptions.some(Boolean)) return true;
        else return false;
    }

    const populateExceptionSquares = (num: number) => {
        const squares = [
            createSquare('go', 1),
            createSquare('jail', 11),
            createSquare('free parking', 21),
            createSquare('go to jail', 31),
        ];
        for(let i = 0; i < squares.length; i++) {
            if(squares[i].number === num) return squares[i];
        } 
    }

    const populateSquares = () => {
        const squares = [];
        for(let i = 1; i <= 40; i++) {
            if(!checkExceptions(i)){
                const square = createSquare('', i, 'market', 0, 200);
                squares.push(square);
            } else {
                const exceptionSquare = populateExceptionSquares(i);
                squares.push(exceptionSquare);
            }
        }
        return squares;
    }

    const getSquare = (user: Player):{cost: number, ownedBy: string} => {
        let result = {cost: 100 * 100, ownedBy: ''};
        gameBoard.squares.forEach((square: any) => {
            if(square.number === user.location) result = square
        })
        return result;
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
            properties: 0,
            cost: 0,
        }
    )

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        if(gameBoard.squares.length < 40) populateSquares();
        console.log(gameBoard);
    }, [loading]);

    const syncPlayer = (user: Player) => {
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

    const moveSpaces = (rolledNum: number, user: Player) => {
        if(user.location + rolledNum > 40) {
            const difference = 40 - (user.location + rolledNum);
            user.location = 0 - difference;
            user.money += 200;
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
        locationEventController(user);
        setLocalPlayer(user);
        syncPlayer(user);
    }

    const closeBuyPrompt = () => setCanBuy(false);

    const locationEventBuy = () => {
        const user = {...localPlayer};
        const square = getSquare(user);
        if(localPlayer.money > square.cost) {
            square.ownedBy = localPlayer.name;
            user.money -= square.cost;
        }
        setLocalPlayer(user);
        syncPlayer(user);
        closeBuyPrompt();
        console.log(gameBoard);
        console.log(user.money)
        return square;
    }

    const locationEventMerch = (user: Player) => {
        const square = getSquare(user);
        console.log(square);
        console.log(localPlayer);
        if(square.ownedBy !== 'market') return;
        setCanBuy(true);
    }

    const locationEventController = (user: Player) => {
        const exceptions = [
            user.location === 1,
            user.location === 11,
            user.location === 21,
            user.location === 31,
        ]
        if(exceptions.some(Boolean)) return;
        else {
            locationEventMerch(user)
        }
    } 

    return(
        <div className="game-screen" >
            {<GameBoard gameBoard={gameBoard} localPlayer={localPlayer} />}
            {!loading && <Dice localPlayer={localPlayer} diceNum={1} rollDice={rollDice}/>}
            {!loading && <Dice localPlayer={localPlayer} diceNum={2} rollDice={rollDice}/>}
            {canBuy && <BuyPrompt buyProperty={locationEventBuy} dontBuy={closeBuyPrompt}/>}
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

// next step => specify squares
// square types => irregular { go, jail, free, go to jail }
//                 card spots { community, chance }
//                 normal { properties } <= current
//                 normal { stations }