import React, { useState, useEffect } from 'react';
import { Square as SquareType, Player } from '../Game';
import Square from './Square';
import Dice from './Dice';
import InspectSquare from './InspectSquare';
import Stats from './Stats';
import BuyPrompt from './BuyPrompt';
import SellPrompt from './SellPrompt';

type Props = {
    gameBoard: any,
    /*buyProperty: (square: SquareType | undefined) => void | undefined;*/
    localPlayer: Player,
    rollDice: any;/*not in use atm*/
    changeTurn: () => void,
    jailedPlayers: Player[];
    checkIfStation: (num: number | undefined) => boolean;
    checkIfUtility: (num: number | undefined) => boolean;
    checkForSet: (user: Player, group: string) => boolean;
}

type Mode = 'inspect' | 'place' | 'sell';

const GameBoard = ( 
    {
        gameBoard, 
        /*buyProperty,*/ 
        localPlayer, 
        rollDice,
        changeTurn, 
        jailedPlayers,
        checkIfStation,
        checkIfUtility,
        checkForSet,
    }: Props ) => {
    const [loading, setLoading] = useState(true);
    const [showStats, setShowStats] = useState(true);
    const [cursorMode, setCursorMode] = useState<Mode>('inspect');
    const [showInspect, setShowInspect] = useState<Boolean>(false);
    const [showBuyHouse, setShowBuyHouse] = useState<Boolean>(false);
    const [showSellHouse, setShowSellHouse] = useState<Boolean>(false);
    const [inspectionTarget, setInspectionTarget] = useState<SquareType>()

    const toggleStats = () => setShowStats(!showStats);
    const toggleInspect = () => setShowInspect(!showInspect);
    const toggleBuyHouse = () => setShowBuyHouse(!showBuyHouse);
    const toggleSellHouse = () => setShowSellHouse(!showSellHouse);
    const toggleMode = (mode: Mode) => setCursorMode(mode);

    const inspectSquare = (e:any, square: SquareType) => {
        if(e.target.value === "end-turn" || cursorMode !== 'inspect') return;
        if((inspectionTarget?.name === square.name && showInspect)
        || (!showInspect)) toggleInspect();
        else {
            toggleInspect();
            setTimeout(() => setShowInspect(true), 50);
        }
        setInspectionTarget(square);
    }

    const placeOnSquare = (e:any, square: SquareType) => {
        if(e.target.value === "end-turn" || cursorMode !== 'place') return;
        if(localPlayer.name !== square.ownedBy || !square.group) return;
        if(square.properties >= 5) return;
        if(inspectionTarget?.name === square.name) toggleBuyHouse();
        setInspectionTarget(square);
    }

    const sellFromSquare = (e:any, square: SquareType) => {
        if(e.target.value === "end-turn" || cursorMode !== 'sell') return;
        if(localPlayer.name !== square.ownedBy) return;
        if(inspectionTarget?.name === square.name) toggleSellHouse();
        setInspectionTarget(square);
    }

    const sellHouse = (square: SquareType | undefined) => {
        if(!square) return;
        if(square.properties === 0 
        || checkIfStation(square.number)
        || checkIfUtility(square.number)) {
            for(let i = 0; i < localPlayer.owned.length; i++) {
                if(square.name === localPlayer.owned[i].name) {
                    localPlayer.owned.splice(i, 1);
                    square.ownedBy = 'market';
                }
            }
            localPlayer.money += square.cost.deed / 2;
        } else if (square.properties > 0) {
            square.properties -= 1;
            localPlayer.money += square.cost.house / 2;
        }
        toggleSellHouse();
    }

    const placeHouse = (square: SquareType | undefined) => {
        if(!square || !square.group) return
        if(square.group && !checkForSet(localPlayer, square.group)) return;
        if(localPlayer.money > square.cost.house && square.properties < 4){
            square.properties += 1;
            localPlayer.money -= square.cost.house;
        } else if(localPlayer.money > square.cost.hotel && square.properties === 4) {
            square.properties += 1 
            localPlayer.money -= square.cost.hotel;
        }
        toggleBuyHouse();
        console.log(gameBoard.squares);
    }

    const mapSquares:any = () => {
        const board = {...gameBoard};
        const squares = board.squares;
        return squares.map((item:any, i:number) => {
            return <React.Fragment key={i}>
                <Square 
                    localPlayer={localPlayer} 
                    players={gameBoard.players} 
                    changeTurn={changeTurn}
                    cursorMode={cursorMode}
                    inspectSquare={inspectSquare}
                    placeOnSquare={placeOnSquare}
                    sellFromSquare={sellFromSquare}
                    square={item} 
                    index={i}
                 />
            </React.Fragment>
        })
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [loading]);

    return(
        <div id="game-board" >
            {mapSquares()}
            <div className="dice-holder">
                {!loading 
                && <Dice 
                        localPlayer={localPlayer} 
                        diceNum={1} 
                        rollDice={rollDice}
                    />
                }
                {!loading 
                && <Dice 
                        localPlayer={localPlayer} 
                        diceNum={2} 
                        rollDice={rollDice}
                    />
                }
            </div>
            {showInspect 
            && <InspectSquare 
                    inspectionTarget={inspectionTarget}
                    gameBoard={gameBoard}
                    jailedPlayers={jailedPlayers}
                    toggleInspect={toggleInspect}
                />
            }
            {showStats 
            && <Stats 
                    players={gameBoard.players} 
                />
            }
            {showBuyHouse
            && <BuyPrompt
                    buyProperty={placeHouse}
                    dontBuy={toggleBuyHouse}
                    localPlayer={localPlayer}
                    inspectionTarget={inspectionTarget}
                    checkIfStation={checkIfStation}
                    checkIfUtility={checkIfUtility}
                    buyType="building"
                />
            }
            {showSellHouse
            && <SellPrompt 
                    buyProperty={sellHouse}
                    dontBuy={toggleSellHouse}
                    localPlayer={localPlayer}
                    inspectionTarget={inspectionTarget}
                    checkIfStation={checkIfStation}
                    checkIfUtility={checkIfUtility}
                    buyType="sell"
                />
            }
            <div className="player-overlay">
                <ul>
                    <li>{localPlayer.name}</li>
                    <li className='text-green' >£{localPlayer.money}</li>
                    <li><strong>{cursorMode}</strong></li>
                </ul>
            </div>
            <button 
                    className="end-turn" 
                    onClick={changeTurn} 
                    value="end-turn" 
                >
                    End Turn
            </button>
            <button onClick={() => toggleMode('place')}  className="test" >place mode(temp)</button>
            <button onClick={() => toggleMode('sell')} className='test3' >Sell mode(temp)</button>
            <button onClick={() => toggleMode('inspect')} className='test4' >Inspect mode(temp)</button>
            <button onClick={toggleStats} className="test2">show stats</button>
        </div>
    )
}

export default GameBoard;
