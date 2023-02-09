import React, { useEffect, useState } from 'react';
import { Square as SquareType } from '../Game';
import Player from './Player';

type Props = {
    localPlayer: any,
    players: any,
    changeTurn: () => void,
    inspectSquare: (e:any, square: SquareType) => void,
    square: any,
    index: number,
}

const Square = ({localPlayer, players, changeTurn, inspectSquare, square, index}: Props) => {
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

    const mapProperties = () => {
        const props = [];
        for(let i = 0; i < square.properties; i++) props.push(i);
        return props.length < 5
            ? props.map((item, i) => {
                return <div key={i} className="house" ></div>
            })
            : <div className="hotel"></div>
    }

    return (
        <div className={`square square-${index}`} onClick={(e) => inspectSquare(e, square)} >
            <p>{square.name}</p>
            <div className="players">
                {mapPlayers()}
            </div>
            {square.ownedBy === "market" || !square.ownedBy
            ?<p>
                {square.cost.deed > 0 && square.ownedBy === 'market' 
                    ? `£${square.cost.deed} ` 
                    : ''}
            </p>
            : <div className="house-group" >{mapProperties()}</div>}
            <div className={`square-name ${square.group}`} >

            </div>
        </div>
    )
}

export default Square;
