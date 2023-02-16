import { Square as SquareTemplate } from '../../Game';

type Props = {
    inspectionTarget: SquareTemplate | undefined;
    toggleInspect:any;
}

const CompanyCard = ( {inspectionTarget, toggleInspect}: Props ) => {
    return (
        <ul className="company-card" onClick={toggleInspect}>
            <li className="card-name plain">
                {inspectionTarget?.name}
            </li>
            <li>
                If you own 
                <span className='money'> One </span> 
                <strong>Utility</strong> card you receive
                <span className='money'> 4x </span> 
                the amount that the 
                payer rolled this turn.
            </li>
            <li>
                If you own 
                <span className='money'> Two </span> 
                <strong>Utility</strong> cards you receive 
                <span className='money' > 10x </span>
                the amount that
                the payer rolled this turn.
            </li>
            <li className="card-owner" >
                {inspectionTarget?.ownedBy === 'market'
                    ? <span>Available To Purchase 
                        <span className="m-symbol"/>
                        {inspectionTarget?.cost.deed}
                    </span>
                    : <span>{inspectionTarget?.ownedBy}</span>
                }
            </li>
        </ul>
    )
}

export default CompanyCard;
