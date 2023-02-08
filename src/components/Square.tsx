import React, { useEffect, useState } from 'react';
import Player from './Player';

type Props = {
    localPlayer: any,
    players: any,
    changeTurn: () => void,
    square: any,
    index: number,
}

const Square = ({localPlayer, players, changeTurn, square, index}: Props) => {
    const [currentPlayers, setCurrentPlayers] = useState<any>([]);

    useEffect(() => {
        if(!players) return;
        const playersHere:object[] = [];
        players.forEach((player: any) => {
            if(player.location === square.number) {
                playersHere.push(player)
            }
        });
        setCurrentPlayers(playersHere);
    }, [players, square]);

    const mapPlayers = () => {
        return currentPlayers.map((item:any, i:number) => {
            return(
                <div key={i}>
                    <Player  localPlayer={localPlayer} player={item} changeTurn={changeTurn} index={currentPlayers[i].turnOrder} />
                </div>
            )
        });
    }

    return (
        <div className={`square square-${index}`}>
            <div className="players">
                {mapPlayers()}
            </div>
            <div>
                {square.name}
            </div>
            {square.ownedBy}
            {`£${square.cost} `}
        </div>
    )
}

export default Square;
