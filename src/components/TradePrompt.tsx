import { Player, Square, Trader } from '../Game';
import PlayerCard from './cards/PlayerCard';

type Props = {
    sender: Trader;
    receiver: Trader;
    toggleTrade: () => void;
    acceptTrade: () => void;
    selectItemForTrade: (user: Player, item: Square) => void;
    removeItemFromTrade: (user: Player, item: Square) => void;
    checkTradeForItem: (user: Player, item: Square) => boolean;
}

const TradePrompt = ( 
    {
        sender, 
        receiver, 
        toggleTrade, 
        acceptTrade,
        selectItemForTrade,
        removeItemFromTrade,
        checkTradeForItem
    }: Props ) => {
    return (
        <>
            <div className="underlay"/>
            <div className="prompt">
                <div className="prompt-menu">
                    <h4>Highlighted Properties Will Be Traded! </h4>
                    <div className="stats">
                        <div className="player-stats">
                            <PlayerCard 
                                player={sender.player} 
                                selectItemForTrade={selectItemForTrade}
                                removeItemFromTrade={removeItemFromTrade}
                                checkTradeForItem={checkTradeForItem}
                            />
                        </div>
                        <div className="player-stats">
                            <PlayerCard 
                                player={receiver.player} 
                                selectItemForTrade={selectItemForTrade}
                                removeItemFromTrade={removeItemFromTrade}
                                checkTradeForItem={checkTradeForItem}
                            />
                        </div>
                    </div>
                    <div className="trade-btn-group">
                        <button 
                            className='buy-btn'
                            onClick={acceptTrade}    
                        >
                            Accept
                        </button>
                        <button 
                            className='dont-buy-btn' 
                            onClick={toggleTrade}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TradePrompt;
