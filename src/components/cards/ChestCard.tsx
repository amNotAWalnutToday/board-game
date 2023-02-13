import { Square as SquareTemplate } from '../../Game';

type Props = {
    inspectionTarget: SquareTemplate | undefined;
    toggleInspect: any;
}

const ChestCard = ( {inspectionTarget, toggleInspect}: Props ) => {
    return (
       <ul className="chance-card" onClick={toggleInspect} >
       </ul> 
    )
}

export default ChestCard;
