import { Player, Square, Trader } from '../../Game';
import PlayerCard from '../cards/PlayerCard';

type Props = {
    sender: Trader;
    receiver: Trader;
    toggleTrade: () => void;
    acceptTrade: () => void;
    selectMoneyToTrade: ((e: any, user: Player) => void) | undefined;
    selectItemForTrade: (user: Player, item: Square) => void;
    removeItemFromTrade: (user: Player, item: Square) => void;
    checkTradeForItem: (user: Player, item: Square) => boolean;
    checkLocalIfSenderOrReceiver: (() => string | undefined) | undefined;
}

const TradePrompt = ( 
    {
        sender, 
        receiver, 
        toggleTrade, 
        acceptTrade,
        selectMoneyToTrade,
        selectItemForTrade,
        removeItemFromTrade,
        checkTradeForItem,
        checkLocalIfSenderOrReceiver
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
                                moneyTradeOffer={sender.offer.money}
                                selectMoneyToTrade={selectMoneyToTrade}
                                selectItemForTrade={selectItemForTrade}
                                removeItemFromTrade={removeItemFromTrade}
                                checkTradeForItem={checkTradeForItem}
                            />
                            {checkLocalIfSenderOrReceiver
                                ? !sender.accepted
                                    ? <p className='tax money' >Not Accepted</p>
                                    : <p className='money'>Accepted</p>
                                : undefined
                            }
                        </div>
                        <div className="player-stats">
                            <PlayerCard 
                                player={receiver.player}
                                moneyTradeOffer={receiver.offer.money} 
                                selectMoneyToTrade={selectMoneyToTrade}
                                selectItemForTrade={selectItemForTrade}
                                removeItemFromTrade={removeItemFromTrade}
                                checkTradeForItem={checkTradeForItem}
                            />
                            {checkLocalIfSenderOrReceiver
                                ? !receiver.accepted
                                    ? <p className='tax money' >Not Accepted</p>
                                    : <p className='money'>Accepted</p>
                                : undefined
                            }
                        </div>
                    </div>
                    <div className="trade-btn-group">
                        <button 
                            className='buy-btn'
                            onClick={acceptTrade}   
                            disabled={
                                checkLocalIfSenderOrReceiver
                                && !checkLocalIfSenderOrReceiver()
                                    ? true
                                    : false
                            } 
                        >
                            Accept
                        </button>
                        {checkLocalIfSenderOrReceiver
                            ? (checkLocalIfSenderOrReceiver() === 'sender'
                            && !sender.accepted)
                            || (checkLocalIfSenderOrReceiver() === 'receiver'
                            && !receiver.accepted)
                                ? <p className='tax' >Not Accepted</p>
                                : !checkLocalIfSenderOrReceiver()
                                    ? <p className='tax' >Not Your Trade</p>
                                    : <p className='money'>Accepted</p>
                            : undefined
                        }
                        <button 
                            className='dont-buy-btn' 
                            onClick={toggleTrade}
                            disabled={
                                checkLocalIfSenderOrReceiver
                                && !checkLocalIfSenderOrReceiver()
                                    ? true
                                    : false
                            } 
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
