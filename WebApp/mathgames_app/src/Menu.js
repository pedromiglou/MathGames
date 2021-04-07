import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import {Link} from 'react-router-dom';
import {sidebarData_group1, sidebarData_group2} from './data/SidebarData.js';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {IconContext} from 'react-icons';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from './Pages/DashBoard/Dashboard';
import Welcome from './Pages/Welcome/Welcome';
import ChooseGameMode from './Pages/ChooseGameMode/ChooseGameMode';
import ChooseGame from './Pages/ChooseGame/ChooseGame';

function Menu(){
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar)

    return(
        <>
        <Router>
            <IconContext.Provider value={{color: 'grey'}}>
                <div className="navbar">
                    <div className="bars_logo">
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaBars onClick={showSidebar}/>
                        </Link>
                        <div className="nav-logo">
                            <Link to="/">
                                <img  className="logo" src={process.env.PUBLIC_URL + "/images/logo-light.png"}  alt="logo"/>
                            </Link>
                        </div>
                    </div>
                </div>
                {/*
                <hr className="menu-divider"></hr>
                */}
                <nav className={sidebar ? "nav-menu active" : "nav-menu collapsed"}>
                    <ul className="nav-menu-items">
                        <div className="nav-item">
                            <li className="nav-text">
                                <Link to="/"> 
                                    <i className="subicon"><AiIcons.AiFillHome/></i>
                                    <span className={sidebar ? "icons-name" : "icons-noname"}>Inicio</span>
                                </Link>
                            </li>
                        </div>
                        <hr></hr>
                        {sidebarData_group1.map((item, index) =>{
                            return(
                                <div className="nav-item">
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}> 
                                            <i className="subicon">{item.icon}</i>
                                            <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span>
                                        </Link>
                                    </li>
                                </div>
                            );
                        })}
                        <hr></hr>
                        {sidebarData_group2.map((item, index) =>{
                            return(
                                <div className="nav-item">
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}> 
                                            <i className="subicon">{item.icon}</i>
                                            <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span>
                                        </Link>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </nav>
                <div className={sidebar ? "sub-component active" : "sub-component collapsed"}>
                    <Switch>
                        <Route exact path='/' component={Welcome} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/choose' component={ChooseGame} />
                        <Route path='/mode' component={ChooseGameMode} />
                    </Switch>
                </div>
            </IconContext.Provider>
        </Router>
        </>
    )
}

export default Menu;