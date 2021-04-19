import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import {sidebarData_group1, sidebarData_group2} from './data/SidebarData.js';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {IconContext} from 'react-icons';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import Welcome from './Pages/Welcome/Welcome';
import ChooseGameMode from './Pages/ChooseGameMode/ChooseGameMode';
import ChooseGame from './Pages/ChooseGame/ChooseGame';
import Game from './Pages/Game/Game';
import Login from './Pages/Login/Login';
import GamePage from './Pages/GamePage/GamePage';
import Game_Page from './Pages/Game_Page/Game_Page';
import Profile from './Pages/Profile/Profile';
import AuthService from './Services/auth.service'

<<<<<<< HEAD
/* Redux */
import { Provider } from 'react-redux';
import store from './store';
=======

>>>>>>> 340478f6a817b254c742e93fadf29def688da2ac

function Menu(){
    const [sidebar, setSidebar] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState("")
    const showSidebar = () => setSidebar(!sidebar);


    useEffect(() => {
        if (sessionStorage.getItem('user_id') === null) {
            sessionStorage.setItem('user_id', uuidv4());
        }
        var resultado = AuthService.getCurrentUser();
        setUser(resultado)
        if (resultado !== null) {
            setFree_user(false);
        } else {
            setFree_user(true)
        }
    }, [])

    //Talvez se venham a usar estes tambem, dont delete
    /*
    const [user, setUser] = useState(false);
    const [tournament_user, setTournament_user] = useState(false);
    */
    const [free_user, setFree_user] = useState(true);

    return(
        <>
        <Provider store={store}>
            <Router>
                <IconContext.Provider value={{color: 'grey'}}>
                    <div className="container-fluid">
                        <div id="horizontal_nav_row" className="row sticky-top">
                            <div id="row-logo" className="row">
                                <Link to="#" className="menu-bars">
                                    <FaIcons.FaBars onClick={showSidebar}/>
                                </Link>
                                <div className="nav-logo">
                                    <Link to="/">
                                        <img  className="logo" src={process.env.PUBLIC_URL + "/images/logo-light.png"}  alt="logo"/>
                                    </Link>
                                </div>

                            </div>

                            {/* <hr className="menu-divider"></hr>  */}                     
                            
                            {admin &&
                                <h1>Admin</h1>
                            }

                            <div className="navbar">
                                {!free_user &&
                                    <div className="notif">
                                        <div className="notif_section">
                                            <Link to="/notifications" className="notif_icon">
                                                <FaIcons.FaBell/>
                                            </Link>
                                        </div>
                                    </div>
                                }
                                {!free_user &&
                                    <div className="friends">
                                        <div className="friends_section">
                                            <Link to="/friends" className="friends_icon">
                                                <FaIcons.FaUserFriends/>
                                            </Link>
                                        </div>
                                    </div>
                                }
                                

                                <div className="account_info">               
                                    {!free_user &&
                                        <div className="info">
                                            <h5>Nome: {user.username} </h5>
                                            <h5>Nivel: {user.account_level} </h5>  
                                        </div> 
                                    } 

                                    {free_user &&
                                        <div className="info">
                                            <Link to="/login" className="notif_icon">
                                                <h2>Login/Registar</h2>
                                            </Link>
                                        </div>
                                    }

                                    <div className="round_profile_logo">
                                        <Link to="/profile">
                                            <img className="profile_logo" src={process.env.PUBLIC_URL + "/images/user-profile.png"}  alt="logo"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        
                        <div id="content" className="row">
                            {/* <Sidebar/> */}
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
                                            <div key={item.id} className="nav-item">
                                                <li className={item.cName}>
                                                    <Link to={item.path}> 
                                                        <i className="subicon">{item.icon}</i>
                                                        <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span>
                                                        
                                                    </Link>
                                                </li>
                                            </div>
                                        );
                                    })}
                                    <hr></hr>
                                    {sidebarData_group2.map((item) =>{
                                        return(
                                            <div key={item.id} className="nav-item">
                                                <li  className={item.cName}>
                                                    <Link to={item.path}> 
                                                        <i className="subicon">{item.icon}</i>
                                                        <span className={sidebar ? "icons-name" : "icons-noname"}>{item.title}</span>
                                                    </Link>
                                                </li>
                                            </div>
                                        );
                                    })}
                                    <hr></hr>
                                    
                                </ul>
                            </nav>
        
                            {/*<hr className="menu-divider"></hr>*/}
                            
                            
                            <div className={sidebar ? "sub-component active" : "sub-component collapsed"}>
                                <Switch>
                                    <Route exact path='/' component={withRouter(Welcome)} />
                                    <Route exact path='/gamesDashboard' component={withRouter(ChooseGame)} />
                                    <Route exact path='/mode' component={withRouter(ChooseGameMode)} />
                                    <Route exact path='/game' component={withRouter(Game)} />
                                    <Route exact path='/login' component={withRouter(Login)} />
                                    <Route exact path='/gamePage' component={withRouter(GamePage)}/>
                                    <Route exact path='/profile' component={withRouter(Profile)}/>
                                </Switch>
                            </div>
                            
                        </div>
                    </div>
                </IconContext.Provider>
            </Router>
        </Provider>
        </>
    )
}

export default Menu;
