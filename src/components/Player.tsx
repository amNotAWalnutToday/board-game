import { Player as PlayerTemplate } from '../Game';


type Props = {
    localPlayer: PlayerTemplate;
    index: number;
    player: PlayerTemplate;
    checkJail: (user: PlayerTemplate) => boolean | undefined;
    changeTurn: () => void;
}

const Player = ({localPlayer, index, player, checkJail, changeTurn}: Props) => {
    return (
        <div 
            className={`player player-${player.turnOrder} logo-${player.logo}
            ${checkJail(player) ? 'logo-jail' : '' }
            ${player.turnOrder === localPlayer.turnOrder 
                ? 'logo-current-turn'
                : ''}
            `}
        />
    )
}

export default Player;
