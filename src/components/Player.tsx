import { Player as PlayerTemplate } from '../Game';

type Props = {
    localPlayer: PlayerTemplate;
    index: number;
    player: PlayerTemplate;
}

const Player = ({localPlayer, index, player}: Props) => {

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
                </div>
                : ''
            }
        </>
    )
}

export default Player;
