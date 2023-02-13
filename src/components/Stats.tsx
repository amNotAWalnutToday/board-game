import { Player } from '../Game';

type Props = {
    players: Player[];
}

const Stats = ({players}: Props) => {
    const mapPlayerStats = () => {
        return players.map((item, i) => {
            return (
                <div key={i} className="player-stats" >
                    <p className='card-name plain' >{item.name}</p>
                    <p className='money' >£{item.money}</p>
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
        <div className={players.length > 1 ? 'stats' : 'winner'} >
            {mapPlayerStats()}
        </div>
    )
}

export default Stats;
