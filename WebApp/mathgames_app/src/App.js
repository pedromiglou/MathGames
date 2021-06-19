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
import Podium from './Pages/Podium/Podium';
import Settings from './Pages/Settings/Settings';
import Statistics from './Pages/Admin/Statistics/Statistics';
import AboutUs from './Pages/AboutUs/AboutUs';
import Tournaments from './Pages/Tournaments/Tournaments';
import CreateTournament from './Pages/Tournaments/Create';
import TournamentPage from './Pages/Tournaments/TournamentPage';
import Bracket from './Pages/Tournaments/Bracket';



/* Redux */
import { Provider } from 'react-redux';
import store from './store';
 


function App() {


    
    return(
        <Provider store={store}>
            <BrowserRouter >
                <div id="sidebarCollapse" className="menu-bars" onClick={toggleNav}>
                    <IconContext.Provider value={{color: 'grey'}}>
                        <FaIcons.FaBars/>
                    </IconContext.Provider>
                </div>

                <Navbar/>

                <nav id="sidebar" className="nav-menu active">
                    <Sidemenu/>
                </nav>

                <div id="content" className="content">
                    <Switch>
                        <Route exact path='/' component={withRouter(Welcome)} />
                        <Route exact path='/gamesDashboard' component={withRouter(ChooseGame)} />
                        <Route path='/game/' component={withRouter(Game)} />
                        <Route exact path='/login' component={withRouter(Login)} />
                        <Route path='/gamePage' component={withRouter(GamePage)}/>
                        <Route exact path='/profile' component={withRouter(Profile)}/>
                        <Route exact path='/podium' component={withRouter(Podium)}/>
                        <Route exact path='/settings' component={withRouter(Settings)}/>
                        <Route exact path='/statistics' component={withRouter(Statistics)}/>
                        <Route exact path='/about' component={withRouter(AboutUs)}/>
                        <Route exact path='/tournaments' component={withRouter(Tournaments)}/>
                        <Route exact path='/createTournament' component={withRouter(CreateTournament)}/>
                        <Route path='/tournament' component={withRouter(TournamentPage)}/>
                        <Route path='/bracket' component={withRouter(Bracket)}/>
                    </Switch>
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
