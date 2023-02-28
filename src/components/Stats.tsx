import { Player, board } from '../Game';
import PlayerCard from './cards/PlayerCard';

type Props = {
    gameBoard: board | undefined;
    players: Player[];
    sendTrade: undefined | ((receiver: Player | undefined) => void);
    shouldClose: boolean | undefined;
    yourName: string | undefined
}

const Stats = ( {gameBoard, players, sendTrade, shouldClose, yourName}: Props ) => {
    const mapPlayerStats = () => {
        return players.map((item, i) => {
            return (
                <div key={i} className="player-stats" >
                    <PlayerCard 
                        player={item} 
                        moneyTradeOffer={undefined}
                        selectMoneyToTrade={undefined}
                        selectItemForTrade={undefined}
                        removeItemFromTrade={undefined}
                        checkTradeForItem={undefined}
                    />
                    {gameBoard 
                    && 
                    <button 
                        className='trade-btn' 
                        onClick={sendTrade ? () => sendTrade(item) : undefined}
                        disabled={
                            (gameBoard.turn === item.name)
                            || (yourName && yourName !== gameBoard.turn)
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
