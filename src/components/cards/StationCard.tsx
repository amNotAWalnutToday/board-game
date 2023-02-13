import { Square as SquareTemplate } from '../../Game';

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
                <span>£{inspectionTarget?.rent[1]}</span>
            </li>
            <li>
                With 2 Stations
                <span>£{inspectionTarget?.rent[2]}</span>
            </li>
            <li>
                With 3 Stations
                <span>£{inspectionTarget?.rent[3]}</span>
            </li>
            <li>
                With 4 Stations
                <span>£{inspectionTarget?.rent[4]}</span>
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

export default StationCard;
