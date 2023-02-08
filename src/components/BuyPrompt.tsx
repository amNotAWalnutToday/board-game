import { Square } from '../Game';

type Props = {
    buyProperty: () => Square | undefined;
    dontBuy: () => void
}

const BuyPrompt = ({buyProperty, dontBuy}: Props) => {
    return (
        <div>
            <button onClick={buyProperty} >Buy Property</button>
            <button onClick={dontBuy} >Don't Buy</button>
        </div>
    )
}

export default BuyPrompt;
