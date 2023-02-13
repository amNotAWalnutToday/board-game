import { Square as SquareType } from '../../Game';

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
                <span>£{inspectionTarget?.rent[0]}</span>
            </li>
            <li>
                Rent with Color Set
                <span>£{inspectionTarget 
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
                <span>£{inspectionTarget?.rent[1]}</span>
            </li>
            <li>
                <span>
                    Rent with{' '}
                    <span className="house-group">
                        <span className="house" ></span>
                        <span className="house" ></span>
                    </span>
                </span>
                <span>£{inspectionTarget?.rent[2]}</span>
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
                <span>£{inspectionTarget?.rent[3]}</span>
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
                <span>£{inspectionTarget?.rent[4]}</span>
            </li>
            <li>
                <span>
                    Rent with{' '}
                    <span className="house-group">
                        <span className="hotel" ></span>
                    </span>
                </span>
                <span>£{inspectionTarget?.rent[5]}</span>
            </li>
            <hr />
            <li>
                House Cost 
                <span>£{inspectionTarget?.cost.house} each</span>
            </li>
            <li>
                Hotel Cost 
                <span>£{inspectionTarget 
                    ? inspectionTarget?.cost.hotel * 4
                    : undefined
                } total</span>
            </li>
            <li className="card-owner" >
                <span>
                    {inspectionTarget?.ownedBy === 'market'
                    ? `Available To Purchase £${inspectionTarget?.cost.deed}`
                    : inspectionTarget?.ownedBy}
                </span>
            </li>
        </ul>
    )
}

export default PropertyCard;
