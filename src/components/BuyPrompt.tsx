import { Square } from '../Game';
import PropertyCard from './cards/PropertyCard';
import StationCard from './cards/StationCard';

type Props = {
    buyProperty: () => Square | undefined;
    dontBuy: () => void
    inspectionTarget: Square | undefined;
}

const BuyPrompt = ({buyProperty, dontBuy, inspectionTarget}: Props) => {
    const checkIfStation = () => {
        const num = inspectionTarget?.number;
        return num === 6 || num === 16 || num === 26 || num === 36
            ? true
            : false;
    }

    return (
        <>
            <div className="underlay" onClick={dontBuy} />
            <div className="buy-popup">
                <div className="buy-menu">
                    {checkIfStation() 
                    ? <StationCard inspectionTarget={inspectionTarget} />
                    : <PropertyCard inspectionTarget={inspectionTarget} />}
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
