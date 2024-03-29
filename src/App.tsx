import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { set, ref, remove, onValue, child, get } from 'firebase/database';
import { db } from './RouteSwitch';
import { useBeforeUnload } from 'react-router-dom';

type Props = {
  settings: any;
  setSettings: any;
  playerNumber: number | undefined;
  setPlayerNumber: any;
  sessionName: any;
  setSessionName: any;
  inputHandler: (e:any, player: number) => void;
  changeIcon: (e:any, player: number) => void;
  disablePlayer: (player: number) => void;
}

const App = ( 
  {
    settings, 
    setSettings, 
    playerNumber,
    setPlayerNumber,
    sessionName,
    setSessionName,
    inputHandler, 
    changeIcon, 
    disablePlayer
  }: Props ) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const [showJoinMenu, setShowJoinMenu] = useState<boolean>(false);
  const [allSessions, setAllSessions] = useState<object[]>();

  const [isHosting, setIsHosting] = useState<boolean>(false);
  
  const [canRefresh, setCanRefresh] = useState<boolean>(true);

  const toggleShowSettings = () => setShowSettings(!showSettings);
  const toggleJoinMenu = () => setShowJoinMenu(!showJoinMenu);

  const validateIcons = () => {
    const icons:string[] = [];
    for(const player in settings) {
      if(!settings[player].disable) icons.push(settings[player].icon);
    }

    const validate = new Set(icons).size;
    if(settings.player3.disable && settings.player4.disable) {
      return validate === 2 ? true : false;
    } else if(settings.player3.disable || settings.player4.disable) {
      return validate === 3 ? true : false;
    } 
    else return validate === 4 ? true : false;
  }

  const validateName = () => {
    for(const player in settings) {
      if(!settings[player].name) return false;
    }
    return true;
  }

  const createSession = () => {
    setIsHosting(true);
    const reference = ref(db, settings.player1.name);
    let data;
    onValue(reference, (snapshot) => {
      data = snapshot.val();
    });
    if(data) return;
    set(reference, {
      sessionId: settings.player1.name,
      settings: settings,
      joinedPlayers: 1,
      gameBoard: false,
      log: false,
    });
    setPlayerNumber(1);
    setSessionName(reference);
  }

  useEffect(() => {
    getSessions(true);
  }, []);

  const getSessions = async (isInit: boolean) => {
    if(!canRefresh) return;
    const reference = ref(db);
    const sessions:any[] = [];
    get(child(reference, '/')).then(async (snapshot) => {
      const data = await snapshot.val();
      for(const session in data) {
        if(data[session].sessionId) sessions.push(data[session].sessionId);
      }
      setAllSessions(sessions);
    });

    if(isInit) return;
    setTimeout(() => setCanRefresh(true), 15000);
    setCanRefresh(false);
  }

  const getSessionSettings = async (sessionId: string) => {
    const reference = ref(db, `${sessionId}/`);
    return get(child(reference, 'settings')).then((snapshot) => {
      return snapshot.val();
    })
  }

  const joinSession = async (sessionId: string) => {
    if(sessionName) return;
    //await getSessions();
    const reference = ref(db, `${sessionId}/`);
    await get(child(reference, 'joinedPlayers')).then(async (snapshot) => {
      let data = await snapshot.val();
      if(data >= 4 || playerNumber) return;
      set(child(reference, 'joinedPlayers'), data + 1);
      const sessionSettings = await getSessionSettings(sessionId);
      setPlayerNumber(data + 1);
      setSessionName(sessionId);
      setSettings(sessionSettings);
    })
  }
  
  const leaveSession = async (sessionId: string) => {
    const reference = ref(db, `${sessionId}/`);
    await get(child(reference, 'joinedPlayers')).then(async (snapshot) => {
      let data = await snapshot.val();
      set(child(reference, 'joinedPlayers'), data - 1);
      setPlayerNumber(0);
      setSessionName();
    });
  }

  const mapSessions = () => {
    if(!allSessions || !allSessions.length) return <p>There are no sessions currently</p>
    return allSessions?.map((item:any, i:any) => {
      return (
        <button 
          key={i}
          className='play-btn'
          onClick={() => sessionName 
            ? sessionName === item && leaveSession(item) 
            : joinSession(item)
          } 
        >
          {item}
        </button>
      );
    });
  }

  useBeforeUnload(() => {
    if(!isHosting && !sessionName) return;
    cancelSession();
  });

  const cancelSession = () => {
    setIsHosting(false);
    remove(sessionName);
  }

  return (
    <div className="title-menu" >
      {!showSettings && !showJoinMenu 
      && <div className='btn-group' >
        <button className='play-btn' onClick={toggleShowSettings} >
          Play Game
        </button>
        <button className='play-btn' onClick={toggleJoinMenu}>Join</button>
      </div>}
      {showJoinMenu 
      &&
      <div className='settings'>
          <div style={{display: 'flex', gap: '1rem'}} >
            <button 
              className='back-btn' 
              onClick={toggleJoinMenu}
              disabled={sessionName ? true : false}
            >
              <span className='return'/>
            </button>
            <h1>Sessions</h1>
            <button 
              className='refresh-btn' 
              onClick={() => getSessions(false)}
              disabled={canRefresh && !sessionName ? false : true}
            >
              <span className='refresh'/>
            </button>
          </div>
        <div className='sessions btn-group' >
          {mapSessions()}
        </div>
        <p className={!sessionName ? 'tax' : 'money'} style={{wordWrap: 'break-word'}} >
            current session: {sessionName ? sessionName : 'N/A'}
        </p>
        <Link 
          to="/online-game" 
          className={!sessionName ? 'dont-buy-btn' : 'buy-btn'} 
          onClick={!sessionName ? (e) => e.preventDefault() : undefined}
        >
          {!sessionName ? 'Join A Game From Above' : 'Go!'}
        </Link>
      </div> 
      }
      {showSettings 
      && 
      <div className='settings' >
        <div style={{transform: 'translateX(-10px)'}} >
          <button 
              style={{transform: 'translate(-55px, 25px)'}}
              className='back-btn' 
              onClick={toggleShowSettings}
              disabled={isHosting ? true : false}
            >
              <span className='return'/>
            </button>
            <h2 style={{fontSize: '30px', width: '130%'}} >Game Settings</h2>
        </div>
        <div className='special-card'>
          <div className='card-name plain' >
            {!isHosting 
            ? 
            <input 
              type="text"
              maxLength={10}
              onChange={(e) => inputHandler(e, currentPlayer)}
              value={
                currentPlayer === 1 
                ? settings.player1.name
                : currentPlayer === 2
                  ? settings.player2.name
                  : currentPlayer === 3
                    ? settings.player3.name
                    : settings.player4.name
              }
            />
            : 
            <p>
              {                
              currentPlayer === 1 
                ? settings.player1.name
                : currentPlayer === 2
                  ? settings.player2.name
                  : currentPlayer === 3
                    ? settings.player3.name
                    : settings.player4.name
              }
            </p> 
            }
          </div>
          <div className='logo-carousel' >
            <button 
              onClick={(e) => changeIcon(e, currentPlayer)} 
              value="backward" 
              disabled={isHosting ? true : false}
            > 
              {'<'} 
            </button>
            <div className={
                currentPlayer === 1 
                ? `logo logo-${settings.player1.icon}`
                : currentPlayer === 2
                  ? `logo logo-${settings.player2.icon}`
                  : currentPlayer === 3
                    ? `logo logo-${settings.player3.icon}`
                    : `logo logo-${settings.player4.icon}`
              } />
            <button 
              onClick={(e) => changeIcon(e, currentPlayer)} 
              value="forward" 
              disabled={isHosting ? true : false}
            >  
              {'>'} 
            </button>
          </div>
          <button 
            className={(currentPlayer === 3 && !settings.player3.disable)
              || (currentPlayer === 4 && !settings.player4.disable)
              ? 'disable-btn'
              :  'disable-btn disable-on'
            }
            onClick={() => disablePlayer(currentPlayer)} 
            disabled={ !isHosting
              && ((currentPlayer === 3 && settings.player4.disable) 
              || (currentPlayer === 4 && !settings.player3.disable))
                ? false 
                : true
            }
          >
            {(currentPlayer === 3 && settings.player3.disable)
            || (currentPlayer === 4 && settings.player4.disable)
              ? 'Enable' 
              : 'Disable' 
            }
          </button>
          <div className='btn-group player-settings-btn-grp' >
            <button 
              className={
                currentPlayer === 1 
                  ? `pseudo-select buy-btn` 
                  : 'buy-btn'
              } 
              onClick={() => setCurrentPlayer(1)} 
            >
              1
            </button>
            <button 
              className={
                currentPlayer === 2 
                  ? 'pseudo-select buy-btn' 
                  : 'buy-btn'
              } 
              onClick={() => setCurrentPlayer(2)} 
            >
              2
            </button>
            <button
              className={
                currentPlayer === 3
                  ? `pseudo-select ${settings.player3.disable ? 'dont-buy-btn' : 'buy-btn'}` 
                  : `${settings.player3.disable ? 'dont-buy-btn' : 'buy-btn'}`
              } 
              onClick={() => setCurrentPlayer(3)} 
            >
              3
            </button>
            <button 
              className={
                currentPlayer === 4
                  ? `pseudo-select ${settings.player4.disable ? 'dont-buy-btn' : 'buy-btn'}`
                  : `${settings.player4.disable ? 'dont-buy-btn' : 'buy-btn'}`
              } 
              onClick={() => setCurrentPlayer(4)} 
            >
              4
            </button>
          </div>
        </div>
        <Link 
          to={isHosting ? '/online-game' : '/game'}
          className={validateIcons() && validateName() ? 'buy-btn' : 'dont-buy-btn'} 
          onClick={validateIcons() && validateName() ? undefined : (e) => e.preventDefault()}
        >
          {validateIcons() && validateName()
            ? 'Go' 
            : validateName() 
              ? 'No Duplicate Icons'
              : 'No empty names'}
        </Link>
        <button className='play-btn host-btn' onClick={!isHosting && validateIcons() && validateName() ? createSession : cancelSession}>
          {!isHosting ? 'Host' : "Stop Hosting"}
        </button>
      </div>}
    </div>
  );
}

export default App;
