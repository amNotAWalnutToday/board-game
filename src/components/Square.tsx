import React, { useEffect, useState } from 'react';
import Player from './Player';

type Props = {
    players: any,
    square: any,
    index: number,
}

const Square = ({players, square, index}: Props) => {
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
                    <Player index={currentPlayers[i].turnOrder} />
                </div>
            )
        });
    }

    return (
        <div className="square">
            <div className="players">
                {mapPlayers()}
            </div>
            <div>
                {square.name}
            </div>
            {square.ownedBy}
            {`£${square.cost} `}
            {index + 1}
        </div>
    )
}

export default Square;
