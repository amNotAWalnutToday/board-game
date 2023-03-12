import React, { useEffect, useState } from 'react';
import { Player } from '../Game';

type Props = {
    localPlayer: Player;
    setShowTurnAnnouncement: any;
    yourTurn: boolean;
}

const Announcement = ( {localPlayer, setShowTurnAnnouncement, yourTurn}: Props ) => {
    const [leave, setLeave] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setShowTurnAnnouncement(false), 1000);
        setTimeout(() => setLeave(true), 750);
    }, []);
    
    return(
        <>
            <div className={leave ? 'underlay leave' : 'underlay'}></div>
            <div className={leave ? "announcement leave" : "announcement"} >
                <div className={`logo logo-${localPlayer.logo}`} />
                <h1 className={yourTurn ? 'money' : 'tax'} >
                    {localPlayer.name}'s Turn
                </h1>
            </div>
        </>
    )
}

export default Announcement;
