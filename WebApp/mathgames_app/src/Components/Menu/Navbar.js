/* React and React-Icons */
import React, { useState, useEffect } from 'react';
import {IconContext} from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from "react-icons/fi";
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
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
import socket from "../../index"

import { Modal, Button } from "react-bootstrap";

import { Card } from "react-bootstrap";

/* Redux */
import { useDispatch } from 'react-redux';

/* ChooseGameModalFriends */
import { games_info } from "../../data/GamesInfo";

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

	const [linktogamehref, setLinkToGameHref] = useState("")
	const [linktogame2href, setLinkToGame2Href] = useState("")

	const [modalConfirmShow, setConfirmModalShow] = useState(false);
	const [modalUsername, setModalUsername] = useState("");
	const [modalId, setModalUserId] = useState(0);

	const [modalChooseGame, setModalChooseGame] = useState(false);
	const [InvUser, setInvUser] = useState([]);
	// const [canPlay, setCanPlay] = useState(false);
	// const [choosenGameId, setGameId] = useState(-1);


	var choosenGame = -1;

	function ExpireModal(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Convite expirou
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{color: "#0056b3", fontSize: 20}}>O convite já não está disponível. </p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Ok</Button>
            </Modal.Footer>
          </Modal>
        );
      }
	
	function GameModal(props) {
	return (
		<Modal
		{...props}
		size="md"
		aria-labelledby="contained-modal-title-vcenter"
		centered
		>
		<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
			Convidar {InvUser[1]} para jogar!
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<p style={{color: "#0056b3", fontSize: 20}}>Escolhe o jogo que queres jogar</p>
			<div className="row modal-games">
				{Object.entries(games_info).map(([key, value]) => (		
					<div className={value["toBeDone"] ? "not-display" : "col-lg-6 centered set-padding"} key={key} id={key + "_Card"}>
						{/* <Card id={"card-" + value["title"]} className="game-card" onClick={() => {setGameId(value["id"]);}}> */}
						<Card id={"card-" + value["title"]} className="game-card" onClick={() => {choosenGame = value["id"];changeGame(value["title"])}}>
							<div>
							
								<img src={value["img"]}
										alt="Info"
										className="game-img"
										id={key}
										/>
							
								<h2>
									{value["title"]}
								</h2>
							</div>
						</Card>
					</div>
				))}
			</div>

		</Modal.Body>
		<Modal.Footer>
			
			<Button style={{fontSize: 18}} id="confirm-b" onClick={() => {button_confirm(InvUser[0])}} className="btn save-btn">Confirmar</Button>
			<Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
		</Modal.Footer>
		</Modal>
	);
	}


	function ConfirmOperationModal(props) {
		let modal_username = props.username;

        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Remover Amizade com {modal_username}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{color: "#0056b3", fontSize: 20}}>Tem a certeza que pretende remover a sua amizade com {modal_username}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => {remove_friend(props.id); props.onHide();}} className="btn save-btn">Confimar</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        );
      }

	function button_confirm(user_id){
		if (choosenGame === -1){
			alert("Seleciona um jogo")
		} else{
			setModalChooseGame(false)
			invite_for_game(user_id);
		}	
	}

	function changeGame(game){
		document.getElementById("confirm-b").disabled = false;
		const cards =  []
		for (var [key,value] of Object.entries(games_info)) {
			if (!value["toBeDone"] && key !== -1){
				
				var card = document.getElementById("card-" + value["title"]);
				cards.push(
					{ key: value["title"],
					  value:card
					}
				);
			}
		}

		for (let i = 0; i < cards.length; i++){
			if (game === cards[i].key){
				if (cards[i].value.classList.contains("not-active")){
					cards[i].value.classList.remove("not-active")
				}
				cards[i].value.classList.add("active") 
			} else {
				if (cards[i].value.classList.contains("active")){
					cards[i].value.classList.remove("active")
				}
				cards[i].value.classList.add("not-active") 
			}
		} 
	}

	

	var current_user = AuthService.getCurrentUser();

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

	async function invite_for_game(invited_player) {
		localStorage.setItem("jogoporinvite", true)
		localStorage.setItem("outrojogador", invited_player)
		//var notification_text = current_user.username + " convidou-te para jogares."
		//await UserService.send_notification_request(current_user.id, invited_player, "P", notification_text);
		var elemento = document.getElementById("linktogame")
		var url = "/gamePage?id=" + choosenGame
		setLinkToGameHref(url)
		elemento.click()
		//window.location.href = "http://localhost:3000/gamePage?id=0"
		
	}

	function accept_game(notification, index) {
		deleteNotification(index);
		UserService.delete(notification.id);
		var id_outro_jogador = notification.sender_user.sender_id
		
		socket.once("match_link", (msg) => {
			if (msg["match_id"]) {
				let new_match_id = msg['match_id'];
				let game_id = msg['game_id']

				localStorage.setItem("entreijogoporinvite", true)
				localStorage.setItem("outrojogador", id_outro_jogador)
				var elemento = document.getElementById("linktogame2")
				var url = "/gamePage?id="+game_id+"&mid=" + new_match_id
				setLinkToGame2Href(url)
				elemento.click()
				//window.location.href = "http://localhost:3000/gamePage?id=0&mid=" + new_match_id
			} else if (msg["error"]) {
				setConfirmModalShow(true)
			}
		})

		socket.emit("get_match_id", {"user_id": AuthService.getCurrentUserId(), "outro_id": id_outro_jogador})
	}



	function run_logout() {
		sessionStorage.removeItem("user");
		window.location.assign(urlWeb)
	}

	async function friendRequest() {
		var input = document.getElementById("inputFriend")
		var other_username = input.value
		var notification_text = current_user.username + " enviou-te um pedido de amizade."
		if (other_username !== undefined && other_username !== null && other_username !== "") {
			//UserService.send_notification_request_by_username(current_user.id, other_username, "F", notification_text);
			var receiver = await UserService.getUserByUsername(other_username)
			socket.emit("new_notification", {"sender": current_user.id, "receiver": receiver.id, "notification_type": "F", "notification_text": notification_text})
		}
		input.value = ""
		hideAddFriendInput();
	}

	async function accept_friendRequest(notification) {
		await UserService.accept_friendship(notification);
		var notification_text = current_user.username + " aceitou o teu pedido de amizade."
		socket.emit("new_notification", {"sender": current_user.id, "receiver": notification.sender_user.sender_id, "notification_type": "A", "notification_text": notification_text})
		fetchFriends()
	}

	async function remove_friend(friend2) {
		await UserService.remove_friend(current_user.id, friend2);
		var notification_text = current_user.username + " removeu-te da sua lista de amigos."
		socket.emit("new_notification", {"sender": current_user.id, "receiver": friend2, "notification_type": "N", "notification_text": notification_text})
		fetchFriends()
	}


	// Load user notifications
	async function fetchNotifications() {
		var response = await UserService.getNotifications(current_user.id);
		if ( response != null )
			setNotifications(response);
	}

	// Load user friends list
	async function fetchFriends() {
		var response = await UserService.getFriends(current_user.id);
		if ( response != null )
			setFriends(response);
	}

	socket.off("reload_notifications")
	
	socket.on("reload_notifications", (msg) => {
		fetchNotifications();
		fetchFriends();
	})


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


	function showAddFriendInput(){
		let inviteFriend_Separator_div = document.getElementById("inviteFriend-Separator");
		let inviteFriend_div = document.getElementById("inviteFriend");
		inviteFriend_div.style.display = "flex";
		inviteFriend_Separator_div.style.display = "flex";
	}

	function hideAddFriendInput(){
		let inviteFriend_Separator_div = document.getElementById("inviteFriend-Separator");
		let inviteFriend_div = document.getElementById("inviteFriend");
		inviteFriend_div.style.display = "none";
		inviteFriend_Separator_div.style.display = "none";
	}
	
	return (
		<IconContext.Provider value={{color: 'grey'}}>
			<div id="horizontal_nav_row" className="navbar-row sticky-top">

				<div id="row-logo" className="logo-bars-section">
					<div className="nav-logo ml-5">
						<Link to="/">
							<img  className="logo" src={process.env.PUBLIC_URL + "/images/logo-light.png"}  alt="logo"/>
						</Link>
					</div>
				</div>

				{/* <MdIcons.MdModeEdit size={40} id="edit-icon" className="edit-icon" title="editar" onClick={() => make_fields_editable()}/> */}

				{user_authenticated &&
				
					<div className="navbar-icons-flex">
						<div title="Notificações" className="d-flex align-items-center justify-content-center">
							<span id="notifs-number">{ notifications.length }</span>
							<DropdownButton	menuAlign="right" title={<FaIcons.FaBell className="navbar-icon"/>} id="notifs-dropdown" className="navbar-dropdown">
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
														{
														/* Notification_Type List:
															- F -> Enviou pedido de amizade
															- A -> Aceitou pedido de amizade
															- N -> Removeu da lista de amigos
															- T -> Convidou para participar no torneio
															- P -> Convidou-te para uma partida
															- R -> Iniciou um novo round do torneio
														*/
														}
														<p style={{marginBottom: "0.3em"}}>{notification.notification_text}</p>
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
																<FaIcons.FaCheckCircle onClick={ async () => {accept_friendRequest(notification); notifyFriendshipSucess(); deleteNotification(index);}} className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
															|| (notification.notification_type === "T" && 
																<FaIcons.FaCheckCircle  className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
															|| (notification.notification_type === "P" && 
																<FaIcons.FaCheckCircle  onClick={ () => {accept_game(notification, index);}} className="icon_notifications" style={{fontSize: 25}} color="#03f900" />)
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


						<ExpireModal
							show={modalConfirmShow}
							onHide={() => {setConfirmModalShow(false);}}
						/>



						<div title="Amigos" className="d-flex align-items-center justify-content-center">
							<DropdownButton	menuAlign="right" title={<FaIcons.FaUserFriends className="navbar-icon"/>} id="friends-dropdown">
								<Dropdown.ItemText>
									<div className="friends-modal">
										<h4>Amigos</h4>
										<div onClick={() => showAddFriendInput()} title="Adicionar amigo" className="button-add-friend">
											<span className="shadow"></span>
											<span className="front"><FaIcons.FaUserPlus size={24} color={"white"}/></span>
										</div>
									</div>
								</Dropdown.ItemText>
								<Dropdown.Divider />
								<Dropdown.ItemText id="inviteFriend" style={{display: "none"}}>
									<div className="addFriendRow">
										<input id="inputFriend" type="text" className="inputAddFriend" placeholder="username"></input>
										<div onClick={() => friendRequest()} title="Enviar pedido" className="invite-friend-button">
											<span className="shadow"></span>
											<span className="front">Enviar</span>
										</div>
										{/* <button type="button" onClick={() => friendRequest()}>Enviar</button> */}
									</div>
								</Dropdown.ItemText>
								<Dropdown.Divider id="inviteFriend-Separator" style={{display: "none"}} />

								{ friends.length > 0 &&
								<Dropdown.ItemText>{
									<>
										<ul className="list-friends">
										{friends.map(function(user, index) {
											return (
												<li key={user.id} className="list-item-friends">
													{user.username}
													<div>
														{/* <FaIcons.FaEnvelopeSquare title="Convidar para jogo" className="icon_notifications" style={{fontSize: 25}} onClick={() => {invite_for_game(user.id)}} /> */}
														<FaIcons.FaEnvelopeSquare title="Convidar para jogo" className="icon_notifications" style={{fontSize: 25}} onClick={() => {setModalChooseGame(true); setInvUser([user.id, user.username])}} />
														<IoIcons.IoPersonRemove title="Remover Amigo" className="icon_notifications" style={{fontSize: 25}} onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setConfirmModalShow(true);}} />
													</div>
												</li>
											);
										})}
										</ul>
										<ConfirmOperationModal
										show={modalConfirmShow}
										onHide={() => setConfirmModalShow(false)}
										username={modalUsername}
										id={modalId}
									/>
									</>
								}</Dropdown.ItemText>
								}
								{ friends.length === 0 &&
								<Dropdown.ItemText>
									<div className="row">
										Não possui amigos.
									</div>
								</Dropdown.ItemText>
								}
							</DropdownButton>
						</div>



						<div>
							<div title="Perfil" className="round_profile_logo">

								<DropdownButton	menuAlign="left" title={<>
									<Avatar navbar={true} skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
									<MdIcons.MdKeyboardArrowDown color={"rgb(2, 204, 255)"} className="key-down"/>
								</>}
								id="user_dropdown">
									<Dropdown.ItemText>
										<div className="perfil-info-modal">
											<h5>{user.username} </h5>
											<h5>Nivel: {getLevel(user.account_level)} </h5>
										</div>
									</Dropdown.ItemText>
									<Dropdown.Divider />
									
									<Dropdown.ItemText>{
										<Link to="/profile" title="" className="remove-decoration icon-word">
											<CgIcons.CgProfile/><h4>Perfil</h4>
										</Link>
									}</Dropdown.ItemText>

									<Dropdown.Divider />
									<Dropdown.ItemText>{ 
										<Link to="/" title="" className="remove-decoration icon-word">
											<FiIcons.FiLogOut className="icon_notifications" onClick={run_logout}/>
											<h4 onClick={run_logout}>Terminar Sessão</h4>
											
										</Link>
									}</Dropdown.ItemText>
								</DropdownButton>

							
							</div>
							<h5 className="user-name">{user.username} </h5>
						</div>
						
					<GameModal
						show={modalChooseGame}
						onHide={() => {setModalChooseGame(false);}}
					/>
				</div>
				}
				
				{!user_authenticated &&
				<div className="navbar-icons-flex login-case">
					<Link to="/login" className="login-button">
						<FiIcons.FiLogIn className="navbar-icon" title="login"/>
						<h2 className="h2-login">Login </h2>
						
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

			<div style={{display:"none", visibility:"hidden"}}>
				<Link id="linktogame" to={linktogamehref}>
				
				</Link>
	
				<Link id="linktogame2" to={linktogame2href}>
					
				</Link>
			</div>
		</IconContext.Provider>
	)
}

export default Navbar;