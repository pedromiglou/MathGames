import React from 'react';
import Menu from './Components/Menu/Menu.js'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

function App(){
    return( 
        <>
        <Router>
            <Menu/>
            <Switch>
                <Route path='/' />
            </Switch>
        </Router>
        </>
    )
}

export default App;