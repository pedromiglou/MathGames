import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from './Pages/DashBoard/Dashboard'
import Welcome from './Pages/Welcome/Welcome'
import Menu from './Components/Menu.js'
import ChooseGameMode from './Pages/ChooseGameMode/ChooseGameMode';
import ChooseGame from './Pages/ChooseGame/ChooseGame';
import Login from './Pages/Login/Login';


import './App.css';

function App(){
    return( 
        <>
        <Router>
            <Switch>
                <Route exact path='/' component={Welcome} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/choose' component={ChooseGame} />
                <Route path='/mode' component={ChooseGameMode} />
                <Route path='/login' component={Login} />
            </Switch>
        </Router>
        </>
    )
}

export default App;