import React, { useState, useEffect, FC } from 'react';

type Props = {
    gameBoard: any,
}

const GameBoard = ( {gameBoard}: Props ) => {
    const [loading, setLoading] = useState(true);
    const mapSquares:any = () => {
        console.log(gameBoard);
        const board = {...gameBoard};
        const squares = board.squares;
        console.log('squares', squares);
        
        return squares.map((item:any, i:number) => {
            return <div key={i} className="square">{item.ownedBy}{i}</div>
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
