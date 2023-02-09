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
    jail: Player[],
}

export type Player = {
    name: string,
    location: number,
    turnOrder: number,
    dice1: {number: number, hasRolled: boolean},
    dice2: {number: number, hasRolled: boolean},
    money: number,
    cards: [],
    owned: [],
}

export type Square = {
    name:string, 
    number:number,
    ownedBy:string | null, 
    properties: 0|1|2|3|4|5,
    cost: {deed: number, house: number, hotel: number},
    rent: number[],
    group: 'brown'|'cyan'|'pink'|'orange'|'red'|'yellow'|'green'|'navy'|null,
}

const Game = () => {
    const [loading, setLoading] = useState(true);
    const [canBuy, setCanBuy] = useState(false);
    const [buyableSquare, setBuyableSquare] = useState<Square>()

    const createSquare = (
        name:string, 
        number:number,
        ownedBy:string | null = null, 
        properties:number = 0,
        cost: {deed: number, house: number, hotel: number} = {deed: 200, house: 100, hotel: 500},
        rent: number[] = [100, 200, 300, 400, 500, 600],
        group: string | null = null,
    ) => {
        return { name, number, ownedBy, properties, cost, rent, group };
    }

    const checkExceptions = (num: number) => {
        const exceptions = [
            num === 1,
            num === 2,
            num === 3,
            num === 4,
            num === 5,
            num === 6,
            num === 7,
            num === 8,
            num === 9,
            num === 10,
            num === 11,
            num === 12,
            num === 13,
            num === 14,
            num === 15,
            num === 16,
            num === 17,
            num === 18,
            num === 19,
            num === 20,
            num === 21,
            num === 22,
            num === 23,
            num === 24,
            num === 25,
            num === 26,
            num === 27,
            num === 28,
            num === 29,
            num === 30,
            num === 31,
            num === 32,
            num === 33,
            num === 34,
            num === 35,
            num === 36,
            num === 37,
            num === 38,
            num === 39,
            num === 40,
        ];
        if(exceptions.some(Boolean)) return true;
        else return false;
    }

    const populateExceptionSquares = (num: number) => {
        const squares = [
            createSquare('go', 1),
            createSquare('kent road', 2, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'brown'),
            createSquare('chest', 3),
            createSquare('white chapel road', 4, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'brown'),
            createSquare('income tax £200', 5, 'free parking'),
            createSquare('king cross station', 6, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('angel islington', 7, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'cyan'),
            createSquare('chance', 8),
            createSquare('euston road', 9, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'cyan'),
            createSquare('penton ville road', 10, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'cyan'),
            createSquare('jail', 11),
            createSquare('pall mall', 12, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'pink'),
            createSquare('electric company', 13, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('whitehall', 14, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'pink'),
            createSquare('umberland avenue', 15, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'pink'),
            createSquare('marylbone station', 16, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('bow street', 17, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'orange'),
            createSquare('chest', 18),
            createSquare('borough street', 19, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'orange'),
            createSquare('vine street', 20, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'orange'),
            createSquare('free parking', 21),
            createSquare('strand', 22, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'red'),
            createSquare('chance', 23),
            createSquare('fleet street', 24, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'red'),
            createSquare('trafalgar square', 25, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'red'),
            createSquare('fenchurch station', 26, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('leicester square', 27, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'yellow'),
            createSquare('coventry street', 28, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'yellow'),
            createSquare('water works', 29, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('piccadilly', 30, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'yellow'),
            createSquare('go to jail', 31),
            createSquare('regent street', 32, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'green'),
            createSquare('oxford street', 33, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'green'),
            createSquare('chest', 34),
            createSquare('bond street', 35, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'green'),
            createSquare('liverpool station', 36, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('chance', 37),
            createSquare('park lane', 38, 'market', 0, {deed: 200, house: 100, hotel: 100}, [1,2,3,4,5,5], 'navy'),
            createSquare('super tax £100', 39, 'free parking'),
            createSquare('mayfair', 40, 'market', 0, {deed: 200, house: 100, hotel: 500}, [1,2,3,4,5,5], 'navy'),
        ];
        for(let i = 0; i < squares.length; i++) {
            if(squares[i].number === num) return squares[i];
        } 
    }

    const populateSquares = () => {
        const squares = [];
        for(let i = 1; i <= 40; i++) {
            if(!checkExceptions(i)){
                const square = createSquare(`square ${i}`, i, 'market', 0, {deed: 200, house: 100, hotel: 100});
                squares.push(square);
            } else {
                const exceptionSquare = populateExceptionSquares(i);
                squares.push(exceptionSquare);
            }
        }
        return squares;
    }

    const getSquare = (user: Player):Square | undefined => {
        const squares = [...gameBoard.squares];
        let result;
        squares.forEach((square: any) => {
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
                29,
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
            jail: [],
        }
    );

    const changeTurn = () => {
        const board = {...gameBoard}
        const players = [...board.players]
        let currentTurn:any;
        players.forEach((player:Player) => {
            if(player.name === board.turn) currentTurn = player;
        });
        if(currentTurn.turnOrder < 4) {
            const nextTurn = currentTurn.turnOrder + 1;
            players.forEach((player: Player) => {
                if(player.turnOrder === nextTurn) currentTurn = player;
            });
        } else {
            players.forEach((player: Player) => {
                if(player.turnOrder === 1) currentTurn = player;
            })
        }
        currentTurn.dice1.hasRolled = false;
        currentTurn.dice2.hasRolled = false;
        board.turn = currentTurn.name;
        setLocalPlayer(currentTurn);
        setGameBoard(board);
    }

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
    // if first dice in jail second dice can break free !bug!
    const checkJail = (user: Player) => {
        const board = {...gameBoard};
        let inJail;
        board.jail.forEach((player: Player) => {
            if(player.name === user.name) inJail = true;
        });
        return inJail;
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
        const ran = Math.ceil(Math.random() * 2);
        let user = {...localPlayer};
        if(user.dice1.hasRolled && diceNum === 1) return;
        if(user.dice2.hasRolled && diceNum === 2) return; 
        if(diceNum === 1) {
            user.dice1.number = ran
            user.dice1.hasRolled = true;
        } else {
            user.dice2.number = ran;
            user.dice2.hasRolled = true;
        }
        if(checkJail(user)) return locationEventJailRollCheck(user);
        user = moveSpaces(ran, user)
        locationEventController(user);
        setLocalPlayer(user);
        syncPlayer(user);
    }

    const closeBuyPrompt = () => setCanBuy(false);

    const locationEventPayTax = (user:Player, board:board) => {
        board.squares.forEach((square: Square) => {
            if(square.number === 21 && user.location === 39) {
                square.cost.deed += 100;
                user.money -= 100;
            } else if(square.number === 21 && user.location === 5) {
                square.cost.deed += 200;
                user.money -= 200;
            }
        });
        setLocalPlayer(user);
        return board;
    }

    const locationEventPayRent = (user: Player, square: Square) => {
        let board = {...gameBoard};
        const players = [...board.players];
        if(square.number === 39 || square.number === 5) board = locationEventPayTax(user, board);
        else {
            players.forEach((player: Player) => {
                if(player.name === square.ownedBy) {
                    player.money += square.rent[square.properties];
                }
            });
            user.money -= square.rent[square.properties];
        }
        setLocalPlayer(user);
        syncPlayer(user);
        setGameBoard(board);
    }

    const locationEventBuy = () => {
        const user = {...localPlayer};
        const square = getSquare(user);
        if(!square) return;
        if(localPlayer.money > square.cost.deed) {
            square.ownedBy = localPlayer.name; 
            user.money -= square.cost.deed;
            user.owned.push(square.name);
        }
        setLocalPlayer(user);
        syncPlayer(user);
        closeBuyPrompt();
        return square;
    }

    const locationEventMerch = (user: Player) => {
        const square = getSquare(user);

        if(!square 
        || !localPlayer.dice1.hasRolled 
        || !localPlayer.dice2.hasRolled) return;

        if(square.ownedBy !== 'market'
        && square.ownedBy !== null
        && square.ownedBy !== user.name) locationEventPayRent(user, square);
        else if(square.ownedBy !== user.name && square.cost.deed) {
            setCanBuy(true);
            setBuyableSquare(square);
        }
    }

    const locationEventFreeParking = (user: Player) => {
        const square = getSquare(user);
        if(!square) return;
        user.money += square.cost.deed;
        square.cost.deed = 0;
        setLocalPlayer(user);
    }

    const locationEventLeaveJail = (user: Player) => {
        const board = {...gameBoard};
        for(let i = 0; i < board.jail.length; i++) {
            if(user.name === board.jail[i].name) board.jail.splice(i, 1);
        }
        console.log(board.jail);
        setGameBoard(board);
    }

    const locationEventJailRollCheck = (user: Player) => {      
        setLocalPlayer(user);
        if(!localPlayer.dice1.hasRolled || !localPlayer.dice2.hasRolled) return;
        if(user.dice1.number === user.dice2.number) locationEventLeaveJail(user);
    }

    const locationEventGoToJail = (user: Player) => {
        const board = {...gameBoard};
        gameBoard.jail.push(user);
        user.location = 11;
        setLocalPlayer(user);
        setGameBoard(board);
    }

    const locationEventSpecial = (user: Player) => {
        if(user.location === 21) return locationEventFreeParking(user);
        if(user.location === 31) return locationEventGoToJail(user);
    }
    
    const locationEventController = (user: Player) => {
        if(!localPlayer.dice1.hasRolled || !localPlayer.dice2.hasRolled) return;
        const exceptions = [
            user.location === 1,
            user.location === 11,
            user.location === 21,
            user.location === 31,
        ]
        if(exceptions.some(Boolean)) return locationEventSpecial(user);
        else {
            locationEventMerch(user)
        }
    } 

    return(
        <div className="game-screen" >
            {<GameBoard gameBoard={gameBoard} localPlayer={localPlayer} changeTurn={changeTurn} />}
            <div className="dice-holder">
                {!loading && <Dice localPlayer={localPlayer} diceNum={1} rollDice={rollDice}/>}
                {!loading && <Dice localPlayer={localPlayer} diceNum={2} rollDice={rollDice}/>}
            </div>
            {canBuy && <BuyPrompt buyProperty={locationEventBuy} dontBuy={closeBuyPrompt} inspectionTarget={buyableSquare} />}
        </div>
    )
}

export default Game;

// next step => specify squares
// square types => irregular { go, jail, free, go to jail } <= complete
//                 card spots { community, chance }
//                 normal { properties } 
//                 normal { stations }
// next step => normal { properties } place house/hotels
// next step => fill in square information
//
// next step => add overlay when hovering squares for extra info
//              improve buy prompt
//
// next step => add chance/chest cards
// next step => add icons to board spots and update user icons
//