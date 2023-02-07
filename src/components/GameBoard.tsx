import React, { useState, useEffect } from 'react';
import Player from './Player';
import Square from './Square';

type Props = {
    gameBoard: any,
}

const GameBoard = ( {gameBoard}: Props ) => {
    const [loading, setLoading] = useState(true);
    const mapSquares:any = () => {
        const board = {...gameBoard};
        const squares = board.squares;
        return squares.map((item:any, i:number) => {
            return <React.Fragment key={i}>
                <Square  players={gameBoard.players} square={item} index={i} />
            </React.Fragment>
        })
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [loading]);

    return(
        <div id="game-board">
            {!loading ? mapSquares() : undefined}
        </div>
    )
}

export default GameBoard;
