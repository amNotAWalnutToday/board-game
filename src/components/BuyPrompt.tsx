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

const BuyPrompt = (
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
                    ? <StationCard 
                        inspectionTarget={inspectionTarget} 
                        toggleInspect={undefined}
                    />
                    : checkIfUtility(inspectionTarget?.number) 
                        ? <CompanyCard 
                            inspectionTarget={inspectionTarget}
                            toggleInspect={undefined}
                        />
                        : <PropertyCard 
                            inspectionTarget={inspectionTarget} 
                            toggleInspect={undefined}
                        />
                    }
                    <p className='text-plain' >
                        Your Money: 
                        <span className='money'> <span className="m-symbol"/>
                            {localPlayer.money}
                        </span>
                    </p>
                    <div className="btn-group">
                        <button 
                            className="buy-btn" 
                            onClick={() => buyProperty(inspectionTarget)} 
                        >
                            { buyType === 'property'
                                ? <span>
                                    Buy Property 
                                    <span className="m-symbol"/>
                                    {inspectionTarget?.cost.deed}
                                </span>
                                : inspectionTarget 
                                && inspectionTarget?.properties < 4 
                                    ? <span>
                                        Place House 
                                        <span className="m-symbol"/>
                                        {inspectionTarget?.cost.house}
                                    </span>
                                    : <span>
                                        Place Hotel 
                                        <span className="m-symbol"/>
                                        {inspectionTarget?.cost.hotel}
                                    </span>
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
