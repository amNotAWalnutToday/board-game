import React, { useState, useEffect } from 'react';
import Square from './Square';

type Props = {
    gameBoard: any,
    localPlayer: any,
    changeTurn: () => void,
}

const GameBoard = ( {gameBoard, localPlayer, changeTurn}: Props ) => {
    const [loading, setLoading] = useState(true);
    const mapSquares:any = () => {
        const board = {...gameBoard};
        const squares = board.squares;
        return squares.map((item:any, i:number) => {
            return <React.Fragment key={i}>
                <Square localPlayer={localPlayer} players={gameBoard.players} changeTurn={changeTurn} square={item} index={i} />
            </React.Fragment>
        })
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [loading]);

    return(
        <div id="game-board">
            {mapSquares()}
        </div>
    )
}

export default GameBoard;