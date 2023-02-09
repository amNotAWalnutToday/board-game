import { Square as SquareType } from '../Game';
import PropertyCard from './PropertyCard';

type Props = {
    inspectionTarget: SquareType | undefined;
}

const InspectSquare = ( {inspectionTarget}: Props ) => {
    return (
        <>
            <div className="inspect" >
                <PropertyCard inspectionTarget={inspectionTarget} />
            </div>
        </>
    )
}

export default InspectSquare;
