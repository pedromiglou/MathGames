/* React and React-Icons */
import React, { useState, useEffect } from 'react';
import {IconContext} from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from "react-icons/fi";
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import toast from 'react-hot-toast';

/* Css */
import './Menu.css'

/* Data and Service */
import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';
import {urlWeb} from './../../data/data';

import Avatar from "../../Components/Avatar";


/* Redux */
import { useDispatch } from 'react-redux';

function Navbar() {
	const dispatch = useDispatch();

	//Talvez se venham a usar estes tambem, dont delete
    /*
    const [user, setUser] = useState(false);
    const [tournament_user, setTournament_user] = useState(false);
    */
    const [user_authenticated, setUser_authenticated] = useState(true);
    const [user, setUser] = useState("");

    const [friends, setFriends] = useState([]);
    const [notifications, setNotifications] = useState([]);

	const [hat, setHat] = useState("none");
    const [shirt, setShirt] = useState("Camouflage1");
    const [color, setColor] = useState("#FFAF00");
    const [accessorie, setAccessorie] = useState("none");
    const [trouser, setTrouser] = useState("#808080");


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

	const deleteNotification = (e) => {
        const newNotifications = [...notifications];
        newNotifications.splice(e, 1);
        setNotifications(newNotifications);
    }

	const getLevel = (account_level) => {
		var contador = 1;
		if (typeof account_level !== "undefined") {
			while (true) {
				var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
				var maximo = 400 * Math.pow(contador, 1.1);
				if ( (minimo <= account_level) && (account_level < maximo)) {
					return contador;
				}
				contador++;
			}
		} else {
			return 0;
		}
	}

	function run_logout() {
		sessionStorage.removeItem("user");
		window.location.assign(urlWeb)
	}

    // Tem de colocar no redux o tipo de user
    useEffect(() => {
		var current_user = AuthService.getCurrentUser();
		setUser(current_user);

		// Load user friends list
        async function fetchApiFriends() {
            var response = await UserService.getFriends(current_user.id);
			if ( response != null )
            	setFriends(response);
        }

		// Load user notifications
        async function fetchApiNotifications() {
            var response = await UserService.getNotifications(current_user.id);
			if ( response != null )
				setNotifications(response);
        }

		// Load Avatar
		async function fetchApiUserById() {
            var user = await UserService.getUserById(current_user.id);
            setUser(user);
            setHat(user.avatar_hat);
            setShirt(user.avatar_shirt);
            setColor(user.avatar_color);
            setAccessorie(user.avatar_accessorie);
            setTrouser(user.avatar_trouser);
        }

		if (current_user !== null) {
            setUser_authenticated(true);
            fetchApiFriends();
            fetchApiNotifications();
			fetchApiUserById();
            dispatch({
                type: 'NFREEUSER'
            });
        } else {
            setUser_authenticated(false);
            dispatch({
                type: 'FREEUSER'
            });
        }
    }, [dispatch])
	return (
		<IconContext.Provider value={{color: 'grey'}}>
			<div id="horizontal_nav_row" className="row sticky-top">

				<div id="row-logo" className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 d-flex align-items-center">
					<div className="nav-logo ml-5">
						<Link to="/">
							<img  className="logo" src={process.env.PUBLIC_URL + "/images/logo-light.png"}  alt="logo"/>
						</Link>
					</div>
				</div>

				{user_authenticated &&
				<div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
					<div className="row h-100 nav-options float-right">
						<div title="Notificações" className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 d-flex align-items-center justify-content-center">
							<span id="notifs-number">{ notifications.length }</span>
							<DropdownButton	menuAlign="right" title={<FaIcons.FaBell size={42}/>} id="notifs-dropdown" className="navbar-dropdown">
								<Dropdown.ItemText><h4>Notificações</h4></Dropdown.ItemText>
								<Dropdown.Divider />
								{ notifications.length > 0 &&
								<Dropdown.ItemText>
									<div className="navbar-dropdown-row">
										{notifications.map(function(notification, index) {
											var current_date = new Date();
											//current_date.setTime(current_date.getTime() - new Date().getTimezoneOffset()*60*1000);
											current_date = current_date.getTime() / 60000;
											var notification_date = new Date(notification.createdAt).getTime() / 60000;
											var difference = current_date - notification_date;
											return (
												<div className="row">
													<div className="col-9" style={{fontSize: 18}}>
														{ (notification.notification_type === "F" && 
															<p style={{marginBottom: "0.3em"}}>{notification.sender_user.sender} enviou-te um pedido de amizade.</p>)
														|| (notification.notification_type === "T" && 
															<p style={{marginBottom: "0.3em"}}>{notification.sender_user.sender} convidou-te para participares no seu torneio.</p>)
														|| (notification.notification_type === "P" && 
															<p style={{marginBottom: "0.3em"}}>{notification.sender_user.sender} convidou-te para jogares.</p>)
														}
														{ (difference < 60 &&
															<p style={{fontSize: 13}}>há { Number.parseInt(difference)} minutos</p>)
														|| ( 60 <= difference & difference < 60 * 24 &&
															<p style={{fontSize: 13}}>há { Number.parseInt(difference/60)} horas</p>)
														|| ( 60 * 24 <= difference &&
															<p style={{fontSize: 13}}>há { Number.parseInt(difference/(60*24))} dia</p>)   
														}
													</div>
													<div className="col-3" >
														<div className="text-right text-bottom" style={{marginTop: "20%"}}>
															{ (notification.notification_type === "F" && 
																<FaIcons.FaCheckCircle onClick={ () => {UserService.accept_friendship(notification); notifyFriendshipSucess(); deleteNotification(index);}} className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
															|| (notification.notification_type === "T" && 
																<FaIcons.FaCheckCircle  className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
															|| (notification.notification_type === "P" && 
																<FaIcons.FaCheckCircle className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
															}
															<span> </span>
															<FaIcons.FaTimesCircle className="icon_notifications" onClick={ () => {UserService.delete(notification.id); notifyNotificationDelete(); deleteNotification(index); }} style={{fontSize: 25}} color="#ff0015" />
														</div>
														
													</div>
												</div>
											);
										})}
									</div>
								</Dropdown.ItemText>
								}
								{ notifications.length === 0 &&
									<Dropdown.ItemText>
										<div className="row navbar-dropdown-row">
											<Dropdown.ItemText>Não possui nenhuma notificação.</Dropdown.ItemText>
										</div>
									</Dropdown.ItemText>
								}
							</DropdownButton>
						</div>
						<div title="Amigos" className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 d-flex align-items-center justify-content-center">
							<DropdownButton	menuAlign="right" title={<FaIcons.FaUserFriends size={42}/>} id="friends-dropdown">
								<Dropdown.ItemText><div style={{width: 230}}><h4>Amigos</h4></div></Dropdown.ItemText>
								<Dropdown.Divider />
								{ friends.length > 0 &&
								<Dropdown.ItemText>{
										<ul style={{fontSize:20}}>
										{friends.map(function(user, index) {
											return (
												<li key={user.id} class="list-group-item d-flex justify-content-between align-items-center" style={{border: 0, padding: 5}}>
													{user.username}
													<FaIcons.FaEnvelopeSquare className="icon_notifications" style={{fontSize: 25}} />
												</li>
											);
										})}
										</ul>
								}</Dropdown.ItemText>
								}
								{ friends.length === 0 &&
								<Dropdown.ItemText>
									<div className="row navbar-dropdown-row">
										<Dropdown.ItemText>Não possui amigos.</Dropdown.ItemText>
									</div>
								</Dropdown.ItemText>
								}
							</DropdownButton>
						</div>

						<div className="col-xl-6 col-lg-8 col-md-8 col-sm-6 col-xs-6 no-margin">
							<div className="h-100 d-flex align-items-center ">
								<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">
									<div title="Perfil" className="round_profile_logo float-right">
										<Link to="/profile">
											<Avatar navbar={true} skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
										</Link>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6 navbar-account-info">
									<h5>Nome: {user.username} </h5>
									<h5>Nivel: {getLevel(user.account_level)} </h5>
								</div>
								<div className="col-xl-5 col-lg-5 col-md-4 col-sm-6 col-xs-6">
									<Link to="/">
										<h2 onClick={run_logout} className="h2-login">Logout</h2>
										<IconContext.Provider  value={{color: '#007bff'}}><FiIcons.FiLogOut className="icon_notifications"  size={42} onClick={run_logout}/></IconContext.Provider>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				}
				
				{!user_authenticated &&
				<div className="col d-flex justify-content-end align-items-center mr-5">
					<hr className="menu-divider-login"></hr>
					<Link to="/login">
						<h2 className="h2-login">Login <IconContext.Provider value={{color: '#007bff'}}><FiIcons.FiLogIn className="icon_notifications"  size={42} /></IconContext.Provider>
						</h2>
						
					</Link>
				</div>
				}
			</div>
			{/* <Toaster toastOptions={{
            className: '',
            style: {
            border: '1px solid #4BB543',
            padding: '16px',
            color: '#4BB543',
            },
            }} /> */}
		</IconContext.Provider>
	)
}

export default Navbar;