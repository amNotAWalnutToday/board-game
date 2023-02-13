import { Square as SquareTemplate } from '../../Game';

type Props = {
    inspectionTarget: SquareTemplate | undefined;
    toggleInspect: any;
}

const TaxCard = ( {inspectionTarget, toggleInspect}: Props ) => {
    return (
       <ul className="special-card" onClick={toggleInspect} >
            <li className="card-name plain">{inspectionTarget?.name}</li>
            <li>
                Pay the tax and the money will be transfered over to free
                parking
            </li>
            <li className='free-parking-prize'>
                Tax 
                <span className="tax">£{inspectionTarget?.cost.deed}</span>
            </li>
       </ul> 
    )
}

export default TaxCard;
