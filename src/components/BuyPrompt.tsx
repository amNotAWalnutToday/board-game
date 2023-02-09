import { Square } from '../Game';
import PropertyCard from './PropertyCard';

type Props = {
    buyProperty: () => Square | undefined;
    dontBuy: () => void
    inspectionTarget: Square | undefined;
}

const BuyPrompt = ({buyProperty, dontBuy, inspectionTarget}: Props) => {
    return (
        <>
            <div className="underlay" onClick={dontBuy} />
            <div className="buy-popup">
                <div className="buy-menu">
                    <PropertyCard inspectionTarget={inspectionTarget} />
                    <div className="btn-group">
                        <button 
                            className="buy-btn" 
                            onClick={buyProperty} 
                        >
                            Buy Property £{inspectionTarget?.cost.deed}
                        </button>
                        <button 
                            className="dont-buy-btn" 
                            onClick={dontBuy} 
                        >
                            Don't Buy
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyPrompt;
