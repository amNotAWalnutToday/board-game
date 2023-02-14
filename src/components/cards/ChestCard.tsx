import { Square as SquareTemplate } from '../../Game';

type Props = {
    inspectionTarget: SquareTemplate | undefined;
    toggleInspect: any;
}

const ChestCard = ( {inspectionTarget, toggleInspect}: Props ) => {
    return (
       <ul className="chance-card card-back" onClick={toggleInspect} >
        <li className='chance-icon'></li>
       </ul> 
    )
}

export default ChestCard;
