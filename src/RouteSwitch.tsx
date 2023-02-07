import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Game from './Game';

const RouteSwitch = () => {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/game' element={<Game />} ></Route>
            </Routes>
        </Router>
    )
}

export default RouteSwitch;
