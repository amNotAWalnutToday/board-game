import { Square as SquareTemplate, Player} from '../../Game';

type Props = {
    inspectionTarget: SquareTemplate | undefined;
    gameBoard: any;
    jailedPlayers: any;
    toggleInspect: any;
}

const SpecialCard = ( 
    {
        inspectionTarget, 
        gameBoard, 
        jailedPlayers,
        toggleInspect,
    }: Props ) => {
    const goText = "On passing go receive £200";
    const freeParkingText = "On landing here receive money that has collected from taxes";
    const goToJailText = "Go directly to jail, do not pass go, do not receive £200!";

    const getVisitersNames = () => {
        const names:string[] = [];
        gameBoard.players.forEach((player: Player) => {
            if(player.location === 11 && checkVisiter(player)) {
                names.push(player?.name);
            }
        });
        return names.join(", ");
    }

    const checkVisiter = (user: Player) => {
        let isHere = true;
        jailedPlayers.forEach((player: Player) => {
            if(user.name === player.name) isHere = false;
        });
        return isHere;
    }

    const getJailedPlayersNames = () => {
        const names:string[] = [];
        jailedPlayers.forEach((player: Player) => {
            names.push(player?.name);
        });
        return names.join(", ");
    }

    return (
        <ul className="special-card" onClick={toggleInspect} >
            <li className="card-name plain" >{inspectionTarget?.name}</li>
            <div>
                <li>
                    {inspectionTarget?.name === 'go'
                    ? goText : '' }
                    {inspectionTarget?.name === 'jail'
                    ? "Visiting" : ''}
                    {inspectionTarget?.name === 'free parking'
                    ? freeParkingText : ''}
                    {inspectionTarget?.name === 'go to jail'
                    ? goToJailText : ''}
                </li>
                {inspectionTarget?.name === 'jail'
                ? getVisitersNames() 
                    ? <li>{getVisitersNames()}</li> 
                    : <div>
                        <hr />
                        <br />
                        <li>There are No Visitors</li>
                    </div> 
                : ''}
            </div>

           {/*jail extras*/}
            {inspectionTarget?.name === 'jail' && jailedPlayers
            ? <div className="jailed-players">
                <li>Jail</li>
                <hr />
                <br />
                <li>
                    {jailedPlayers.length > 0 
                    ? getJailedPlayersNames()
                    : 'There are No Players in jail'}
                </li>
            </div> 
            : ''}
            {inspectionTarget?.name === 'jail' 
            ? <li className="jail-description" >
                To leave jail you must roll a double, or higher total than 8!
            </li>
            : ''}
            
            {/*free parking extras*/}
            {inspectionTarget?.name === 'free parking'
            ?  <li className="free-parking-prize">
                    Current
                    <span className="money">
                        £{inspectionTarget.cost.deed}
                    </span>
                </li> 
                : ''}
        </ul>
    )
}

export default SpecialCard;
