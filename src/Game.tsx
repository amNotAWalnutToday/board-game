import React, { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import Gameover from './components/Gameover';
import ChancePrompt from './components/ChancePrompt';
import BuyPrompt from './components/BuyPrompt';
import Log from './components/Log';

export interface board {
    players: any,
    round: number,
    turn: string,
    squares: any,
    chance: [],
    prize: [],
    jail: Player[],
}

export type LogMessage = {
    player: string,
    action: string | undefined,
    output: string | undefined,
    player2: string | undefined,
    money: string | undefined,
}

export type Player = {
    name: string,
    location: number,
    turnOrder: number,
    dice1: {number: number, hasRolled: boolean},
    dice2: {number: number, hasRolled: boolean},
    money: number,
    cards: string[],
    owned: Square[],
    lost: boolean,
    logo: string,
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

export const currency = <span className="m-symbol"/>;

type Props = {
    settings: any;
}

const Game = ( {settings}: Props ) => {
    const [loading, setLoading] = useState(true);
    const [luckCards, setLuckCards] = useState(
        {
            show: false,
            type: 'chance',
            number: 0,
        }
    );
    const toggleLuckCards = () => setLuckCards({show: false, type: '', number: 0});

    const [canBuy, setCanBuy] = useState(false);
    const [buyableSquare, setBuyableSquare] = useState<Square>();

    const [gameLog, setGameLog] = useState<LogMessage[]>([]);

    const [gameover, setGameover] = useState<boolean>(false);

    const createSquare = (
        name:string, 
        number:number,
        ownedBy:string | null = null, 
        properties:number = 0,
        cost: {
            deed: number, 
            house: number, 
            hotel: number
        } = {deed: 0, house: 100, hotel: 500},
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
            createSquare('New Samsara', 1),
            createSquare('Mondstadt', 2, 'market', 0, {deed: 60, house: 50, hotel: 50}, [2,10,30,90,160,250], 'brown'),
            createSquare('Common Chest', 3),
            createSquare('Stormterrors lair', 4, 'market', 0, {deed: 60, house: 50, hotel: 50}, [4,20,60,180,320,450], 'brown'),
            createSquare('Gliding Exam', 5, 'free parking', 0, {deed: 200, house: 0, hotel: 0}),
            createSquare('Dornman Port', 6, 'market', 0, {deed: 200, house: 100, hotel: 100}, [0,25,50,100,200]),
            createSquare('Dadaupa Gorge', 7, 'market', 0, {deed: 100, house: 50, hotel: 50}, [6,30,90,270,400,550], 'cyan'),
            createSquare('Wish', 8),
            createSquare('Springvale', 9, 'market', 0, {deed: 100, house: 50, hotel: 50}, [6,30,90,270,400,550], 'cyan'),
            createSquare('Dawn Winery', 10, 'market', 0, {deed: 120, house: 50, hotel: 50}, [8,40,100,300,450,600], 'cyan'),
            createSquare('Solitary Confinement', 11),
            createSquare('Mt. Hula', 12, 'market', 0, {deed: 140, house: 100, hotel: 100}, [10,50,150,450,625,750], 'pink'),
            createSquare('Yun-Han Opera', 13, 'market', 0, {deed: 150, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('Qingyun Peak', 14, 'market', 0, {deed: 140, house: 100, hotel: 100}, [10,50,150,450,625,750], 'pink'),
            createSquare('Mt. Aocang', 15, 'market', 0, {deed: 160, house: 100, hotel: 100}, [12,60,180,500,700,900], 'pink'),
            createSquare('Liyue Harbor', 16, 'market', 0, {deed: 200, house: 100, hotel: 100}, [0,25,50,100,200]),
            createSquare('Mingyun Village', 17, 'market', 0, {deed: 180, house: 100, hotel: 100}, [14,70,200,550,750,950], 'orange'),
            createSquare('Exquisite Chest', 18),
            createSquare('Qingce Village', 19, 'market', 0, {deed: 180, house: 100, hotel: 100}, [14,70,200,550,750,950], 'orange'),
            createSquare('Qiaoying Village', 20, 'market', 0, {deed: 200, house: 100, hotel: 100}, [16,80,220,600,800,1000], 'orange'),
            createSquare('Commisions', 21),
            createSquare('Chirai Shrine', 22, 'market', 0, {deed: 220, house: 150, hotel: 150}, [18,90,250,700,875,1050], 'red'),
            createSquare('Wish', 23),
            createSquare('Asase Shrine', 24, 'market', 0, {deed: 220, house: 150, hotel: 150}, [18,90,250,700,875,1050], 'red'),
            createSquare('Mouun Shrine', 25, 'market', 0, {deed: 240, house: 150, hotel: 150}, [20,100,300,750,925,1100], 'red'),
            createSquare('Ritou Port', 26, 'market', 0, {deed: 200, house: 100, hotel: 100}, [0,25,50,100,200]),
            createSquare('Sangonomiya Shrine', 27, 'market', 0, {deed: 260, house: 150, hotel: 150}, [22,110,330,800,975,1150], 'yellow'),
            createSquare('Grand Narukami Shrine', 28, 'market', 0, {deed: 260, house: 150, hotel: 150}, [22,110,330,800,975,1150], 'yellow'),
            createSquare('Yae Publishing House', 29, 'market', 0, {deed: 150, house: 100, hotel: 100}, [1,2,3,4,5,5]),
            createSquare('Inazuma City', 30, 'market', 0, {deed: 260, house: 150, hotel: 150}, [24,120,360,850,1025,1200], 'yellow'),
            createSquare('go to jail', 31),
            createSquare('Tanit Camps', 32, 'market', 0, {deed: 300, house: 200, hotel: 200}, [26,130,390,900,1100,1275], 'green'),
            createSquare('Aaru Village', 33, 'market', 0, {deed: 300, house: 200, hotel: 200}, [26,130,390,900,1100,1275], 'green'),
            createSquare('Luxurious Chest', 34),
            createSquare('Caravan Ribat', 35, 'market', 0, {deed: 320, house: 200, hotel: 200}, [28,150,450,1000,1200,1400], 'green'),
            createSquare('Port Ormos', 36, 'market', 0, {deed: 200, house: 100, hotel: 100}, [0,25,50,100,200]),
            createSquare('Wish', 37),
            createSquare('Pardis Dhyai', 38, 'market', 0, {deed: 350, house: 200, hotel: 200}, [35,175,550,1100,1300,1500], 'navy'),
            createSquare('Knowledge Capsule Scam', 39, 'free parking', 0, {deed: 100, house: 0, hotel: 0}),
            createSquare('Sumeru City', 40, 'market', 0, {deed: 400, house: 200, hotel: 200}, [50,200,669,1400,1700,2000], 'navy'),
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

    const checkIfStation = (num: number | undefined) => {
        return num === 6 || num === 16 || num === 26 || num === 36
            ? true
            : false;
    }

    const checkIfUtility = (num: number | undefined) => {
        return num === 13 || num === 29
            ? true
            : false
    }

    const checkForSet = (user:Player, group: string | null):boolean => {
        let deeds = 0;
        user.owned.forEach((square) => {
            if(square.group === group) deeds += 1; 
        });
        if(group === 'navy' || group === 'brown') {
            return deeds === 2 ? true : false;
        } else {
            return deeds === 3 ? true : false;
        }
    }

    const sortByGroup = (user: Player) => {
        const brown:Square[] = [];
        const cyan:Square[] = [];
        const pink:Square[] = [];
        const orange:Square[] = [];
        const red:Square[] = [];
        const yellow:Square[] = [];
        const green:Square[] = [];
        const navy:Square[] = [];
        const other:Square[] = [];

        user.owned.forEach((square: Square) => {
            if(square.group === 'brown') brown.push(square);
            if(square.group === 'cyan') cyan.push(square);
            if(square.group === 'pink') pink.push(square);
            if(square.group === 'orange') orange.push(square);
            if(square.group === 'red') red.push(square);
            if(square.group === 'yellow') yellow.push(square);
            if(square.group === 'green') green.push(square);
            if(square.group === 'navy') navy.push(square);
            if(!square.group) other.push(square);
        });

        return brown
            .concat(cyan)
            .concat(pink)
            .concat(orange)
            .concat(red)
            .concat(yellow)
            .concat(green)
            .concat(navy)
            .concat(other);
    }

    const createPlayer = (
        name: string,
        logo: string,
        turnOrder: number,
        location: number = 1,
        dice1: {
            number: number, 
            hasRolled: boolean 
        } = { number: 1, hasRolled: false}, 
        dice2: {
            number: number, 
            hasRolled: boolean 
        } = { number: 1, hasRolled: false}, 
        money: number = 1000, 
        cards: string[] = [], 
        owned: [] = [],
        lost: boolean = false,
    ) => {
        return { 
            name,
            logo,
            turnOrder, 
            location,
            dice1, 
            dice2, 
            money,
            cards,
            owned,
            lost,
        }
    }

    const populatePlayers = () => {
        const players = []
        const newPlayer1 = createPlayer(
            settings.player1.name,
            settings.player1.icon,
            1,
        );
        const newPlayer2 = createPlayer(
            settings.player2.name,
            settings.player2.icon,
            2,
        );
        players.push(newPlayer1, newPlayer2);

        if(!settings.player3.disable) {
            const newPlayer3 = createPlayer(
                settings.player3.name,
                settings.player3.icon,
                3,
            );
            players.push(newPlayer3);
        }
        if(!settings.player4.disable) {
            const newPlayer4 = createPlayer(
                settings.player4.name,
                settings.player4.icon,
                4,
            );
            players.push(newPlayer4);
        }
        return players;
    }

    const [gameBoard, setGameBoard] = useState<board>(
        {
            players: populatePlayers(),
            round: 1,
            turn: settings.player1.name,
            squares: populateSquares(),
            chance: [],
            prize: [],
            jail: [],
        }
    );

    /*const changeTurn:any = () => {
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
        lose(currentTurn);
        setLocalPlayer(currentTurn);
        setGameBoard(board);
        console.log(gameBoard.players);
    }*/

    const changeTurn:any = () => {
        if(localPlayer.money <= 0 && localPlayer.owned.length !== 0) return;
        if(!localPlayer.dice1.hasRolled || !localPlayer.dice2.hasRolled) return;
        let board = {...gameBoard};
        lose(localPlayer);
        const players = [...board.players];
        const findCurrentTurn = (element:Player) => board.turn === element.name;
        const currentTurn = players.findIndex(findCurrentTurn);
        if(currentTurn + 1 > players.length - 1) {
            board.turn = players[0].name;
            board.round++;
            players[0].dice1.hasRolled = false;
            players[0].dice2.hasRolled = false;
            setLocalPlayer(players[0]);
        } else {
            board.turn = players[currentTurn + 1].name;
            players[currentTurn + 1].dice1.hasRolled = false;
            players[currentTurn + 1].dice2.hasRolled = false;
            setLocalPlayer(players[currentTurn + 1]);
        }
        board = removeLost(board);
        setGameBoard(board);      
    }

    const removeLost = (board: board) => {
        const r:Player[] = [];
        let i = 1;
        board.players.forEach((player: Player) => {
            if(!player.lost) { 
                player.turnOrder = i;
                i++;
                r.push(player);
            }
        });
        board.players = r;
        if(r.length <= 1) setGameover(true);
        return board;
    }

    const lose = (user: Player) => {
        if(user.money <= 0 && !user.owned.length) user.lost = true;
    }

    const choosePlayer = () => {
        return gameBoard.players[0];
    }

    const [localPlayer, setLocalPlayer] = useState<Player>(choosePlayer())

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        
    }, []);

    const forceLog = (
        user: any, 
        action: string, 
        output: string | undefined,
        receiver: any,
        money: string | undefined,
    ) => {
        const log = [...gameLog];
        const message = {
            player: `${user.name}`,
            action: action,
            player2: receiver,
            output: output,
            money: money,
        };
        log.push(message);
        if(gameLog.length > 50) gameLog.shift();
        setGameLog(log);
    }

    const pushToLog = (
        user: any, 
        action: string, 
        output: string | undefined,
        receiver: any,
        money: string | undefined,
    ) => {
        const message = {
            player: `${user.name}`,
            action: action,
            player2: receiver,
            output: output,
            money: money,
        };
        gameLog.push(message);
        if(gameLog.length > 50) gameLog.shift();
    }

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
    
    const checkJail = (user: Player) => {
        const board = {...gameBoard};
        let inJail;
        board.jail.forEach((player: Player) => {
            if(player.name === user.name) inJail = true;
        });
        return inJail;
    }
    
    /////////////////////////
    // Work .In .Progress //
    /*const moveStagger = (user: Player, rolledNum: number) => {
        if(!user.dice1.hasRolled || !user.dice2.hasRolled) return;
        let times = rolledNum 
            ? rolledNum 
            : user.dice1.number + user.dice2.number;
        const timer = () => setTimeout(() => {
            if(user.location + 1 > 40){
                user.location = 1;
                user.money += 200;
            } else {
                user.location += 1;
            }
            times -= 1;
            setLocalPlayer(user);
            syncPlayer(user);
            console.log('also happen')
            if(times === 0) locationEventController(user);
            if(times > 0) timer();
        }, 50);
        setTimeout(timer);
        console.log('happen');
    }*/

    const moveSpaces = (rolledNum: number, user: Player) => {
        if(user.location + rolledNum > 40) {
            const difference = 40 - (user.location + rolledNum);
            user.location = 0 - difference;
            user.money += 200;
            
            pushToLog(user, 'receives', 'A New Samsara' , 'has began', '200, ');
        } else {
            user.location += rolledNum;
        }

        const currentSquare = getSquare(user);
        if(user.dice1.hasRolled && user.dice2.hasRolled) {
            pushToLog(user, 'arrives at', currentSquare?.name, '', '');
        }
        return user;
    }

    const rollDice = (diceNum: number) => {
        if(gameBoard.turn !== localPlayer.name) return;
        const ran = Math.ceil(Math.random() * 6);
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
                pushToLog(user, `pays`, `to`, 'Commisions', `100`);
            } else if(square.number === 21 && user.location === 5) {
                square.cost.deed += 200;
                user.money -= 200;
                pushToLog(user, `pays`, `to`, 'Commisions', `200`);
            }
        });
        setLocalPlayer(user);
        return board;
    }

    const locationEventPayUtility = (square: Square) => {
        const totalRoll = localPlayer.dice1.number + localPlayer.dice2.number;
        square.rent = [0, totalRoll * 4, totalRoll * 10];
        return square;
    }

    const locationEventPayRent = (user: Player, square: Square) => {
        let board = {...gameBoard};
        const players = [...board.players];
        if(square.number === 13 || square.number === 29) {
            square = locationEventPayUtility(square);
        }

        if(square.number === 39 || square.number === 5) {
            board = locationEventPayTax(user, board);
        } else {
            let paidAmount = 0;
            players.forEach((player: Player) => {
                if(checkJail(player)) return;
                if(checkForSet(player, square.group) 
                && square.properties === 0
                && player.name === square.ownedBy) {
                    player.money += square.rent[0] * 2;
                    paidAmount = square.rent[0] * 2;
                    pushToLog(user, `pays`, `to`, player.name, `${paidAmount}`);
                } else if(player.name === square.ownedBy) {
                    player.money += square.rent[square.properties];
                    paidAmount = square.rent[square.properties];
                    pushToLog(user, `pays`, `to`, player.name, `${paidAmount}`);
                }
            });
            user.money -= paidAmount;
        }
        setLocalPlayer(user);
        syncPlayer(user);
        setGameBoard(board);
    }

    const setStationRent = () => {
        const board = {...gameBoard}
        let stations:0|1|2|3|4 = 0;
        board.squares.forEach((square: Square) => {
            if(checkIfStation(square.number) 
            && square.ownedBy === localPlayer.name) {
                stations += 1;
            } 
        });
        board.squares.forEach((square: Square) => {
            if(checkIfStation(square.number) 
            && square.ownedBy === localPlayer.name) {
                square.properties = stations;
            } 
        });
        setGameBoard(board);
    }

    const setUtilityRent = () => {
        const board = {...gameBoard}
        let utilities:0|1|2|3|4 = 0;
        board.squares.forEach((square: Square) => {
            if(checkIfUtility(square.number) 
            && square.ownedBy === localPlayer.name) {
                utilities += 1;
            } 
        });
        board.squares.forEach((square: Square) => {
            if(checkIfUtility(square.number) 
            && square.ownedBy === localPlayer.name) {
                square.properties = utilities;
            } 
        });
        setGameBoard(board);
    }

    const locationEventBuy = () => {
        let user = {...localPlayer};
        const square = getSquare(user);
        if(!square) return;
        if(localPlayer.money > square.cost.deed) {
            square.ownedBy = localPlayer.name; 
            user.money -= square.cost.deed;
            user.owned.push(square);
            user.owned = sortByGroup(user);
            if(checkIfStation(square.number)) setStationRent();
            if(checkIfUtility(square.number)) setUtilityRent();
        }

        pushToLog(
            user, 
            'for', 
            buyableSquare?.name, 'was bought', 
            `${buyableSquare?.cost.deed}, `
        );
        setLocalPlayer(user);
        syncPlayer(user);
        closeBuyPrompt();
    }

    const locationEventMerch = (user: Player) => {
        const square = getSquare(user);

        if(!square 
        || !localPlayer.dice1.hasRolled 
        || !localPlayer.dice2.hasRolled) return;

        if(square.ownedBy !== 'market'
        && square.ownedBy !== null
        && square.ownedBy !== user.name) locationEventPayRent(user, square);
        else if(square.ownedBy !== user.name && square.cost.deed
        && square.cost.deed < user.money) {
            setCanBuy(true);
            setBuyableSquare(square);
        }
    }

    const locationEventFreeParking = (user: Player) => {
        const square = getSquare(user);
        if(!square) return;
        user.money += square.cost.deed;
        pushToLog(
            user, 
            'receives', 
            'as a reward from commisions', 
            '', 
            `${square.cost.deed}`
        );
        square.cost.deed = 0;
        setLocalPlayer(user);
    }

    const locationEventLeaveJail = (user: Player) => {
        const board = {...gameBoard};
        for(let i = 0; i < board.jail.length; i++) {
            if(user.name === board.jail[i].name) board.jail.splice(i, 1);
        }
        setGameBoard(board);
    }

    const locationEventJailRollCheck = (user: Player) => {      
        setLocalPlayer(user);
        if(!localPlayer.dice1.hasRolled || !localPlayer.dice2.hasRolled) return;
        if(user.dice1.number === user.dice2.number
        || user.dice1.number + user.dice2.number > 7) {
            locationEventLeaveJail(user);
            pushToLog(
                user, 
                `rolls a ${user.dice1.number} and a ${user.dice2.number} and`, 
                'is released from solitary confinement', ``, '' 
            );
        } else {
            pushToLog(
                user, 
                `rolls a ${user.dice1.number} and a ${user.dice2.number} and`, 
                'remains in solitary confinement another turn', ``, `` 
            );
        }
    }

    const locationEventGoToJail = (user: Player) => {
        const board = {...gameBoard};
        gameBoard.jail.push(user);
        user.location = 11;
        setLocalPlayer(user);
        setGameBoard(board);
        pushToLog(user, 'gets arrested to', 'Solitary Confinement', '', '');
    }

    const locationEventSpecial = (user: Player) => {
        if(user.location === 21) return locationEventFreeParking(user);
        if(user.location === 31) return locationEventGoToJail(user);
    }

    const useChance = () => {
        let user = {...localPlayer};
        const here = user.location;
        switch(luckCards.number) {
            case 0:
                user = moveSpaces(41 - here, user);
                break;
            case 1: 
                user = moveSpaces(40 - here, user);
                break;
            case 2:
                user = moveSpaces(40 + 15 - here, user);
                break;
            case 3:
                user = moveSpaces(40 + 36 - here, user);
                break;
            case 4:
                user = moveSpaces(40 + 29 - here, user);
                break;
            case 5:
                user = moveSpaces(3, user);
                break;
            case 6: 
                user = moveSpaces(-3, user);
                break;
            case 7:
                const ran = Math.ceil(Math.random() * 41);
                user = moveSpaces(ran, user);
                break;
        }
        locationEventController(user);
        setLocalPlayer(user);
        syncPlayer(user);
        toggleLuckCards(); 
    }

    const useChest = () => {
        const board = {...gameBoard};
        let user = {...localPlayer};
        switch(luckCards.number) {
            case 0:
                user.money -= 100
                pushToLog(user, 'pays', '', '', `100`);
                break;
            case 1:
                user.money += 100
                pushToLog(user, 'receives', '', '', `100`);
                break;
            case 2:
                board.players.forEach((player: Player) => {
                    if(user.name !== player.name) {
                        player.money -= 10
                        user.money += 10
                        pushToLog(user, 'pays', 'to', player.name, `10`);
                    }
                });
                break;
            case 3:
                board.players.forEach((player: Player) => {
                    if(user.name !== player.name) {
                        player.money += 10
                        user.money -= 10
                        pushToLog(user, 'receives', 'from', player.name, `10`);
                    }
                });
                break;
            case 4:
                board.players.forEach((player: Player) => {
                    const ran = Math.ceil(Math.random() * 41);
                    if(!checkJail(player)) player.location = ran;
                    const square = getSquare(player);
                    pushToLog(player, 'is forced to', square?.name, '', '')
                });
                break;
            case 5:
                board.players.forEach((player: Player) => {
                    if(user.name !== player.name) {
                        locationEventGoToJail(player);
                    }
                });
                break;
            case 6:
                locationEventGoToJail(user);
                break;
            case 7:
                user.cards.push('get out of jail');
                pushToLog(user, 'receives', 'escape confinement card', '', '');
                break;
        }
        setLocalPlayer(user);
        syncPlayer(user);
        toggleLuckCards();
    }

    const locationEventChance = (type: string) => {
        const ran = Math.floor(Math.random() * 8);
        setLuckCards({show: true, type: type, number: ran});
    }
    
    const locationEventController = (user: Player) => {
        if(!localPlayer.dice1.hasRolled || !localPlayer.dice2.hasRolled) return;
        
        const exceptions = [
            user.location === 1,
            user.location === 11,
            user.location === 21,
            user.location === 31,
        ];
        const chances = [
            user.location === 8,
            user.location === 23,
            user.location === 37,
        ];
        const chests = [
            user.location === 3,
            user.location === 18,
            user.location === 34,
        ];

        if(exceptions.some(Boolean)) return locationEventSpecial(user);
        else if(chances.some(Boolean)) return locationEventChance('chance');
        else if(chests.some(Boolean)) return locationEventChance('chest');
        else locationEventMerch(user);
    }

    return(
        <div className="game-screen" >
            {
                <GameBoard 
                    gameBoard={gameBoard}
                    /*buyProperty={placeHouse}*/
                    localPlayer={localPlayer}
                    rollDice={rollDice} 
                    changeTurn={changeTurn}
                    jailedPlayers={gameBoard.jail}
                    locationEventLeaveJail={locationEventLeaveJail}
                    checkJail={checkJail}
                    checkIfStation={checkIfStation}
                    checkIfUtility={checkIfUtility}
                    checkForSet={checkForSet}
                    pushToLog={forceLog}
                />
            }
            {canBuy 
            && <BuyPrompt 
                    buyProperty={locationEventBuy} 
                    dontBuy={closeBuyPrompt}
                    localPlayer={localPlayer}
                    players={gameBoard.players}
                    inspectionTarget={buyableSquare}
                    checkIfStation={checkIfStation} 
                    checkIfUtility={checkIfUtility}
                    buyType="property"
                />
            }
            {luckCards.show
            && <ChancePrompt
                    localPlayer={localPlayer}
                    luckCards={luckCards}
                    useChance={useChance}
                    useChest={useChest}
                />
            }
            {gameover
            && <Gameover localPlayer={localPlayer} />}
            <Log gameLog={gameLog} />
        </div>
    )
}

