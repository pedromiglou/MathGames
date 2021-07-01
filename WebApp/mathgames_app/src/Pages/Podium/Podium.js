import React, { useState, useEffect } from 'react';

import "./Podium.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "@material-ui/lab/Pagination";
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import { Modal } from "react-bootstrap";

import socket from "../../index"


import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';

function Podium() {
	var current_user = AuthService.getCurrentUser();

	const [users, setUsers] = useState([]);
	const [banned_users, setBannedUsers] = useState([]);
	const [normal_users, setNormalUsers] = useState([]);
	const [privilege_users, setPrivilegeUsers] = useState([]);
	const [admin_users, setAdminUsers] = useState([]);
	const [friends, setFriends] = useState([]);

	var [numberClassificationUsers, setNumberClassificationUsers] = useState([]);
	var [numberClassificationNormalUsers, setNumberClassificationNormalUsers] = useState([]);
	var [numberClassificationPrivilegeUsers, setNumberClassificationPrivilegeUsers] = useState([]);
	var [numberClassificationAdminUsers, setNumberClassificationAdminUsers] = useState([]);
	var [numberClassificationBannedUsers, setNumberClassificationBannedUsers] = useState([]);
	const [filterOption, setfilterOption] = useState("AllPlayers");
	
	const [page_users, setPageUsers] = useState(1);
	const [count_users, setCountUsers] = useState(0);
	const [page_normal_users, setPageNormalUsers] = useState(1);
	const [count_normal_users, setCountNormalUsers] = useState(0);
	const [page_privilege_users, setPagePrivilegeUsers] = useState(1);
	const [count_privilege_users, setCountPrivilegeUsers] = useState(0);
	const [page_admin_users, setPageAdminUsers] = useState(1);
	const [count_admin_users, setCountAdminUsers] = useState(0);
	const [page_banned_users, setPageBannedUsers] = useState(1);
	const [count_banned_users, setCountBannedUsers] = useState(0);
	
	const [normal_inputs, setNormalInputs] = useState({username: "", min_level: "", max_level: ""});
	const [privilege_inputs, setPrivilegeInputs] = useState({username: "", min_level: "", max_level: ""});
	const [banned_inputs, setBannedInputs] = useState({username: "", min_level: "", max_level: ""});
	const [admin_inputs, setAdminInputs] = useState({username: "", min_level: "", max_level: ""});
	const [allusers_inputs, setAllUsersInputs] = useState({username: "", min_level: "", max_level: ""});

	const [modalConfirmShow, setConfirmModalShow] = useState(false);
	const [modalOperation, setModalOperation] = useState("");
	const [modalUsername, setModalUsername] = useState("");
	const [modalId, setModalUserId] = useState(0);

	const [friendRequestSucess, setFriendRequestSucess] = useState(false);
	const [reportSucess, setReportSucess] = useState(false);
	const [reportAlreadyMadeError, setReportAlreadyMade] = useState(false);
	
	const handlePageChangeUsers = (event, value) => {
		setPageUsers(value);
	};

	const handlePageChangeUsersBanned = (event, value) => {
		setPageBannedUsers(value);
	};

	const handlePageChangeUsersNormal = (event, value) => {
		setPageNormalUsers(value);
	};

	const handlePageChangeUsersPrivilege = (event, value) => {
		setPagePrivilegeUsers(value);
	};

	const handlePageChangeUsersAdmin = (event, value) => {
		setPageAdminUsers(value);
	};
	
	function friend_request(friend2) {
		//UserService.send_notification_request(current_user.id, friend2, "F");
		var notification_text = current_user.username + " enviou-te um pedido de amizade."
		socket.emit("new_notification", {"sender": current_user.id, "receiver": friend2, "notification_type": "F", "notification_text": notification_text})

	}

	async function remove_friend(friend2) {
		await UserService.remove_friend(current_user.id, friend2);
		var notification_text = current_user.username + " removeu-te da sua lista de amigos."
		socket.emit("new_notification", {"sender": current_user.id, "receiver": friend2, "notification_type": "N", "notification_text": notification_text})
		window.location.reload();
	}

	async function report_player(player) {
		let reason = document.getElementById("reason").value;
		let response = await UserService.report_player(current_user.id, player, reason);
		if (response.report_already_made) {
			setReportAlreadyMade(true);
		}
		if (!response.error) {
			setReportSucess(true)
		} 
	}

	async function ban_player(player) {
		await UserService.ban_player(player);
		retrieveUsers()
	}

	async function remove_ban(player) {
		await UserService.remove_ban(player);
		retrieveUsers()
	}

	async function upgrade_account(player) {
		await UserService.upgrade_account(player);
		retrieveUsers()
	}

	async function downgrade_account(player) {
		await UserService.downgrade_account(player);
		retrieveUsers()
	}

	const retrieveUsers = () => {
		var current_user = AuthService.getCurrentUser();
		async function fetchApiUsers() {
			let username = allusers_inputs.username;
			let min_level = allusers_inputs.min_level;
			let max_level = allusers_inputs.max_level;
			var response = await UserService.getUsers(username, min_level, max_level, parseInt(page_users)-1, 10);
			console.log(response)
			if (!response["message"]) {
				setUsers(response.users);
				setCountUsers(response.totalPages)
				setNumberClassificationUsers((parseInt(page_users)-1)*10);
			}
        };

		async function fetchApiUsersBanned() {
			let username = banned_inputs.username;
			let min_level = banned_inputs.min_level;
			let max_level = banned_inputs.max_level;
			var response = await UserService.getUsersBanned(username, min_level, max_level, parseInt(page_banned_users)-1, 10);
			if (!response["message"]) {
				setBannedUsers(response.users);
				setCountBannedUsers(response.totalPages)
				setNumberClassificationBannedUsers((parseInt(page_banned_users)-1)*10);
			}
        };

		async function fetchApiUsersNormal() {
			let username = normal_inputs.username;
			let min_level = normal_inputs.min_level;
			let max_level = normal_inputs.max_level;
			var response = await UserService.getUsersNormal(username, min_level, max_level, parseInt(page_normal_users)-1, 10);
			if (!response["message"]) {
				setNormalUsers(response.users);
				setCountNormalUsers(response.totalPages)
				setNumberClassificationNormalUsers((parseInt(page_normal_users)-1)*10);
			}
        };

		async function fetchApiUsersPrivilege() {
			let username = privilege_inputs.username;
			let min_level = privilege_inputs.min_level;
			let max_level = privilege_inputs.max_level;
			var response = await UserService.getUsersPrivilege(username, min_level, max_level, parseInt(page_privilege_users)-1, 10);
			if (!response["message"]) {
				setPrivilegeUsers(response.users);
				setCountPrivilegeUsers(response.totalPages)
				setNumberClassificationPrivilegeUsers((parseInt(page_privilege_users)-1)*10);
			}
        };

		async function fetchApiUsersAdmin() {
			let username = admin_inputs.username;
			let min_level = admin_inputs.min_level;
			let max_level = admin_inputs.max_level;
			var response = await UserService.getUsersAdmin(username, min_level, max_level, parseInt(page_admin_users)-1, 10);
			if (!response["message"]) {
				setAdminUsers(response.users);
				setCountAdminUsers(response.totalPages);
				setNumberClassificationAdminUsers((parseInt(page_admin_users)-1)*10);
			}
        };

		async function fetchApiFriends(userId) {
            var response = await UserService.getFriends(userId);
			if (!response.error) {
            	setFriends(response);
			}
        };

		if (current_user !== null) {
			fetchApiFriends(current_user.id)
		}
		
		if (current_user !== null && current_user["account_type"] === "A") {
			fetchApiUsersNormal()
			fetchApiUsersBanned() 
			fetchApiUsersPrivilege()
			fetchApiUsersAdmin()
		}
		fetchApiUsers();
	}

	function submitFunction(event) {
		event.preventDefault();
		document.getElementById("searchButton").click();
	}

	function view(mode) {
		setfilterOption(mode);
	}

	function ConfirmOperationModal(props) {
		let modal_username = props.username;
		let title = "";
		let text = "";
		let modal_function = null;
		let report = false;
		if (props.operation === "upgrade") {
			title = "Aumentar Privilégios";
			text = "Tem a certeza que pretende aumentar os privilégios da conta " + modal_username + "?";
			modal_function = upgrade_account;
		} else if (props.operation === "downgrade") {
			title = "Diminuir Privilégios";
			text = "Tem a certeza que pretende diminuir os privilégios da conta " + modal_username + "?";
			modal_function = downgrade_account;
		} else if (props.operation === "ban") {
			title = "Banir Jogador";
			text = "Tem a certeza que pretende banir a conta " + modal_username + "?";
			modal_function = ban_player;
		} else if (props.operation === "remove_ban") {
			title = "Remover Ban de Jogador";
			text = "Tem a certeza que pretende remover o ban da conta " + modal_username + "?";
			modal_function = remove_ban;
		} else if (props.operation === "remove_friend") {
			title = "Remover Amizade com " + modal_username;
			text = "Tem a certeza que pretende remover a sua amizade com " + modal_username + "?";
			modal_function = (userid) => {remove_friend(userid);};
		} else if (props.operation === "friend_request") {
			title = "Pedir Amizade a " + modal_username;
			text = "Tem a certeza que pretende enviar um pedido de amizade a " + modal_username + "?";
			modal_function = (userid) => {friend_request(userid); setFriendRequestSucess(true)};
		} else if (props.operation === "report_player") {
			title = "Reportar Jogador " + modal_username;
			text = "Tem a certeza que pretende reportar o seguinte jogador: " + modal_username + "?";
			modal_function = (userid) => {report_player(userid);};
			report = true;
		}
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{color: "#0056b3", fontSize: 20}}>{text}</p>
			  { report && 
			  	<>
			  	<label style={{color: "#0056b3", fontSize: 20}} for="reason">Motivo: </label>
			  	<select id="reason" className="form-select" aria-label="Default select example">
				  <option selected value="Uso Batota">Uso Batota</option>
				  <option value="Exploração de Bug">Exploração de Bug</option>
				  <option value="Nome inapropriado">Nome inapropriado</option>
				</select>
				</>
			  }
            </Modal.Body>
            <Modal.Footer>
			  	<div id="confirm-b" title="Confirmar" onClick={() => {modal_function(props.id); props.onHide();}}  className="button-clicky-modal confirm-modal">
					<span className="shadow"></span>
					<span className="front">Confirmar</span>
				</div>
				<div id="cancel-b" title="Cancelar" onClick={props.onHide}  className="button-clicky-modal cancel-modal">
					<span className="shadow"></span>
					<span className="front">Cancelar</span>
				</div>
            </Modal.Footer>
          </Modal>
        );
      }

	console.log(current_user)

	useEffect(
		retrieveUsers
	, [page_users, page_banned_users, page_normal_users, page_privilege_users, page_admin_users, allusers_inputs, banned_inputs, normal_inputs, privilege_inputs, admin_inputs])

	function checkNumber(event){
		var charCode = (event.which) ? event.which : event.keyCode;
	
		if (charCode > 31 && (charCode < 48 || charCode > 57)){
			event.target.style.border = "4px solid red";
			event.preventDefault();
		}
		else {
			event.target.style.border = "4px solid green";
		}
	}

	return (
		<div>
			<br></br>

			{friendRequestSucess === true 
                ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                O Pedido de Amizade para {modalUsername} foi enviado com sucesso! 
                </div> : null}

			{reportSucess === true 
                ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                O Report para {modalUsername} foi realizado com sucesso! 
                </div> : null}

			{reportAlreadyMadeError === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}> 
                Erro. O Report para {modalUsername} já foi realizado. Apenas pode reportar uma vez cada jogador.
                 </div> 
                : null}

			{ current_user !== null && current_user["account_type"] === "A" &&

				<div className="col-lg-12 col-md-12 col-sm-12 animation-up" id="filter_options">
					<div className="row top-bar no-margin">
						<div className="col-lg-1 col-md-1 col-sm-1">
							
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 top-button">
							<button
								id="all_players"
								onClick={() => view("AllPlayers")}
								className={
									filterOption === "AllPlayers"
										? "box actived-btn"
										: "box up"
								}
							>
								Ver Todos
							</button>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 top-button">
							<button
								id="players"
								onClick={() => view("Players")}
								className={
									filterOption === "Players"
										? "box actived-btn"
										: "box up"
								}
							>
								Jogadores normais
							</button>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 top-button">
							<button
								id="privilege_players"
								onClick={() => view("PrivilegePlayers")}
								className={
									filterOption === "PrivilegePlayers"
										? "box actived-btn"
										: "box up"
								}
							>
								Jogadores com privilégios
							</button>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 top-button">
							<button
								id="admins"
								onClick={() => view("Admins")}
								className={
									filterOption === "Admins"
										? "box actived-btn"
										: "box up"
								}
							>
								Administradores
							</button>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 top-button">
							<button
								id="banned_players"
								onClick={() => view("BannedPlayers")}
								className={
									filterOption === "BannedPlayers"
										? "box actived-btn"
										: "box up"
								}
							>
								Jogadores banidos
							</button>
						</div>
					</div>
				</div>

			}

			<div className="list-users shadow3D animation-down">
				{ filterOption === "AllPlayers" && 
				<>
				<div className="filters">
					{ current_user !== null && current_user["account_type"] === "A" && 
						<div className="title-ind">
							<i><FaIcons.FaUserFriends/></i>
							<h1>Todos os Jogadores</h1>
						</div>
					}
					{ (current_user === null || current_user["account_type"] !== "A") && 
						<div className="title-ind">
							<i><GiIcons.GiPodium/></i>
							<h1>Classificações</h1>
						</div>
					}
					<div className="row">
						<div className="col-12 col-md-12 col-lg-12">
							<form className="shadow-white form-center" onSubmit={submitFunction}>
								<div className="form-players">
									<div className="name-section">
										<h2>Nome</h2>
										<div className="search-name">
											<input className="form-control form-control-lg" id="filter_username" type="search" placeholder="Procurar pelo nome de utilizador"/>
										</div>
									</div>
								
									<div className="level-section">
										<h2>Nivel</h2>
										<div className="search-level">
											<input className="form-control form-control-lg" id="filter_allusers_min_level" type="number" placeholder="Mínimo" min="1" onKeyPress={(e) => checkNumber(e)}/>
											<input className="form-control form-control-lg" id="filter_allusers_max_level" type="number" placeholder="Máximo" min="1" onKeyPress={(e) => checkNumber(e)}/>
										</div>
									</div>
								</div>
								
								<div id="searchButton" onClick={() => {setAllUsersInputs({ username: document.getElementById("filter_username").value, min_level: document.getElementById("filter_allusers_min_level").value, max_level: document.getElementById("filter_allusers_max_level").value }); setFriendRequestSucess(false); setReportSucess(false)}} className="button-clicky-podium search-clicky">
									<span className="shadow"></span>
									<span className="front">Procurar <FaIcons.FaSearch/></span>
								</div>
								{/* <button id="searchButton" onClick={() => {setAllUsersInputs({ username: document.getElementById("filter_username").value, min_level: document.getElementById("filter_allusers_min_level").value, max_level: document.getElementById("filter_allusers_max_level").value }); setFriendRequestSucess(false); setReportSucess(false)}} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button> */}
							</form>
							
						</div>
					</div>
				</div>
				
				<hr></hr>

				{count_users === 0 
				?
					<h1 className="no-results">Não foram encontrados jogadores com os filtros escolhidos</h1>
				:
					<>
						<ul className="list-group">
						<li className="list-group-item d-flex justify-content-between align-items-center row">
							<div className="col-lg-1 col-md-1 col-sm-1">
								
							</div>
							{
								current_user !== null && current_user["account_type"] === "A" 
								?  <>
									<div className="col-lg-2 col-md-2 col-sm-2">
										Nome
									</div>
									<div className="col-lg-2 col-md-2 col-sm-2">
										Conta
									</div>
									</>
								:
								<div className="col-lg-4 col-md-4 col-sm-4">
									Nome
								</div>
							}			
							<div className="col-lg-2 col-md-2 col-sm-2">
								Nivel
							</div>
							<div className="col-lg-3 col-md-3 col-sm-3">
								Experiência
							</div>

							{current_user !== null && 
								<div className="col-lg-2 col-md-2 col-sm-2">
									Ações
								</div>
							}
						</li>

						{users.map(function(user, index) {
							numberClassificationUsers++;
							var contador = 1;
							while (true) {
								var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
								var maximo = 400 * Math.pow(contador, 1.1);
								if ( (minimo <= user.account_level) && (user.account_level < maximo)) {
									break;
								}
								contador++;
							}
							return (
								<li key={user.id} className={(current_user !== null && current_user["username"] === user.username ) ? "list-group-item d-flex justify-content-between align-items-center row highlight" : "list-group-item d-flex justify-content-between align-items-center row"} >
									<div className="col-lg-1 col-md-1 col-sm-1 align-items-center">
										<span className="badge badge-primary badge-pill">{numberClassificationUsers}</span>
									</div>
									{
										current_user !== null && current_user["account_type"] === "A" 
										?  <>
											<div className="col-lg-2 col-md-2 col-sm-2">
												{user.username}
											</div>
											<div className="col-lg-2 col-md-2 col-sm-2">
												{user["account_type"]}
											</div>
											</>
										:
										<div className="col-lg-4 col-md-4 col-sm-4">
											{user.username}
										</div>
									}
									<div className="col-lg-2 col-md-2 col-sm-2">
										{contador}
									</div>
									<div className="col-lg-3 col-md-3 col-sm-3">
										{user.account_level} pontos
									</div>
									{current_user !== null && 
										<div className="col-lg-2 col-md-2 col-sm-2 podium-flex-buttons">
											{ current_user !== null && current_user["account_type"] !== "A" && 
												<>
												{ friends.length !== 0 &&
													<>
													{ friends.some(e => e.id === user.id) &&
														<>
														<div title="Remover Amigo" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_friend"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}  className="button-clicky-podium remove-friend">
															<span className="shadow"></span>
															<span className="front"><IoIcons.IoPersonRemove/></span>
														</div>
														<div title="Reportar Jogador" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}  className="button-clicky-podium report-player">
															<span className="shadow"></span>
															<span className="front"><MdIcons.MdReport/></span>
														</div>

														{/* <i className="subicon pointer"   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_friend"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonRemove/></i>
														<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i> */}
														</>
													} 
													{ (!friends.some(e => e.id === user.id) && user.id !== current_user.id ) &&
														<>
														<div title="Adicionar Amigo" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}  className="button-clicky-podium add-friend">
															<span className="shadow"></span>
															<span className="front"><IoIcons.IoPersonAdd/></span>
														</div>
														<div title="Reportar Jogador" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}  className="button-clicky-podium report-player">
															<span className="shadow"></span>
															<span className="front"><MdIcons.MdReport/></span>
														</div>

														{/* <i className="subicon pointer"  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}></i>
														<i className="subicon pointer" style={{marginLeft:"10px"}}   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i> */}
														</>
													} 
													</>	
												}
												{ friends.length === 0 &&  user.id !== current_user.id &&
													<>
													<div title="Adicionar Amigo" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}  className="button-clicky-podium add-friend">
														<span className="shadow"></span>
														<span className="front"><IoIcons.IoPersonAdd/></span>
													</div>
													<div title="Reportar Jogador" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}  className="button-clicky-podium report-player">
														<span className="shadow"></span>
														<span className="front"><MdIcons.MdReport/></span>
													</div>

													{/* <i className="subicon pointer"  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonAdd/></i>
													<i className="subicon pointer" style={{marginLeft:"10px"}}   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i> */}
													</>
													
												}
												</>
											}


											{ current_user !== null && current_user["account_type"] === "A" && user.id !== current_user.id  &&
												<>
													<div title="Subir Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium upgrade-user">
														<span className="shadow"></span>
														<span className="front"><FaIcons.FaRegArrowAltCircleUp/></span>
													</div>
													<div title="Rebaixar Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium downgrade-user">
														<span className="shadow"></span>
														<span className="front"><FaIcons.FaRegArrowAltCircleDown/></span>
													</div>
													<div title="Banir Utilizador" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}  className="button-clicky-podium ban-user">
														<span className="shadow"></span>
														<span className="front"><IoIcons.IoBan/></span>
													</div>
													
													{/* <i className="subicon pointer" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleUp/></i>
													<i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleDown/></i>
													<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}><IoIcons.IoBan/></i> */}
													
												</>
											}
										
										</div>
									
									}
									
								</li>
							)
							})
						}
					</ul>
					<ConfirmOperationModal
						show={modalConfirmShow}
						onHide={() => setConfirmModalShow(false)}
						operation={modalOperation}
						username={modalUsername}
						id={modalId}
					/>
					<div className="row justify-content-center">
						<Pagination
						className="my-3"
						count={count_users}
						page={page_users}
						siblingCount={1}
						boundaryCount={1}
						variant="outlined"
						shape="rounded"
						onChange={handlePageChangeUsers}
						/>
					</div>
				</>
				
				}
				
				</>
				}




				{ filterOption === "Players" && 
					<>
					<div className="filters">
						<div className="title-ind">
							<i><FaIcons.FaUserNinja/></i>
							<h1>Jogadores</h1>
						</div>


						<div className="row">
							<div className="col-12 col-md-12 col-lg-12">
								<form className="shadow-white form-center" onSubmit={submitFunction}>
									<div className="form-players">
										<div className="name-section">
											<h2>Nome</h2>
											<div className="search-name">
												<input className="form-control form-control-lg" id="filter_normal_username" type="search" placeholder="Procurar pelo nome de utilizador"/>
											</div>
										</div>
										

										<div className="level-section">
											<h2>Nivel</h2>
											<div className="search-level">
												<input className="form-control form-control-lg" id="filter_normal_min_level" type="number" placeholder="Mínimo" min="1" onKeyPress={(e) => checkNumber(e)}/>
												<input className="form-control form-control-lg" id="filter_normal_max_level" type="number" placeholder="Máximo" min="1" onKeyPress={(e) => checkNumber(e)}/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<div id="viewnormal" onClick={() => {setNormalInputs({ username: document.getElementById("filter_normal_username").value, min_level: document.getElementById("filter_normal_min_level").value, max_level: document.getElementById("filter_normal_max_level").value }); }} className="button-clicky-podium search-clicky">
											<span className="shadow"></span>
											<span className="front">Procurar <FaIcons.FaSearch/></span>
										</div>
										// <button id="viewnormal" onClick={() => {setNormalInputs({ username: document.getElementById("filter_normal_username").value, min_level: document.getElementById("filter_normal_min_level").value, max_level: document.getElementById("filter_normal_max_level").value }); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
									}
								</form>
								
							</div>
						</div>
					</div>
					
					<hr></hr>

					{count_normal_users === 0 
					? 
					<h1 className="no-results">Não foram encontrados jogadores com os filtros escolhidos</h1>
					:
					<>
						<ul className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-center row">
								<div className="col-lg-1 col-md-1 col-sm-1">
									
								</div>
								
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nome
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Conta
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nivel
								</div>
								<div className="col-lg-3 col-md-3 col-sm-3">
									Experiência
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Ações
								</div>
							</li>
							
							{normal_users.map(function(user, index) {
								numberClassificationNormalUsers++;
								var contador = 1;
								while (true) {
									var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
									var maximo = 400 * Math.pow(contador, 1.1);
									if ( (minimo <= user.account_level) && (user.account_level < maximo)) {
										break;
									}
									contador++;
								}
								return (
									<li className="list-group-item d-flex justify-content-between align-items-center row">
										<div className="col-lg-1 col-md-1 col-sm-1">
											<span className="badge badge-primary badge-pill">{numberClassificationNormalUsers}</span>
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{user.username}
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2">
											{user["account_type"]}
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{contador}
										</div>
										<div className="col-lg-3 col-md-3 col-sm-3">
											{user.account_level} pontos
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2 podium-flex-buttons">
											
											<div title="Subir Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium upgrade-user">
												<span className="shadow"></span>
												<span className="front"><FaIcons.FaRegArrowAltCircleUp/></span>
											</div>
											<div title="Rebaixar Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium downgrade-user">
												<span className="shadow"></span>
												<span className="front"><FaIcons.FaRegArrowAltCircleDown/></span>
											</div>
											<div title="Banir Utilizador" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}  className="button-clicky-podium ban-user">
												<span className="shadow"></span>
												<span className="front"><IoIcons.IoBan/></span>
											</div>

											{/* <i className="subicon pointer" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleUp/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleDown/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}><IoIcons.IoBan/></i> */}
										</div>
									</li>
								)
								})
							}
						</ul>
						
						<ConfirmOperationModal
							show={modalConfirmShow}
							onHide={() => setConfirmModalShow(false)}
							operation={modalOperation}
							username={modalUsername}
							id={modalId}
						/>
						<div className="row justify-content-center">
							<Pagination
							className="my-3"
							count={count_normal_users}
							page={page_normal_users}
							siblingCount={1}
							boundaryCount={1}
							variant="outlined"
							shape="rounded"
							onChange={handlePageChangeUsersNormal}
							/>
						</div>
					</>
					}
					
					
					</>			
				}

				{ filterOption === "PrivilegePlayers" && 
					<>
					<div className="filters">
						<div className="title-ind">
							<i><FaIcons.FaUserTie/></i>
							<h1>Jogadores com Privilégios</h1>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12">
								<form className="shadow-white form-center" onSubmit={submitFunction}>
									<div className="form-players">
										<div className="name-section">
											<h2>Nome</h2>
											<div className="search-name">
												<input className="form-control form-control-lg" id="filter_privilege_username" type="search" placeholder="Procurar pelo nome de utilizador"/>
											</div>
										</div>
										

										<div className="level-section">
											<h2>Nivel</h2>
											<div className="search-level">
												<input className="form-control form-control-lg" id="filter_privilege_min_level" type="number" placeholder="Mínimo" min="1" onKeyPress={(e) => checkNumber(e)}/>
												<input className="form-control form-control-lg" id="filter_privilege_max_level" type="number" placeholder="Máximo" min="1" onKeyPress={(e) => checkNumber(e)}/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<div id="viewprivilege" onClick={() => {setPrivilegeInputs({ username: document.getElementById("filter_privilege_username").value, min_level: document.getElementById("filter_privilege_min_level").value, max_level: document.getElementById("filter_privilege_max_level").value }); }} className="button-clicky-podium search-clicky">
											<span className="shadow"></span>
											<span className="front">Procurar <FaIcons.FaSearch/></span>
										</div>
										// <button id="viewprivilege" onClick={() => {setPrivilegeInputs({ username: document.getElementById("filter_privilege_username").value, min_level: document.getElementById("filter_privilege_min_level").value, max_level: document.getElementById("filter_privilege_max_level").value }); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
									}
								</form>
								
							</div>
						</div>
					</div>
					
					<hr></hr>

					{count_privilege_users === 0 
					? 
					<h1 className="no-results">Não foram encontrados jogadores com os filtros escolhidos</h1>
					:
					<>
						<ul className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-center row">
								<div className="col-lg-1 col-md-1 col-sm-1">
									
								</div>
								
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nome
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Conta
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nivel
								</div>
								<div className="col-lg-3 col-md-3 col-sm-3">
									Experiência
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Ações
								</div>
							</li>
							
							{privilege_users.map(function(user, index) {
								numberClassificationPrivilegeUsers++;
								var contador = 1;
								while (true) {
									var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
									var maximo = 400 * Math.pow(contador, 1.1);
									if ( (minimo <= user.account_level) && (user.account_level < maximo)) {
										break;
									}
									contador++;
								}
								return (
									<li className="list-group-item d-flex justify-content-between align-items-center row">
										<div className="col-lg-1 col-md-1 col-sm-1">
											<span className="badge badge-primary badge-pill">{numberClassificationPrivilegeUsers}</span>
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{user.username}
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2">
											{user["account_type"]}
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{contador}
										</div>
										<div className="col-lg-3 col-md-3 col-sm-3">
											{user.account_level} pontos
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2 podium-flex-buttons">
											<div title="Subir Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium upgrade-user">
												<span className="shadow"></span>
												<span className="front"><FaIcons.FaRegArrowAltCircleUp/></span>
											</div>
											<div title="Rebaixar Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium downgrade-user">
												<span className="shadow"></span>
												<span className="front"><FaIcons.FaRegArrowAltCircleDown/></span>
											</div>
											<div title="Banir Utilizador" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}  className="button-clicky-podium ban-user">
												<span className="shadow"></span>
												<span className="front"><IoIcons.IoBan/></span>
											</div>


											{/* <i className="subicon pointer" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleUp/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleDown/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}><IoIcons.IoBan/></i> */}
										</div>
									</li>
								)
								})
							}
						</ul>
						
						<ConfirmOperationModal
							show={modalConfirmShow}
							onHide={() => setConfirmModalShow(false)}
							operation={modalOperation}
							username={modalUsername}
							id={modalId}
						/>
						<div className="row justify-content-center">
							<Pagination
							className="my-3"
							count={count_privilege_users}
							page={page_privilege_users}
							siblingCount={1}
							boundaryCount={1}
							variant="outlined"
							shape="rounded"
							onChange={handlePageChangeUsersPrivilege}
							/>
						</div>
					</>
					}
					
					
					</>			
				}

				{ filterOption === "Admins" && 
					<>
					<div className="filters">
						<div className="title-ind">
							<i><FaIcons.FaUserCog/></i>
							<h1>Administradores</h1>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12">
								<form className="shadow-white form-center" onSubmit={submitFunction}>
									<div className="form-players">
										<div className="name-section">
											<h2>Nome</h2>
											<div className="search-name">
												<input className="form-control form-control-lg" id="filter_admin_username" type="search" placeholder="Procurar pelo nome de utilizador"/>
											</div>
										</div>
										

										<div className="level-section">
											<h2>Nivel</h2>
											<div className="search-level">
												<input className="form-control form-control-lg" id="filter_admin_min_level" type="number" placeholder="Minimo" min="1" onKeyPress={(e) => checkNumber(e)}/>
												<input className="form-control form-control-lg" id="filter_admin_max_level" type="number" placeholder="Máximo" min="1" onKeyPress={(e) => checkNumber(e)}/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<div id="viewadmin" onClick={() => {setAdminInputs({ username: document.getElementById("filter_admin_username").value, min_level: document.getElementById("filter_admin_min_level").value, max_level: document.getElementById("filter_admin_max_level").value }); }} className="button-clicky-podium search-clicky">
											<span className="shadow"></span>
											<span className="front">Procurar <FaIcons.FaSearch/></span>
										</div>
										// <button id="viewadmin" onClick={() => {setAdminInputs({ username: document.getElementById("filter_admin_username").value, min_level: document.getElementById("filter_admin_min_level").value, max_level: document.getElementById("filter_admin_max_level").value }); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
									}
								</form>
								
							</div>
						</div>
					</div>
					
					<hr></hr>

					{count_admin_users === 0 
					? 
					<h1 className="no-results">Não foram encontrados jogadores com os filtros escolhidos</h1>
					:
					<>
						<ul className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-center row">
								<div className="col-lg-1 col-md-1 col-sm-1">
									
								</div>
								
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nome
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Conta
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nivel
								</div>
								<div className="col-lg-3 col-md-3 col-sm-3">
									Experiência
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Ações
								</div>
							</li>
							
							{admin_users.map(function(user, index) {
								numberClassificationAdminUsers++;
								var contador = 1;
								while (true) {
									var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
									var maximo = 400 * Math.pow(contador, 1.1);
									if ( (minimo <= user.account_level) && (user.account_level < maximo)) {
										break;
									}
									contador++;
								}
								return (
									<li className="list-group-item d-flex justify-content-between align-items-center row">
										<div className="col-lg-1 col-md-1 col-sm-1">
											<span className="badge badge-primary badge-pill">{numberClassificationAdminUsers}</span>
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{user.username}
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2">
											{user["account_type"]}
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{contador}
										</div>
										<div className="col-lg-3 col-md-3 col-sm-3">
											{user.account_level} pontos
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2 podium-flex-buttons">
											<div title="Subir Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium upgrade-user">
												<span className="shadow"></span>
												<span className="front"><FaIcons.FaRegArrowAltCircleUp/></span>
											</div>
											<div title="Rebaixar Privilégios" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}  className="button-clicky-podium downgrade-user">
												<span className="shadow"></span>
												<span className="front"><FaIcons.FaRegArrowAltCircleDown/></span>
											</div>
											<div title="Banir utilizador" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}  className="button-clicky-podium ban-user">
												<span className="shadow"></span>
												<span className="front"><IoIcons.IoBan/></span>
											</div>

											{/* <i className="subicon pointer" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleUp/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleDown/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}><IoIcons.IoBan/></i> */}
										</div>
									</li>
								)
								})
							}
						</ul>
						
						<ConfirmOperationModal
							show={modalConfirmShow}
							onHide={() => setConfirmModalShow(false)}
							operation={modalOperation}
							username={modalUsername}
							id={modalId}
						/>
						<div className="row justify-content-center">
							<Pagination
							className="my-3"
							count={count_admin_users}
							page={page_admin_users}
							siblingCount={1}
							boundaryCount={1}
							variant="outlined"
							shape="rounded"
							onChange={handlePageChangeUsersAdmin}
							/>
						</div>
					</>
					}
					
					
					</>			
				}

				{ filterOption === "BannedPlayers" && 
					<>
					<div className="filters">
						<div className="title-ind">
							<i><FaIcons.FaUserSlash/></i>
							<h1>Jogadores banidos</h1>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12">
								<form className="shadow-white form-center" onSubmit={submitFunction}>
									<div className="form-players">
										<div className="name-section">
											<h2>Nome</h2>
											<div className="search-name">
												<input className="form-control form-control-lg" id="filter_banned_username" type="search" placeholder="Procurar pelo nome de utilizador"/>
											</div>
										</div>
										

										<div className="level-section">
											<h2>Nivel</h2>
											<div className="search-level">
												<input className="form-control form-control-lg" id="filter_banned_min_level" type="number" placeholder="Minimo" min="1" onKeyPress={(e) => checkNumber(e)}/>
												<input className="form-control form-control-lg" id="filter_banned_max_level" type="number" placeholder="Máximo" min="1" onKeyPress={(e) => checkNumber(e)}/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<div id="viewbanned" onClick={() => {setBannedInputs({ username: document.getElementById("filter_banned_username").value, min_level: document.getElementById("filter_banned_min_level").value, max_level: document.getElementById("filter_banned_max_level").value }); }} className="button-clicky-podium search-clicky">
											<span className="shadow"></span>
											<span className="front">Procurar <FaIcons.FaSearch/></span>
										</div>
										// <button id="viewbanned" onClick={() => {setBannedInputs({ username: document.getElementById("filter_banned_username").value, min_level: document.getElementById("filter_banned_min_level").value, max_level: document.getElementById("filter_banned_max_level").value }); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
									}
								</form>
								
							</div>
						</div>
					</div>
					
					<hr></hr>

					{count_banned_users === 0 
					? 
					<h1 className="no-results">Não foram encontrados jogadores com os filtros escolhidos</h1>
					:
					<>
						<ul className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-center row">
								<div className="col-lg-1 col-md-1 col-sm-1">
									
								</div>
								
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nome
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Conta
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Nivel
								</div>
								<div className="col-lg-3 col-md-3 col-sm-3">
									Experiência
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									Ações
								</div>
							</li>
							
							{banned_users.map(function(user, index) {
								numberClassificationBannedUsers++;
								var contador = 1;
								while (true) {
									var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
									var maximo = 400 * Math.pow(contador, 1.1);
									if ( (minimo <= user.account_level) && (user.account_level < maximo)) {
										break;
									}
									contador++;
								}
								return (
									<li className="list-group-item d-flex justify-content-between align-items-center row">
										<div className="col-lg-1 col-md-1 col-sm-1">
											<span className="badge badge-primary badge-pill">{numberClassificationBannedUsers}</span>
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{user.username}
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2">
											{user["account_type"]}
										</div>

										<div className="col-lg-2 col-md-2 col-sm-2">
											{contador}
										</div>
										<div className="col-lg-3 col-md-3 col-sm-3">
											{user.account_level} pontos
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2 podium-flex-buttons">
											<div title="Remover Ban" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_ban"); setConfirmModalShow(true) }}  className="button-clicky-podium remove-ban-user">
												<span className="shadow"></span>
												<span className="front"><IoIcons.IoRemoveCircle/></span>
											</div>
									
											{/* <i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_ban"); setConfirmModalShow(true) }}><IoIcons.IoRemoveCircle/></i> */}
										</div>
									</li>
								)
								})
							}
						</ul>
						
						<ConfirmOperationModal
							show={modalConfirmShow}
							onHide={() => setConfirmModalShow(false)}
							operation={modalOperation}
							username={modalUsername}
							id={modalId}
						/>
						<div className="row justify-content-center">
							<Pagination
							className="my-3"
							count={count_banned_users}
							page={page_banned_users}
							siblingCount={1}
							boundaryCount={1}
							variant="outlined"
							shape="rounded"
							onChange={handlePageChangeUsersBanned}
							/>
						</div>
					</>
					}
					
					
					</>			
				}
			</div>
			

		</div>
	
	);
}

export default Podium;
