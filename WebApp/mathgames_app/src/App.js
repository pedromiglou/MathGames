/* React */
import React from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {IconContext} from 'react-icons';

/* Css */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './Components/Menu/Navbar';
import Sidemenu from './Components/Menu/Sidemenu';

/* Pages */
import Welcome from './Pages/Welcome/Welcome';
import ChooseGame from './Pages/ChooseGame/ChooseGame';
import Game from './Pages/Game/Game';
import Login from './Pages/Login/Login';
import GamePage from './Pages/GamePage/GamePage';
import Profile from './Pages/Profile/Profile';

/* Uuid */
import { v4 as uuidv4 } from 'uuid';


/* Redux */
import { Provider } from 'react-redux';
import store from './store';

function App() {

    if (sessionStorage.getItem('user_id') === null)
        sessionStorage.setItem('user_id', uuidv4());		

    return(
        <Provider store={store}>
            <BrowserRouter>
                <div className="wrapper">
                    <div id="sidebarCollapse" className="menu-bars" onClick={toggleNav}>
                        <IconContext.Provider value={{color: 'grey'}}>
                            <FaIcons.FaBars/>
                        </IconContext.Provider>
                    </div>

                    <Navbar/>

                    <nav id="sidebar" className="nav-menu active">
                        <Sidemenu/>
                    </nav>

                    <div id="content">
                        <Switch>
                            <Route exact path='/' component={withRouter(Welcome)} />
                            <Route exact path='/gamesDashboard' component={withRouter(ChooseGame)} />
                            <Route path='/game/' component={withRouter(Game)} />
                            <Route exact path='/login' component={withRouter(Login)} />
                            <Route exact path='/gamePage' component={withRouter(GamePage)}/>
                            <Route exact path='/profile' component={withRouter(Profile)}/>
                        </Switch>
                    </div>

                </div>
            </BrowserRouter>
        </Provider>
    )
}

function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    var sidebarBtn = document.getElementById("sidebarCollapse");
    var main = document.getElementById("content");
    var icons = document.getElementsByClassName("sidebar-icons");
    var n;

    if ( sidebar.classList.contains("active") ) {
        main.style.marginLeft = "65px";

        sidebar.classList.remove("active");
        sidebar.classList.add("collapsed");

        sidebarBtn.classList.remove("active");

        for (n = icons.length-1; n >= 0; n--) {
            icons[n].classList.remove("icons-name");
            icons[n].classList.add("icons-noname");
        }
    } else {
        main.style.marginLeft = "300px";

        sidebar.classList.add("active");
        sidebar.classList.remove("collapsed");

        sidebarBtn.classList.add("active");

        for (n = icons.length-1; n >= 0; n--) {
            icons[n].classList.add("icons-name");
            icons[n].classList.remove("icons-noname");
        }
    }
}

export default App;
