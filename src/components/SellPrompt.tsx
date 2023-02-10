import { Square, Player } from '../Game';
import CompanyCard from './cards/CompanyCard';
import PropertyCard from './cards/PropertyCard';
import StationCard from './cards/StationCard';

type Props = {
    buyProperty: (square: Square | undefined) => Square | void | undefined;
    dontBuy: () => void
    localPlayer: Player;
    inspectionTarget: Square | undefined;
    checkIfStation: (num: number | undefined) => Boolean;
    checkIfUtility: (num: number | undefined) => Boolean;
    buyType: string;
}

const SellPrompt = (
    {
        buyProperty, 
        dontBuy, 
        localPlayer,
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
                    <p className='text-plain' >
                        Your Money: 
                        <span className='money'> £{localPlayer.money}</span>
                    </p>
                    <div className="btn-group">
                        <button 
                            className="dont-buy-btn" 
                            onClick={() => buyProperty(inspectionTarget)} 
                        >
                            { buyType === 'sell' 
                            && inspectionTarget
                            && inspectionTarget?.properties < 1
                                ? `Sell Property £${inspectionTarget?.cost.deed 
                                    ? inspectionTarget?.cost.deed / 2
                                    : undefined}`
                                : inspectionTarget
                                && inspectionTarget?.properties < 5
                                    ? `Sell House 
                                        £${inspectionTarget?.cost.house 
                                            ? inspectionTarget?.cost.house / 2
                                            : undefined}`
                                    : `Sell Hotel £${inspectionTarget?.cost.hotel 
                                        ? inspectionTarget?.cost.hotel / 2
                                        : undefined}`
                            }
                        </button>
                        <button 
                            className="buy-btn" 
                            onClick={dontBuy} 
                        >
                            Don't Sell
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellPrompt;
