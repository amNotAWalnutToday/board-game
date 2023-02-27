import React, { useEffect, useState } from 'react';
import { Square as SquareType, Player as PlayerTemplate } from '../Game';
import Player from './Player';

type Props = {
    localPlayer: any,
    players: any,
    checkJail: (user: PlayerTemplate) => boolean | undefined,
    changeTurn: () => void,
    cursorMode: string,
    inspectSquare: (e:any, square: SquareType) => void,
    placeOnSquare: (e:any, square: SquareType) => void;
    sellFromSquare: (e:any, square: SquareType) => void;
    square: any,
    index: number,
}

const Square = ( 
    {
        localPlayer, 
        players, 
        checkJail,
        changeTurn,
        cursorMode, 
        inspectSquare, 
        placeOnSquare,
        sellFromSquare,
        square,
        index,
    }: Props) => {
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

    const checkIfOwned = () => {
        let isOwned = false;
        localPlayer.owned.forEach((property: SquareType) => {
            if(square.name === property.name) isOwned = true;
        });
        console.log(isOwned);
        return isOwned;
    }

    const mapPlayers = () => {
        return currentPlayers.map((item:any, i:number) => {
            return(
                <div key={i}>
                    <Player 
                        localPlayer={localPlayer} 
                        player={item} 
                        checkJail={checkJail}
                        changeTurn={changeTurn} 
                        index={currentPlayers[i].turnOrder} 
                    />
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
        <div 
            className={`square square-${index} ${checkIfOwned() ? 'highlight' : ''}`} 
            onClick={(e) => { 
                    switch(cursorMode) {
                        case 'inspect':
                            inspectSquare(e, square);
                            break;
                        case 'place':
                            placeOnSquare(e, square);
                            break;
                        case 'sell':
                            sellFromSquare(e, square);
                    }
                }
            }
        >
            <p>{square.name}</p>
            <div className="players">
                {mapPlayers()}
            </div>
            {square.ownedBy === "market" || !square.ownedBy
                ? square.cost.deed > 0 && square.ownedBy === 'market'
                    ? <p><span className="m-symbol"/>{square.cost.deed}</p>
                    : ''
                : <div className="house-group" >{mapProperties()}</div>}
            {/*specific exceptions*/}
            {square.number === 1 && <span className='samsara' />}
            {square.number === 21
                ? <p className='money'>
                    <span className="m-symbol"/>{square.cost.deed}
                </p>
                : undefined
            }
            {square.number === 5 || square.number === 39
                ? <p className='tax'><span className="m-symbol"/>{square.cost.deed}</p>
                : undefined
            }
            {square.number === 8
            || square.number === 23
            || square.number === 37
                ? <div className='wish-icon'></div>
                : undefined  
            }
            {square.number === 3 
                ? <div className='common-chest' ></div>
                : undefined}
            {square.number === 18 
                ? <div className='exquisite-chest' ></div>
                : undefined}
            {square.number === 34
                ? <div className='luxurious-chest' />
                : undefined}
            <div className={`square-name ${square.group}`} />
        </div>
    )
}

export default Square;
