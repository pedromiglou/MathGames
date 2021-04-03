import React from 'react';
import Menu from './Components/Menu.js'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Dashboard from './Pages/DashBoard/Dashboard'
import Welcome from './Pages/Welcome/Welcome'
/* import Menu from './Components/Menu/Menu.js'*/
import ChooseGameMode from './Pages/ChooseGameMode/ChooseGameMode';
import ChooseGame from './Pages/ChooseGame/ChooseGame';
import Tests from './Pages/Tests/Tests';


function App(){
    return( 
        <>
        <Router>
            <Menu/>
            <Switch>
                <Route exact path='/' component={Welcome} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/choose' component={ChooseGame} />
                <Route path='/mode' component={ChooseGameMode} />
                <Route path='/tests' component={Tests} />
            </Switch>
        </Router>
        </>
    )
}

export default App;