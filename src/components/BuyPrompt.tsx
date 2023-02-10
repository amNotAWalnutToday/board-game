import { Square } from '../Game';
import CompanyCard from './cards/CompanyCard';
import PropertyCard from './cards/PropertyCard';
import StationCard from './cards/StationCard';

type Props = {
    buyProperty: () => Square | undefined;
    dontBuy: () => void
    inspectionTarget: Square | undefined;
    checkIfStation: (num: number | undefined) => Boolean;
    checkIfUtility: (num: number | undefined) => Boolean;
}

const BuyPrompt = (
    {
        buyProperty, 
        dontBuy, 
        inspectionTarget, 
        checkIfStation,
        checkIfUtility,
    }: Props) => {
    return (
        <>
            <div className="underlay" onClick={dontBuy} />
            <div className="buy-popup">
                <div className="buy-menu">
                    {checkIfStation(inspectionTarget?.number) 
                    ? <StationCard inspectionTarget={inspectionTarget} />
                    : checkIfUtility(inspectionTarget?.number) 
                        ? <CompanyCard inspectionTarget={inspectionTarget}/>
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
