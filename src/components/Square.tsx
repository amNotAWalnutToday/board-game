import React, { useEffect, useState } from 'react';

type Player = {
    [index: number]: {
        name: string,
        location: number,
        turnOrder: number,
        dice1: number,
        dice2: number,
        money: number,
        cards: [],
        prize: [],
    }
}

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
                    <p>{item.name}</p>
                </div>
            )
        });
    }

    return (
        <div className="square">
            {mapPlayers()}
            {square.ownedBy}
            {index + 1}
        </div>
    )
}

export default Square;