export default Game;

// next step => specify squares
// square types => irregular { go, jail, free, go to jail } <= complete
//                 card spots { community, chance }
//                 normal { properties } add full set bonus with 0 props <= complete
//                 normal { stations } <= complete
//                 normal {  utility}  <= complete
// next step => normal { properties } place house/hotels only when full set <= complete
// next step => fill in square information <= complete
//
// next step => allow selling deeds/props <= complete
//
// next step => add overlay when hovering squares for extra info
//              properties <= complete
//              stations <= complete
//              utility <= complete
//              special <= complete
//              chance  <= complete
//              tax <= complete
//              improve buy prompt <= started(onhold)
//
// next step => add chance/chest cards <= complete(could add more)
//              add function to get out of jail free card <= complete
//              add correct text to cards 
//
// next step => add icons to board spots and update user icons <= complete
//              stagger moving
//
// next step => add player interface <= complete
//              statistic screen <= complete
//              improve end turn button <= complete
//              change dice <= dunno
// next step => add sorting function for player owned properties <= complete
//
// next step => add win/lose conditions <= complete
//              add win screen <= complete
//
// things to add to log =>  { use get out of jail card } <= complete
//                          { selling properties/houses} <= complete
//                          { placing properties } <= complete
//
// next step => replace currency symbols !important