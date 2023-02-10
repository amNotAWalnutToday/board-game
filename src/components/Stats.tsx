import { Player } from '../Game';

type Props = {
    players: Player[];
}

const Stats = ({players}: Props) => {
    const mapPlayerStats = () => {
        return players.map((item, i) => {
            return (
                <div className="player-stats" >
                    <p className='card-name plain' >{item.name}</p>
                    <p className='money' >£{item.money}</p>
                    <hr />
                    <p className="player-owned">
                        {item.owned.map((item, i) => {
                            return (
                            <span className={`text-${item.group}`} >
                                {item.name}
                            </span>)
                        })}
                    </p>
                </div>
            )
        })
    }


    return (
        <div className="stats" >
            {mapPlayerStats()}
        </div>
    )
}

export default Stats;
