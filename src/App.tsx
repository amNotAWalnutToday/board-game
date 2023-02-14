import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  settings: any;
  inputHandler: (e:any, player: number) => void;
  changeIcon: (e:any, player: number) => void;
  disablePlayer: (player: number) => void;
}

const App = ( {settings, inputHandler, changeIcon, disablePlayer}: Props ) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const toggleShowSettings = () => setShowSettings(!showSettings);

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

  return (
    <div className="title-menu" >
      {!showSettings 
      && <button onClick={toggleShowSettings} >Play Game</button>}
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
      </div>}
    </div>
  );
}

export default App;
