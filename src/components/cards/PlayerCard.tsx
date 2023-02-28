import { Player, Square, currency } from '../../Game';

type Props = {
    player: Player;
    moneyTradeOffer: number | undefined;
    selectMoneyToTrade: ((e: any, user: Player) => void) | undefined;
    selectItemForTrade: ((user: Player, item: Square) => void) | undefined;
    removeItemFromTrade: ((user: Player, item: Square) => void) | undefined;
    checkTradeForItem: ((user: Player, item: Square) => boolean) | undefined;
}

const PlayerCard = ( 
    {
        player, 
        moneyTradeOffer,
        selectMoneyToTrade,
        selectItemForTrade, 
        removeItemFromTrade,
        checkTradeForItem
    }: Props ) => {
    return (
        <>
            <p className={`card-name plain card-${player.logo}`} >
                {player.name}
                <span className={`logo logo-${player.logo}`} />
            </p>
            <p className='money'>
                <span className="m-symbol"/>{player.money}
            </p>
            <hr />
            <p className="player-owned">
                {checkTradeForItem 
                && <span>
                    {currency}{' '}
                    <input 
                        type="number" 
                        value={moneyTradeOffer} 
                        onChange={(e) => selectMoneyToTrade && selectMoneyToTrade(e, player)}
                    />
                </span> }
                {player.owned && player.owned.map((item, i) => {
                    return (
                        <span 
                            key={i} 
                            className={checkTradeForItem 
                                && checkTradeForItem(player, item)
                                    ? `${item.group ? item.group : 'plain'}`
                                    : `text-${item.group}` 
                            } 
                            onClick={
                                selectItemForTrade 
                                && checkTradeForItem 
                                && !checkTradeForItem(player, item)
                                    ? () => selectItemForTrade(player, item)
                                    : removeItemFromTrade
                                        ? () => removeItemFromTrade(player, item)
                                        : undefined
                            }
                        >
                            {item.name}
                        </span>
                    )
                })}
            </p>
        </>
    );
}

export default PlayerCard;