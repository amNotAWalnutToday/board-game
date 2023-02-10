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
            <div className={`player player-${player.turnOrder}`}>
                {index}
            </div>
        </>
    )
}

export default Player;
