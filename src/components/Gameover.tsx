import { Link } from 'react-router-dom';
import { Player } from '../Game';
import Stats from './Stats';


type Props = {
    localPlayer: Player;
    closeSession: (() => void) | undefined;
}

const Gameover = ( {localPlayer, closeSession}: Props ) => {
    return (
        <>
            <div className="underlay"/>
            <div className="gameover">
                <div className="prompt" >
                    <div className="buy-menu">
                        <h1 className='money' >1st Place!</h1>
                        <Stats 
                            gameBoard={undefined}
                            players={[localPlayer]}
                            sendTrade={undefined}
                            shouldClose={undefined}
                            yourName={undefined}
                        />
                        <div className='btn-group' >
                            <Link 
                                to="/" 
                                className='buy-btn'
                                onClick={closeSession}
                            >
                                Return To Main Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gameover;
