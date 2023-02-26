import { Player, board } from '../Game';
import PlayerCard from './cards/PlayerCard';

type Props = {
    gameBoard: board | undefined;
    players: Player[];
    sendTrade: undefined | ((receiver: Player | undefined) => void);
    shouldClose: boolean | undefined;
}

const Stats = ( {gameBoard, players, sendTrade, shouldClose}: Props ) => {
    const mapPlayerStats = () => {
        return players.map((item, i) => {
            return (
                <div key={i} className="player-stats" >
                    <PlayerCard 
                        player={item} 
                        selectItemForTrade={undefined}
                        removeItemFromTrade={undefined}
                        checkTradeForItem={undefined}
                    />
                    {gameBoard 
                    && 
                    <button 
                        className='trade-btn' 
                        onClick={sendTrade ? () => sendTrade(item) : undefined}
                        disabled={gameBoard.turn === item.name
                            ? true
                            : false
                        }    
                    >
                        Trade
                    </button>}
                </div>
            )
        })
    }

    return (
        <div 
            className={
                players.length < 2 && !shouldClose
                    ? 'winner' 
                    : shouldClose 
                        ? 'stats close'
                        : 'stats'
            } 
        >
            {mapPlayerStats()}
        </div>
    )
}

export default Stats;
