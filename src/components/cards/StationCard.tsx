import { Square as SquareTemplate, currency } from '../../Game';

type Props = {
    inspectionTarget: SquareTemplate | undefined;
    toggleInspect: any;
}

const StationCard = ({inspectionTarget, toggleInspect}: Props) => {
    return (
        <ul className="station-card" onClick={toggleInspect}>
            <li className="card-name plain" >
                {inspectionTarget?.name}
            </li>
            <li>
                Rent
                <span>{currency}{inspectionTarget?.rent[1]}</span>
            </li>
            <li>
                With 2 Ports
                <span>{currency}{inspectionTarget?.rent[2]}</span>
            </li>
            <li>
                With 3 Ports
                <span>{currency}{inspectionTarget?.rent[3]}</span>
            </li>
            <li>
                With 4 Ports
                <span>{currency}{inspectionTarget?.rent[4]}</span>
            </li>
            <li className="card-owner" >
                {inspectionTarget?.ownedBy === 'market'
                    ? <span>
                        Available To Purchase 
                        {' '}
                        {currency}
                        {inspectionTarget?.cost.deed}
                    </span>
                    : inspectionTarget?.ownedBy}
            </li>
        </ul>
    )
}

export default StationCard;
