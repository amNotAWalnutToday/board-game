import React, { useState } from 'react';
import { Square, Player } from '../../Game';
import CompanyCard from '../cards/CompanyCard';
import PropertyCard from '../cards/PropertyCard';
import StationCard from '../cards/StationCard';

type Props = {
    buyProperty: (square: Square | undefined) => Square | void | undefined;
    dontBuy: () => void
    localPlayer: Player;
    players: Player[];
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
        players,
        inspectionTarget, 
        checkIfStation,
        checkIfUtility,
        buyType,
    }: Props) => {
    const [buyAmount, setBuyAmount] = useState<number>(1);
    
    const checkForGroup = (user: Player, group: string | null) => {
        let hasGroup;
        user.owned.forEach((square: Square) => {
            if(square.group === group) return hasGroup = true;
        });
        return hasGroup;
    }

    const checkEachPlayerForGroup = (group: string | null) => {
        const hasGroup:any = [];
        players.forEach((player: Player) => {
            if(checkForGroup(player, group)) hasGroup.push(player); 
        });
        return hasGroup.length ? hasGroup : false;
    }

    const mapGroups = (group: string | null) => {
        const hasGroup = checkEachPlayerForGroup(group);
        if(hasGroup.length) return hasGroup.map((item: Player, i: number) => {
            return <span 
                key={i}
                className={
                    item.name === localPlayer.name 
                        ? 'money' 
                        : 'tax'
                } 
            >
                {item.name}{hasGroup.length - 1 === i ? '' : ', '} 
            </span>
        });
    }

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
                    {!checkIfStation(inspectionTarget?.number) 
                    && !checkIfUtility(inspectionTarget?.number) 
                    ? <p className='text-plain' >
                        Same Set Owners: {' '}
                        {inspectionTarget 
                        && checkEachPlayerForGroup(inspectionTarget?.group) 
                        ? mapGroups(inspectionTarget?.group)
                        : 'No Players'}
                    </p>
                    : undefined
                    }
                    {inspectionTarget 
                    && inspectionTarget?.ownedBy !== 'market'
                    && inspectionTarget?.properties !== 4
                        ?<div className='amount-range'>
                            <label>{buyAmount}</label>
                            <input
                                type="range"
                                min={0}
                                max={inspectionTarget && 5 - inspectionTarget?.properties}
                                value={buyAmount}
                                onChange={(e) => setBuyAmount(Number(e.target.value))}
                            />
                            <label>{inspectionTarget && 5 - inspectionTarget?.properties}</label>
                        </div>
                        : undefined
                    }
                    <div className="btn-group">
                        <button 
                            className="buy-btn" 
                            onClick={() => {
                                for(let i = buyAmount; i > 0; i--){
                                    buyProperty(inspectionTarget)
                                }
                                setBuyAmount(1);
                            }
                        } 
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
                                        {inspectionTarget?.cost.house * buyAmount}
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
