import { Square as SquareType } from '../Game';

type Props = {
    inspectionTarget: SquareType | undefined;
}

const InspectSquare = ( {inspectionTarget}: Props ) => {
    return (
        <>
            <div className="inspect" >
                <ul className={`property-card`} >
                    <li className={`card-name ${inspectionTarget?.group}`} >{inspectionTarget?.name}</li>
                    <li>
                        Rent
                        <span>£{inspectionTarget?.rent[0]}</span>
                    </li>
                    <li>
                        Rent with Color Set
                        <span>£{inspectionTarget?.rent[1]}</span>
                    </li>
                    <li>
                        <span>
                            Rent with{' '}
                            <span className="house-group">
                                <span className="house" ></span>
                            </span>
                        </span>
                        <span>£{inspectionTarget?.rent[2]}</span>
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
                        <span>£{inspectionTarget?.rent[4]}</span>
                    </li>
                    <hr />
                    <li>House Cost £{inspectionTarget?.cost}</li>
                    <li>Hotel Cost £</li>
                    <li className="card-owner" >
                        <span>
                            {inspectionTarget?.ownedBy === 'market'
                            ? `Available To Purchase £${inspectionTarget?.cost}`
                            : inspectionTarget?.ownedBy}
                        </span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default InspectSquare;
