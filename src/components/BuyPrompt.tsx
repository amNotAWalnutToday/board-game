import { Square } from '../Game';
import CompanyCard from './cards/CompanyCard';
import PropertyCard from './cards/PropertyCard';
import StationCard from './cards/StationCard';

type Props = {
    buyProperty: (square: Square | undefined) => Square | void | undefined;
    dontBuy: () => void
    inspectionTarget: Square | undefined;
    checkIfStation: (num: number | undefined) => Boolean;
    checkIfUtility: (num: number | undefined) => Boolean;
    buyType: string;
}

const BuyPrompt = (
    {
        buyProperty, 
        dontBuy, 
        inspectionTarget, 
        checkIfStation,
        checkIfUtility,
        buyType,
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
                            onClick={() => buyProperty(inspectionTarget)} 
                        >
                            { buyType === 'property'
                                ? `Buy Property £${inspectionTarget?.cost.deed}`
                                : inspectionTarget 
                                && inspectionTarget?.properties < 4 
                                    ? `Place House £${inspectionTarget?.cost.house}`
                                    : `Place Hotel £${inspectionTarget?.cost.hotel}`
                            }
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
