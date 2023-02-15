import { useEffect, useRef } from "react";
import { LogMessage } from '../Game';

type Props = {
    gameLog: LogMessage[],
}

const Log = ( {gameLog}: Props ) => {
    const container:any = useRef();

    useEffect(() => {
        container.current.scrollTo(
            0,
            container.current.offsetHeight + (gameLog.length * 20)
        );
    });

    const mapLog = () => {
        return gameLog.map((item, i) => {
            return (
                <p key={i} >
                    <span className="text-plain" >{item.player} </span>
                    {item.action}
                    {item.money 
                    && <span 
                            className={`${item.player2 === 'Commisions' 
                            ? 'tax'
                            : 'money'}`
                            }
                        > 
                            {' '}£{item.money}
                        </span>}
                    <span 
                        className={`${item.action === 'gets sent to' 
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
