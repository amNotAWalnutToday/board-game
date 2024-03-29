import { Square as SquareTemplate, Player, currency} from '../../Game';

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
    const freeParkingText = "On landing here receive money that has collected from taxes";
    const goToJailText = "Trade places with klee in solitary confinement so she can visit the irodori festival in inazuma(The Samsara will not restart so do not collect 200 Mora)";

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
                    {inspectionTarget?.number === 1
                    ? <span>
                        On starting a new samsara receive {currency}
                        <span className="free-parking-prize money">
                            200
                        </span>
                    </span> : '' }
                    {inspectionTarget?.number === 11
                    ? "Visiting" : ''}
                    {inspectionTarget?.number === 21
                    ? freeParkingText : ''}
                    {inspectionTarget?.name === 'Go to Solitary'
                    ? <span className='go-solitary' >
                        <span className='festival-stand' />
                        {goToJailText}
                    </span> 
                    : ''}
                </li>
                {inspectionTarget?.number === 11
                ? getVisitersNames() 
                    ? <li>{getVisitersNames()}</li> 
                    : <div>
                        <hr />
                        <br />
                        <li>There are No Visitors</li>
                    </div> 
                : ''}
            </div>
            {inspectionTarget?.number === 1 
                && <div className='samsara' />}

           {/*jail extras*/}
            {inspectionTarget?.number === 11 && jailedPlayers
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
            {inspectionTarget?.number === 11 
            ? <li className="jail-description" >
                To leave, you must roll a double, or higher total than 7!
            </li>
            : ''}
            
            {/*free parking extras*/}
            {inspectionTarget?.number === 21
            ?  <li className="free-parking-prize">
                    Current
                    <span className="money">
                        {currency}{inspectionTarget.cost.deed}
                    </span>
                </li> 
                : ''}
        </ul>
    )
}

export default SpecialCard;
