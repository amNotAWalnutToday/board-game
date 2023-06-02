import { useEffect, useRef, useState } from "react";
import { LogMessage } from '../Game';

type Props = {
    gameLog: LogMessage[],
    yourName: undefined | string,
}

const Log = ( {gameLog, yourName}: Props ) => {
    const [isLocked, setIsLocked] = useState<boolean>(true);

    const container:any = useRef();

    const moveLog = (e:any) => {
        container.current.style.position = 'absolute';
        container.current.style.zIndex = '10';
        container.current.style.resize = 'both';
        container.current.style.top = `${e.screenY - 50}px`;
        container.current.style.left = `${e.screenX - 25}px`;
    }

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
        <div 
            className="game-log" 
            ref={container} 
            onDragEnd={moveLog}
            draggable={isLocked ? false : true}
        >
            <button 
                className="lock-btn" 
                onClick={() => setIsLocked(!isLocked)}
            >
                <span className={isLocked ? 'lock-icon' : 'unlock-icon'} ></span>
            </button>
            {mapLog()}
        </div>
    )
}

export default Log;
