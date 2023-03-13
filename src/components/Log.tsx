import { useEffect, useRef } from "react";
import { LogMessage } from '../Game';

type Props = {
    gameLog: LogMessage[],
    yourName: undefined | string,
}

const Log = ( {gameLog, yourName}: Props ) => {
    const container:any = useRef();

    useEffect(() => {
        container.current.scrollTo(
            0,
            container.current.offsetHeight + (gameLog.length * 28)
        );
    });

    const mapLog = () => {
        if(!gameLog.length) return <div />;
        return gameLog.map((item, i) => {
            return (
                <p key={i} >
                    <span className={
                        yourName === item.player
                        || yourName === undefined 
                            ? 'money log-player' 
                            : 'tax log-player'
                        } 
                    >
                        {item.player}{' '} 
                    </span>
                    <span className="text-plain" >{item.action}</span>
                    {item.money 
                    && <span 
                            className={`${item.player2 === 'Commisions' 
                            ? 'tax'
                            : 'money'}`
                            }
                        > 
                            {' '}<span className="m-symbol"/>{item.money}
                        </span>}
                    <span 
                        className={`${item.action === 'gets arrested to' 
                            ? 'tax' 
                            : 'text-yellow'
                            }`
                        }
                    > 
                        {' '}{item.output}
                    </span>
                    <span className="text-plain" > {item?.player2}</span>
                </p>
            )
        });
    }

    return (
        <div className="game-log" ref={container}>
            {mapLog()}
        </div>
    )
}

export default Log;
