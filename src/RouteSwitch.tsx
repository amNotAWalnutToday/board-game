import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import getFirebaseConfig from './firebase.config';
import { getDatabase, ref, set } from "firebase/database";
import App from './App';
import Game from './Game';
import OnlineGame from './OnlineGame';

const app = initializeApp(getFirebaseConfig());

const RouteSwitch = () => {

    const [settings, setSettings] = useState(
        {
            player1: {
                name: 'Player 1',
                icon: 'dendro',
            },
            player2: {
                name: 'Player 2',
                icon: 'anemo',
            },
            player3: {
                name: 'Player 3',
                icon: 'geo',
                disable: false,
            },
            player4: {
                name: 'Player 4',
                icon: 'cryo',
                disable: false,
            }
        }
    );

    const [sessionName, setSessionName] = useState<any>();
    const [playerNumber, setPlayerNumber] = useState<number>(0);

    const secretLogoSelecter = (e: any, player: number) => {
        const playerSettings = {...settings}
        switch(player) {
            case 1: 
                playerSettings.player1.icon = e.target.value
                break;
            case 2:
                playerSettings.player2.icon = e.target.value
                break;
            case 3:
                playerSettings.player3.icon = e.target.value
                break;
            case 4:
                playerSettings.player4.icon = e.target.value
                break;
        }
        setSettings(playerSettings);
    }

    const inputHandler = (e: any, player: number) => {
        const playerSettings = {...settings}
        switch(player) {
            case 1: 
                playerSettings.player1.name = e.target.value
                break;
            case 2:
                playerSettings.player2.name = e.target.value
                break;
            case 3:
                playerSettings.player3.name = e.target.value
                break;
            case 4:
                playerSettings.player4.name = e.target.value
                break;
        }
        setSettings(playerSettings);
        if(e.target.value === 'nilou' 
        || e.target.value === 'dehya' 
        || e.target.value === 'nahida'
        || e.target.value === 'hutao'
        || e.target.value === 'keqing'
        || e.target.value === 'kazuha'
        || e.target.value === 'aether'
        || e.target.value === 'lumine'
        || e.target.value === 'paimon') secretLogoSelecter(e, player);
    }

    const getDirectionForIcon = (direction: string, player: number):string => {
        const icons = [
            'dendro', 
            'anemo', 
            'geo', 
            'cryo', 
            'electro', 
            'pyro', 
            'hydro'
        ];

        const index = icons.findIndex((icon) => {
            if(player === 1) return icon === settings.player1.icon;
            else if(player === 2) return icon === settings.player2.icon;
            else if(player === 3) return icon === settings.player3.icon;
            else if(player === 4) return icon === settings.player4.icon;
            else return console.error('no icon found');
        });

        if(direction === 'forward' && index + 1 > icons.length - 1) {
            return icons[0];
        } else if(direction === 'backward' && index - 1 < 0) {
            return icons[icons.length - 1];
        } else if(direction === 'forward') return icons[index + 1]; 
        else return icons[index - 1];
    }

    const changeIcon = (e:any, player: number) => {
        const playerSettings = {...settings};
        const current = getDirectionForIcon(e.target.value, player);
        switch(player) {
            case 1:
                playerSettings.player1.icon = current;
                break;
            case 2:
                playerSettings.player2.icon = current;
                break;
            case 3:
                playerSettings.player3.icon = current;
                break;
            case 4:
                playerSettings.player4.icon = current;
                break;
        }
        setSettings(playerSettings);
    }

    const disablePlayer = (player: number) => {
        const playerSettings = {...settings};
        player === 3
            ? playerSettings.player3.disable = !playerSettings.player3.disable
            : playerSettings.player4.disable = !playerSettings.player4.disable;
        setSettings(playerSettings);
        console.log(settings.player3);
    }

    return(
        <Router basename='/board-game' >
            <Routes>
                <Route 
                    path='/' 
                    element={<App 
                            settings={settings} 
                            setSettings={setSettings}
                            playerNumber={playerNumber}
                            setPlayerNumber={setPlayerNumber}
                            sessionName={sessionName}
                            setSessionName={setSessionName}
                            inputHandler={inputHandler}
                            changeIcon={changeIcon}
                            disablePlayer={disablePlayer}
                        />
                    } 
                />
                <Route 
                    path='/game' 
                    element={<Game settings={settings} />} 
                />
                <Route 
                    path='/online-game'
                    element={<OnlineGame 
                            settings={settings}
                            playerNumber={playerNumber}
                            sessionName={sessionName}    
                        />
                    }
                />
            </Routes>
        </Router>
    )
}

export const db = getDatabase();
export default RouteSwitch;
