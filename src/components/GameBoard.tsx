import React, { useState, useEffect } from 'react';
import { Square as SquareType } from '../Game';
import Square from './Square';
import InspectSquare from './InspectSquare';
import BuyPrompt from './BuyPrompt';

type Props = {
    gameBoard: any,
    /*buyProperty: (square: SquareType | undefined) => void | undefined;*/
    localPlayer: any,
    changeTurn: () => void,
    jailedPlayers: object[];
    checkIfStation: (num: number | undefined) => boolean;
    checkIfUtility: (num: number | undefined) => boolean;
}

type Mode = 'inspect' | 'place';

const GameBoard = ( 
    {
        gameBoard, 
        /*buyProperty,*/ 
        localPlayer, 
        changeTurn, 
        jailedPlayers,
        checkIfStation,
        checkIfUtility,
    }: Props ) => {
    const [loading, setLoading] = useState(true);
    const [cursorMode, setCursorMode] = useState<Mode>('inspect');
    const [showInspect, setShowInspect] = useState<Boolean>(false);
    const [showBuyHouse, setShowBuyHouse] = useState<Boolean>(false);
    const [inspectionTarget, setInspectionTarget] = useState<SquareType>()

    const toggleInspect = () => setShowInspect(!showInspect);
    const toggleBuyHouse = () => setShowBuyHouse(!showBuyHouse);
    const toggleMode = () => {
        cursorMode === 'inspect' 
            ? setCursorMode('place')
            : setCursorMode('inspect');
        console.log(cursorMode);
    }

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
        if(e.target.value === "end-turn") return;
        if(localPlayer.name !== square.ownedBy) return;
        if(square.properties >= 5) return;
        if(inspectionTarget?.name === square.name) toggleBuyHouse();
        setInspectionTarget(square);
    }

    const placeHouse = (square: SquareType | undefined) => {
        if(!square) return
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
        <div id="game-board">
            {mapSquares()}
            {showInspect 
            && <InspectSquare 
                    inspectionTarget={inspectionTarget}
                    gameBoard={gameBoard}
                    jailedPlayers={jailedPlayers}
                />
            }
            {showBuyHouse
            && <BuyPrompt
                    buyProperty={placeHouse}
                    dontBuy={toggleBuyHouse}
                    inspectionTarget={inspectionTarget}
                    checkIfStation={checkIfStation}
                    checkIfUtility={checkIfUtility}
                    buyType="building"
                />
            }
            <button onClick={toggleMode} >place mode(temp)</button>
        </div>
    )
}

export default GameBoard;
