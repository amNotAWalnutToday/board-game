import React, { useState } from 'react';
import { Square, Player } from '../../Game';
import CompanyCard from '../cards/CompanyCard';
import PropertyCard from '../cards/PropertyCard';
import StationCard from '../cards/StationCard';

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
    const [sellAmount, setSellAmount] = useState<number>(1);
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
                        <span className='money'> 
                            <span className="m-symbol"/> {localPlayer.money}
                        </span>
                    </p>
                    {inspectionTarget
                    && inspectionTarget?.properties < 5
                    && inspectionTarget?.properties > 0
                    && !checkIfStation(inspectionTarget?.number)
                    && !checkIfUtility(inspectionTarget?.number)
                        ? 
                        <div className='amount-range'>
                            <label>{sellAmount}</label>
                            <input
                                type="range"
                                min={0}
                                max={inspectionTarget?.properties}
                                value={sellAmount}
                                onChange={(e) => setSellAmount(Number(e.target.value))}
                            />
                            <label>{inspectionTarget?.properties}</label>
                        </div>
                        : undefined
                    }
                    <div className="btn-group">
                        <button 
                            className="dont-buy-btn" 
                            onClick={() => {
                                    for(let i = sellAmount; i > 0; i--){
                                        buyProperty(inspectionTarget)
                                    }
                                    setSellAmount(1);
                                }
                            } 
                        >
                            { (buyType === 'sell' 
                            && inspectionTarget
                            && inspectionTarget?.properties < 1)
                            || checkIfStation(inspectionTarget?.number)
                            || checkIfUtility(inspectionTarget?.number)
                                ? <span>Sell Property 
                                    <span className="m-symbol"/>
                                        {inspectionTarget?.cost.deed 
                                            ? inspectionTarget?.cost.deed / 2
                                            : undefined
                                        }
                                </span>
                                : inspectionTarget
                                && inspectionTarget?.properties < 5
                                    ? <span>
                                        Sell House
                                        <span className="m-symbol"/>
                                            {inspectionTarget?.cost.house
                                                ? (inspectionTarget?.cost.house / 2) * sellAmount
                                                : undefined
                                            }
                                    </span>
                                    : <span>
                                        Sell Hotel 
                                        <span className="m-symbol"/>
                                            {inspectionTarget?.cost.hotel
                                                ? inspectionTarget?.cost.hotel / 2
                                                : undefined
                                            }
                                    </span>
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
