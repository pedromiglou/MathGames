import React from 'react';
import Menu from './Components/Menu/Menu.js'
import Welcome from './Components/Welcome/Welcome.js'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

function App(){
    return( 
        <>
        <Router>
            <Menu/>
            <Welcome/>
            <Switch>
                <Route path='/' />
            </Switch>
        </Router>
        </>
    )
}

export default App;