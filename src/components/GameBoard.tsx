import React, { useState, useEffect } from 'react';
import { Square as SquareType } from '../Game';
import Square from './Square';
import InspectSquare from './InspectSquare';

type Props = {
    gameBoard: any,
    localPlayer: any,
    changeTurn: () => void,
}

const GameBoard = ( {gameBoard, localPlayer, changeTurn}: Props ) => {
    const [loading, setLoading] = useState(true);
    const [showInspect, setShowInspect] = useState(false);
    const [inspectionTarget, setInspectionTarget] = useState<SquareType>()

    const toggleInspect = () => setShowInspect(!showInspect);

    const inspectSquare = (e:any, square: SquareType) => {
        if(e.target.value === "end-turn") return;
        toggleInspect();
        setInspectionTarget(square);
    }

    const mapSquares:any = () => {
        const board = {...gameBoard};
        const squares = board.squares;
        return squares.map((item:any, i:number) => {
            return <React.Fragment key={i}>
                <Square localPlayer={localPlayer} players={gameBoard.players} changeTurn={changeTurn} inspectSquare={inspectSquare} square={item} index={i} />
            </React.Fragment>
        })
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [loading]);

    return(
        <div id="game-board">
            {mapSquares()}
            {showInspect && <InspectSquare inspectionTarget={inspectionTarget} />}
        </div>
    )
}

export default GameBoard;
