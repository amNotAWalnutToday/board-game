import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { set, ref, remove, onValue, update, push, child, get } from 'firebase/database';
import { db } from './RouteSwitch';

type Props = {
  settings: any;
  setSettings: any;
  inputHandler: (e:any, player: number) => void;
  changeIcon: (e:any, player: number) => void;
  disablePlayer: (player: number) => void;
}

const App = ( {settings, setSettings, inputHandler, changeIcon, disablePlayer}: Props ) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const [showJoinMenu, setShowJoinMenu] = useState<boolean>(false);
  const [allSessions, setAllSessions] = useState<object[]>();

  const [sessionName, setSessionName] = useState<any>();
  const [isHosting, setIsHosting] = useState<boolean>(false);
  const [playerNumber, setPlayerNumber] = useState<number>(0);

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
    });
    setPlayerNumber(1);
    setSessionName(reference);
  }

  useEffect(() => {
    getSessions()
  }, []);

  const getSessions = async () => {
    const reference = ref(db);
    const sessions:any[] = [];
    get(child(reference, '/')).then(async (snapshot) => {
      const data = await snapshot.val();
      for(const session in data) {
        sessions.push(data[session].sessionId);
      }
      setAllSessions(sessions);
    });
  }

  const getSessionSettings = async (sessionId: string) => {
    const reference = ref(db, `${sessionId}/`);
    return get(child(reference, 'settings')).then((snapshot) => {
      return snapshot.val();
    })
  }

  const joinSession = async (sessionId: string) => {
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

  const mapSessions = () => {
    console.log(allSessions);
    return allSessions?.map((item:any, i:any) => {
      return <button key={i} onClick={() => joinSession(item)} >{item}</button>
    });
  }

  const cancelSession = () => {
    setIsHosting(false);
    remove(sessionName);
  }

  const testlog = () => {
    console.log(playerNumber, sessionName);
    console.log('settings', settings);
  }

  return (
    <div className="title-menu" >
      {!showSettings && !showJoinMenu 
      && <div>
        <button onClick={toggleShowSettings} >
          Play Game
        </button>
        <button onClick={toggleJoinMenu}>Join</button>
      </div>}
      {showJoinMenu 
      &&
      <div className='settings'>
        <div>{mapSessions()}</div>
        <button onClick={getSessions} >use</button>
        <button onClick={testlog} >test</button>
        <Link 
          to="/game" 
          className={validateIcons() ? 'buy-btn' : 'dont-buy-btn'} 
        >Go</Link>
      </div> 
      }
      {showSettings 
      && 
      <div className='settings' >
        <div className='special-card'>
          <div className='card-name plain' >
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
          </div>
          <div className='logo-carousel' >
            <button 
              onClick={(e) => changeIcon(e, currentPlayer)} 
              value="backward" 
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
            disabled={currentPlayer === 3 || currentPlayer === 4 
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
          <div className='btn-group' >
            <button 
              className={
                currentPlayer === 1 
                  ? 'pseudo-select' 
                  : ''
              } 
              onClick={() => setCurrentPlayer(1)} 
            >
              1
            </button>
            <button 
              className={
                currentPlayer === 2 
                  ? 'pseudo-select' 
                  : ''
              } 
              onClick={() => setCurrentPlayer(2)} 
            >
              2
            </button>
            <button
              className={
                currentPlayer === 3
                  ? 'pseudo-select' 
                  : ''
              } 
              onClick={() => setCurrentPlayer(3)} 
            >
              3
            </button>
            <button 
              className={
                currentPlayer === 4
                  ? 'pseudo-select' 
                  : ''
              } 
              onClick={() => setCurrentPlayer(4)} 
            >
              4
            </button>
          </div>
        </div>
        <Link 
          to="/game" 
          className={validateIcons() ? 'buy-btn' : 'dont-buy-btn'} 
          onClick={validateIcons() ? undefined : (e) => e.preventDefault()}
        >
          {validateIcons() ? 'Go' : 'No Duplicate Icons'}
        </Link>
        <button onClick={!isHosting ? createSession : cancelSession}>
          {!isHosting ? 'Host' : "Stop Hosting"}
        </button>
      </div>}
    </div>
  );
}

export default App;
