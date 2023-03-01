import { Player as PlayerTemplate } from '../Game';


type Props = {
    localPlayer: PlayerTemplate;
    index: number;
    player: PlayerTemplate;
    checkJail: (user: PlayerTemplate) => boolean | undefined;
    changeTurn: () => void;
    currentPlayers: PlayerTemplate[];
}

const Player = ({localPlayer, index, player, checkJail, changeTurn, currentPlayers}: Props) => {
    return (
        <div 
            className={`player player-${player.turnOrder} logo-${player.logo}
            ${currentPlayers.length === 1 ? 'logo-solo' : ''}
            ${checkJail(player) ? 'logo-jail' : '' }
            ${player.turnOrder === localPlayer.turnOrder 
                ? 'logo-current-turn'
                : ''}
            `}
        />
    )
}

export default Player;
