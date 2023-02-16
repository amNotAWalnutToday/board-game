import { Square as SquareType } from '../../Game';
import { currency } from '../../Game';

type Props = {
    inspectionTarget: SquareType | undefined;
    toggleInspect: any;
}

const PropertyCard = ( {inspectionTarget, toggleInspect}: Props ) => {
    return (
        <ul className={`property-card`} onClick={toggleInspect}>
            <li className={`card-name ${inspectionTarget?.group}`}>
                {inspectionTarget?.name}
            </li>
            <li>
                Rent
                <span>{currency}{inspectionTarget?.rent[0]}</span>
            </li>
            <li>
                Rent with Color Set
                <span>{currency}
                    {inspectionTarget 
                        ? inspectionTarget?.rent[0] * 2
                        : undefined}
                </span>
            </li>
            <li>
                <span>
                    Rent with{' '}
                    <span className="house-group">
                        <span className="house" ></span>
                    </span>
                </span>
                <span>{currency}{inspectionTarget?.rent[1]}</span>
            </li>
            <li>
                <span>
                    Rent with{' '}
                    <span className="house-group">
                        <span className="house" ></span>
                        <span className="house" ></span>
                    </span>
                </span>
                <span>{currency}{inspectionTarget?.rent[2]}</span>
            </li>
            <li>
                <span>
                    Rent with{' '}
                    <span className='house-group' >
                        <span className="house" ></span>
                        <span className="house" ></span>
                        <span className="house" ></span>
                    </span>
                </span>
                <span>{currency}{inspectionTarget?.rent[3]}</span>
            </li>
            <li>
                <span>
                    Rent with{' '}
                    <span className="house-group">
                        <span className="house" ></span>
                        <span className="house" ></span>
                        <span className="house" ></span>
                        <span className="house" ></span>
                    </span>
                </span>
                <span>{currency}{inspectionTarget?.rent[4]}</span>
            </li>
            <li>
                <span>
                    Rent with{' '}
                    <span className="house-group">
                        <span className="hotel" ></span>
                    </span>
                </span>
                <span>{currency}{inspectionTarget?.rent[5]}</span>
            </li>
            <hr />
            <li>
                House Cost 
                <span>{currency}{inspectionTarget?.cost.house} each</span>
            </li>
            <li>
                Hotel Cost 
                <span>
                    {currency}
                    {inspectionTarget 
                        ? inspectionTarget?.cost.hotel * 4
                        : undefined
                    } 
                    {' '}total
                </span>
            </li>
            <li className="card-owner" >
                {inspectionTarget?.ownedBy === 'market'
                ? <span>
                    Available To Purchase 
                    {' '}
                    {currency}
                    {inspectionTarget?.cost.deed}
                </span>
                : <span>{inspectionTarget?.ownedBy}</span>}
            </li>
        </ul>
    )
}

export default PropertyCard;
