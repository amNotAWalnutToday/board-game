type Props = {
    index: number;
}

const Player = ({index}: Props) => {
    return <div className="player">{index}</div>
}

export default Player;
