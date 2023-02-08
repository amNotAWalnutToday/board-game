import { Player as PlayerTemplate } from '../Game';


type Props = {
    localPlayer: PlayerTemplate;
    index: number;
    player: PlayerTemplate;
    changeTurn: () => void;
}

const Player = ({localPlayer, index, player, changeTurn}: Props) => {
    return (
        <>
            <div className="player">
                {index}
            </div>
            {
                localPlayer.turnOrder === player.turnOrder
                ? <div className="player-overlay">
                    <ul>
                        <li>{player.name}</li>
                        <li>£{player.money}</li>
                        <li>properties:- {player.owned}</li>
                    </ul>
                    <button onClick={changeTurn} >End Turn</button>
                </div>
                : ''
            }
        </>
    )
}

export default Player;
