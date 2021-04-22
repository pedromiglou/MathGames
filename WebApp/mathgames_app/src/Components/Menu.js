/* React and React-Icons */
import React, { useState, useEffect } from 'react';
import {IconContext} from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import toast, { Toaster } from 'react-hot-toast';

/* Css */
import './Menu.css'

/* Uuid */
import { v4 as uuidv4 } from 'uuid';

/* Data and Service */
import {sidebarData_group1, sidebarData_group2} from '../data/SidebarData.js';
import AuthService from '../Services/auth.service';
import FriendsService from './Services/friends.service';
import NotificationsService from './Services/notifications.service';

/* Redux */
import { useDispatch } from 'react-redux';

function Menu(){
    const dispatch = useDispatch();
    const [sidebar, setSidebar] = useState(true);
     //Talvez se venham a usar estes tambem, dont delete
    /*
    const [user, setUser] = useState(false);
    const [tournament_user, setTournament_user] = useState(false);
    */
    const [free_user, setFree_user] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState("");

    const [friends, setFriends] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const notifyFriendshipSucess = () => toast.success('Pedido de amizade aceite!', {
        icon: <FaIcons.FaCheckCircle />,
        duration: 3000,
        style:{fontSize: 20}
    });

    const notifyNotificationDelete = () => toast.success('Notificação removida com sucesso!', {
        icon: <FaIcons.FaCheckCircle />,
        duration: 3000,
        style:{fontSize: 20}
    });

    // TEm de colocar no redux o tipo de user
    useEffect(() => {
        async function fetchApiFriends() {
            var response = await FriendsService.getFriends(resultado.id);
            setFriends(response);
        }
        async function fetchApiNotifications() {
            var response = await NotificationsService.getNotifications(resultado.id);
            setNotifications(response);
        }

        if (sessionStorage.getItem('user_id') === null) {
            sessionStorage.setItem('user_id', uuidv4());
        }
        var resultado = AuthService.getCurrentUser();
        setUser(resultado)
        if (resultado !== null) {
            setFree_user(false);
            fetchApiFriends();
            fetchApiNotifications();
            dispatch({
                type: 'NFREEUSER'
            });
        } else {
            setFree_user(true);
            dispatch({
                type: 'FREEUSER'
            });
        }
    }, [])

    const deleteNotification = (e) => {
        const newNotifications = [...notifications];
        newNotifications.splice(e, 1);
        setNotifications(newNotifications);
    }

    const showSidebar = () => {
        setSidebar(!sidebar);
        if (sidebar){
            dispatch({
                type: 'CHANGE_MENU',
                function: 'SHRINK'
            });
        } else {
            dispatch({
                type: 'CHANGE_MENU',
                function: 'EXTEND'
            });
        }
    }


    return(
        <IconContext.Provider value={{color: 'grey'}}>
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
                                {/*
                                <Link to="/notifications" className="notif_icon">
                                    <FaIcons.FaBell/>
                                </Link>
                                */}
                                { notifications.length && 
                                    <DropdownButton
                                        menuAlign="right"
                                        title={<FaIcons.FaBell/>}
                                        id="dropdown-menu-align-right"
                                        className="notif_icon"
                                    >
                                        <Dropdown.ItemText><h4>Notificações</h4></Dropdown.ItemText>
                                        <Dropdown.Divider /> 
                                        <Dropdown.ItemText>{
                                            <div className="row">
                                                {notifications.map(function(notification, index) {
                                                    var current_date = new Date();
                                                    current_date.setTime(current_date.getTime() - new Date().getTimezoneOffset()*60*1000);
                                                    current_date = current_date.getTime() / 60000;
                                                    var notification_date = new Date(notification.notification_date).getTime() / 60000;
                                                    var difference = current_date - notification_date;
                                                    return (
                                                        <>
                                                        <div className="col-9" style={{width: 350, fontSize: 18}}>
                                                            { (notification.notification_type === "F" && 
                                                                <p style={{marginBottom: "0.3em"}}>{notification.sender} enviou-te um pedido de amizade.</p>)
                                                            || (notification.notification_type === "T" && 
                                                                <p style={{marginBottom: "0.3em"}}>{notification.sender} convidou-te para participares no seu torneio.</p>)
                                                            || (notification.notification_type === "P" && 
                                                                <p style={{marginBottom: "0.3em"}}>{notification.sender} convidou-te para jogares.</p>)
                                                            }
                                                            { (difference < 60 &&
                                                                <p style={{fontSize: 13}}>há { Number.parseInt(difference)} minutos</p>)
                                                            || ( 60 <= difference & difference < 60 * 24 &&
                                                                <p style={{fontSize: 13}}>há { Number.parseInt(difference/60)} horas</p>)
                                                            || ( 60 * 24 <= difference &&
                                                                <p style={{fontSize: 13}}>há { Number.parseInt(difference/(60*24))} dia</p>)   
                                                            }
                                                        </div>
                                                        <div className="col-3" style={{width: 100}} >
                                                            <div className="text-right text-bottom" style={{height: "30px", marginTop: "40%"}}>
                                                                { (notification.notification_type === "F" && 
                                                                    <FaIcons.FaCheckCircle onClick={ () => {NotificationsService.accept_friendship(notification); notifyFriendshipSucess(); deleteNotification(index);}} className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
                                                                || (notification.notification_type === "T" && 
                                                                    <FaIcons.FaCheckCircle  className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
                                                                || (notification.notification_type === "P" && 
                                                                    <FaIcons.FaCheckCircle className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
                                                                }
                                                                <span> </span>
                                                                <FaIcons.FaTimesCircle className="icon_notifications" onClick={ () => {NotificationsService.delete(notification.id); notifyNotificationDelete(); deleteNotification(index); }} style={{fontSize: 25}} color="#ff0015" />
                                                            </div>
                                                            
                                                        </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        }</Dropdown.ItemText>
                                    </DropdownButton>
                                }

                                { !notifications.length && 
                                    <DropdownButton
                                    menuAlign="right"
                                    title={<FaIcons.FaBell/>}
                                    id="dropdown-menu-align-right"
                                    className="notif_icon"
                                >
                                    <Dropdown.ItemText><h4 style={{width: 350}}>Notificações</h4></Dropdown.ItemText>
                                    <Dropdown.Divider /> 
                                    <Dropdown.ItemText>Não possui nenhuma notificação.</Dropdown.ItemText>
                                </DropdownButton>
                                }
                            </div>
                        </div>
                    }
                    {!free_user &&
                        <div className="friends">
                            <div className="friends_section">
                                {/*
                                <Link to="/friends" className="friends_icon">
                                    <FaIcons.FaUserFriends/>
                                </Link>
                                */}
                                <DropdownButton
                                    menuAlign="right"
                                    title={<FaIcons.FaUserFriends/>}
                                    id="dropdown-menu-align-right"
                                    className="friends_icon"
                                >
                                    <Dropdown.ItemText><div style={{width: 230}}><h4>Amigos</h4></div></Dropdown.ItemText>
                                    <Dropdown.Divider />
                                    { notifications.length && 
                                        <>
                                        { notifications.filter(function (e) {return e.notification_type === "F"}).length > 0 && 
                                            <>
                                            <Dropdown.ItemText>
                                                {notifications.map(function(notification, index) {
                                                    return (
                                                        <>
                                                        { notification.notification_type === "F" && 
                                                            <div className="row" >
                                                                <div className="col-7">
                                                                    <h5>{notification.sender}</h5>
                                                                </div>
                                                                <div className="col-5">
                                                                    <div className="text-right">
                                                                        <FaIcons.FaCheckCircle onClick={ () => {NotificationsService.accept_friendship(notification); notifyFriendshipSucess(); deleteNotification(index);}} className="icon_notifications" style={{fontSize: 25}} color="#03f900" />
                                                                        <span> </span>
                                                                        <FaIcons.FaTimesCircle onClick={ () => {NotificationsService.delete(notification.id); notifyNotificationDelete(); deleteNotification(index); }} className="icon_notifications" style={{fontSize: 25}} color="#ff0015" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        </>
                                                        )
                                                    })
                                                }
                                            </Dropdown.ItemText>
                                            <Dropdown.Divider />
                                            </>
                                        }
                                        </>  
                                    }
                                    { friends.length &&
                                        <Dropdown.ItemText>{
                                            <div className="row">
                                                {friends.map(function(name, index) {
                                                    return (
                                                        <>
                                                        <div className="col-9">
                                                            <h5>{name.username}</h5>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="text-right">
                                                                <FaIcons.FaEnvelopeSquare className="icon_notifications" style={{fontSize: 25}} />
                                                            </div>
                                                        </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        }</Dropdown.ItemText>
                                    }
                                    { !friends.length &&
                                        <Dropdown.ItemText>Ainda não possui amigos.</Dropdown.ItemText>
                                    }
                                </DropdownButton>
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
                    {sidebarData_group1.map((item) =>{
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
            <Toaster toastOptions={{
            className: '',
            style: {
            border: '1px solid #4BB543',
            padding: '16px',
            color: '#4BB543',
            },
            }} />
        </IconContext.Provider>
        
    )
}

export default Menu;

