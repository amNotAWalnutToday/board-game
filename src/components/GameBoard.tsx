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
    rollDice: any;
    changeTurn: () => void,
    jailedPlayers: Player[];
    locationEventLeaveJail: (user: Player) => void;
    checkJail: (user: Player) => boolean | undefined;
    checkIfStation: (num: number | undefined) => boolean;
    checkIfUtility: (num: number | undefined) => boolean;
    checkForSet: (user: Player, group: string) => boolean;
    pushToLog: (user: Player, action: string, output:string, receiver: string, money: string) => void;
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
        locationEventLeaveJail,
        checkJail,
        checkIfStation,
        checkIfUtility,
        checkForSet,
        pushToLog,
    }: Props ) => {
    const [loading, setLoading] = useState<boolean>(true);

    const [showStats, setShowStats] = useState<boolean>(true);
    const [shouldClose, setShouldClose] = useState<boolean>(false);

    const [cursorMode, setCursorMode] = useState<Mode>('inspect');
    const [showInspect, setShowInspect] = useState<Boolean>(false);
    const [showBuyHouse, setShowBuyHouse] = useState<Boolean>(false);
    const [showSellHouse, setShowSellHouse] = useState<Boolean>(false);

    const [inspectionTarget, setInspectionTarget] = useState<SquareType>()

    const toggleStats = () => { 
        setShowStats(!showStats);
        setShouldClose(false);
    }
    const toggleShouldClose = () => {
        setShouldClose(true);
        setTimeout(() => toggleStats(), 400);
    }
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

            pushToLog(
                localPlayer, 
                'for, ', 
                square.name, 
                'was sold', 
                `${square.cost.deed / 2}`
            );
        } else if (square.properties > 0) {
            square.properties -= 1;
            localPlayer.money += square.cost.house / 2;
            
            pushToLog(
                localPlayer, 
                'for, ', 
                `at ${square.name}`, 
                'some land was sold', 
                `${square.cost.house / 2}`
            );
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

        pushToLog(
            localPlayer, 
            'for, ', 
            square.name, 
            'was expanded', 
            `${square.cost.house}`
        );
        toggleBuyHouse();
    }

    const mapSquares:any = () => {
        const board = {...gameBoard};
        const squares = board.squares;
        return squares.map((item:any, i:number) => {
            return <React.Fragment key={i}>
                <Square 
                    localPlayer={localPlayer} 
                    players={gameBoard.players}
                    checkJail={checkJail}
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
        <div id="game-board" 
            className={localPlayer.location < 12 && localPlayer.location > 1 
                ? 'mondo'
                : localPlayer.location > 11 && localPlayer.location < 22
                    ? 'liyu'
                    : localPlayer.location > 21 && localPlayer.location < 32
                        ? 'ina'
                        : 'sume'} >
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
                    shouldClose={shouldClose}
                />
            }
            {showBuyHouse
            && <BuyPrompt
                    buyProperty={placeHouse}
                    dontBuy={toggleBuyHouse}
                    localPlayer={localPlayer}
                    players={gameBoard.players}
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
                    <li>
                        {cursorMode === 'inspect'
                        && <div className='inspect-btn selected'></div>
                        }
                        {cursorMode === 'place'
                        && <div className='place-mode-btn selected'>
                            <span className="house-group">
                                <span className='house' ></span>
                                <span className='house' ></span>
                                <span className='house' ></span>
                            </span>
                            <span className='break-line' ></span>
                            <span className='hotel' ></span>
                        </div>
                        }
                        {cursorMode === 'sell'
                        && <div className='sell-property-btn selected money'>
                            <span className="m-symbol"/>
                        </div>
                        }
                    </li>
                    <div>
                        <li>{localPlayer.name} <span className={`logo logo-${localPlayer.logo}`}></span></li>
                        <li className='money' ><span className="m-symbol"/>{localPlayer.money}</li>
                    </div>
                </ul>
            </div>
            <button 
                    className="end-turn" 
                    onClick={changeTurn} 
                    value="end-turn" 
                >
                    End Turn
            </button>
            {cursorMode === 'place' 
            ? undefined
            :<button 
                onClick={() => toggleMode('place')}  
                className="top place-mode-btn" 
                >
                    <span className="house-group">
                        <span className='house' ></span>
                        <span className='house' ></span>
                        <span className='house' ></span>
                        <span className='house' ></span>
                    </span>
                    <span className='break-line' ></span>
                    <span className='hotel' ></span>
            </button>}
            { cursorMode === 'sell'
            ? undefined
            :<button 
                onClick={() => toggleMode('sell')} 
                className='bottom sell-property-btn money' 
                >
                    <span className="m-symbol"/>
            </button>}
            {cursorMode === 'inspect' 
            ? undefined 
            :<button 
                onClick={() => toggleMode('inspect')} 
                className={cursorMode === 'sell' 
                    ? 'inspect-btn bottom' 
                    : 'inspect-btn top'
                } 
            />}
            <button 
                onClick={!showStats ? toggleStats : toggleShouldClose} 
                className="test2">
                    stats
            </button>
            {checkJail(localPlayer) && localPlayer.cards.length 
                ? <button 
                    className='use-card-btn'
                    onClick={() => {
                            locationEventLeaveJail(localPlayer);
                            localPlayer.cards.pop();
                            pushToLog(
                                localPlayer, 
                                'used card to leave', 
                                'Solitary Confinement','',''
                            );
                        }
                    }
                >
                    Get Out Of Jail
                </button>
                : undefined
            }
        </div>
    )
}

export default GameBoard;
