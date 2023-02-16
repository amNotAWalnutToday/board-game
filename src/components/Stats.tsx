import { Player } from '../Game';

type Props = {
    players: Player[];
    shouldClose: boolean | undefined;
}

const Stats = ({players, shouldClose}: Props) => {
    const mapPlayerStats = () => {
        return players.map((item, i) => {
            return (
                <div key={i} className="player-stats" >
                    <p className={`card-name plain card-${item.logo}`} >
                        {item.name}
                        <span className={`logo logo-${item.logo}`} />
                    </p>
                    <p className='money'>
                        <span className="m-symbol"/>{item.money}
                    </p>
                    <hr />
                    <p className="player-owned">
                        {item.owned.map((item, i) => {
                            return (
                            <span key={i} className={`text-${item.group}`} >
                                {item.name}
                            </span>)
                        })}
                    </p>
                </div>
            )
        })
    }

    return (
        <div 
            className={
                players.length < 2 && !shouldClose
                    ? 'winner' 
                    : shouldClose 
                        ? 'stats close'
                        : 'stats'
            } 
        >
            {mapPlayerStats()}
        </div>
    )
}

export default Stats;
