import React, { useEffect, useState } from 'react'
import { Square as SquareType } from '../Game';
import PropertyCard from './cards/PropertyCard';
import SpecialCard from './cards/SpecialCard';
import StationCard from './cards/StationCard';
import CompanyCard from './cards/CompanyCard';
import TaxCard from './cards/TaxCard';
import ChestCard from './cards/ChestCard';

type Props = {
    inspectionTarget: SquareType | undefined;
    gameBoard: any;
    jailedPlayers: object[];
    toggleInspect: () => void,
}

const InspectSquare = ( 
    {
        inspectionTarget, 
        gameBoard, 
        jailedPlayers,
        toggleInspect,
    }: Props ) => {
    const [inspectType, setInspectType] = useState<string>();

    const getSquareType = () => {
        const num = inspectionTarget?.number; 
        const special = [
            num === 1,
            num === 11,
            num === 21,
            num === 31,
        ];
        const chance = [
            num === 3,
            num === 8,
            num === 18,
            num === 23,
            num === 34,
            num === 37,
        ];

        const tax = [
            num === 5,
            num === 39,
        ];

        const station = [
            num === 6,
            num === 16,
            num === 26,
            num === 36,
        ];

        const company = [
            num === 13,
            num === 29,
        ];

        if(special.some(Boolean)) setInspectType("special");
        else if(chance.some(Boolean)) setInspectType("chance");
        else if(tax.some(Boolean)) setInspectType("tax");
        else if(station.some(Boolean)) setInspectType("station");
        else if(company.some(Boolean)) setInspectType("company");
        else setInspectType("property");
    }

    useEffect(() => {
        getSquareType();
        /*eslint-disable-next-line*/
    }, []);

    return (
        <>
            <div className="inspect" >
                {inspectType === 'property' 
                && <PropertyCard 
                        inspectionTarget={inspectionTarget}
                        toggleInspect={toggleInspect} 
                    />
                }
                {inspectType === 'special' 
                && <SpecialCard 
                        inspectionTarget={inspectionTarget}
                        gameBoard={gameBoard}
                        jailedPlayers={jailedPlayers}
                        toggleInspect={toggleInspect}
                    />
                }
                {inspectType === 'station'
                && <StationCard 
                        inspectionTarget={inspectionTarget}
                        toggleInspect={toggleInspect}   
                    />
                }
                {inspectType === 'company'
                && <CompanyCard 
                        inspectionTarget={inspectionTarget} 
                        toggleInspect={toggleInspect} 
                    />
                }
                {inspectType === 'tax'
                && <TaxCard 
                        inspectionTarget={inspectionTarget}
                        toggleInspect={toggleInspect} 
                    />
                }
                {inspectType === 'chance'
                && <ChestCard
                        inspectionTarget={inspectionTarget}
                        toggleInspect={toggleInspect}    
                    /> 
                }
            </div>
        </>
    )
}

export default InspectSquare;
