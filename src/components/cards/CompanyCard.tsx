import { Square as SquareTemplate } from '../../Game';

type Props = {
    inspectionTarget: SquareTemplate | undefined;
}

const CompanyCard = ( {inspectionTarget}: Props ) => {
    return (
        <ul className="company-card">
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
                <span>
                    {inspectionTarget?.ownedBy === 'market'
                    ? `Available To Purchase £${inspectionTarget?.cost.deed}`
                    : inspectionTarget?.ownedBy}
                </span>
            </li>
        </ul>
    )
}

export default CompanyCard;
