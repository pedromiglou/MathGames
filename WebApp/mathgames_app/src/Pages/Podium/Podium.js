import React, { useState, useEffect } from 'react';

import "./Podium.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "@material-ui/lab/Pagination";
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import { Modal, Button } from "react-bootstrap";

import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';


/*O que falta fazer aqui:
	-Quando se muda entre abas, o resultado dos filtros deve ser resetado
	-Fazer a lógica para os outros tipos de conta (jogadores normais, com privilégios e administradores)
	-Meter os filtros de nivel e nome a funcionarem em conjunto
*/

function Podium() {
	var current_user = AuthService.getCurrentUser();

	const [users, setUsers] = useState([]);
	const [banned_users, setBannedUsers] = useState([]);
	const [friends, setFriends] = useState([]);

	var [numberClassificationUsers, setNumberClassificationUsers] = useState([]);
	var [numberClassificationBannedUsers, setNumberClassificationBannedUsers] = useState([]);
	const [filterOption, setfilterOption] = useState("AllPlayers");
	
	const [page_users, setPageUsers] = useState(1);
	const [count_users, setCountUsers] = useState(0);
	const [page_banned_users, setPageBannedUsers] = useState(1);
	const [count_banned_users, setCountBannedUsers] = useState(0);
	
	const [banned_username_input, setBannedUsername] = useState("");
	const [username_input, setUsername] = useState("");

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
	
	function friend_request(friend2) {
		UserService.make_friend_request(current_user.id, friend2);
	}

	async function remove_friend(friend2) {
		await UserService.remove_friend(current_user.id, friend2);
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
			let username = username_input;
			var response = await UserService.getUsers(username,parseInt(page_users)-1, 10);
			setUsers(response.users);
			setCountUsers(response.totalPages)
			setNumberClassificationUsers((parseInt(page_users)-1)*10);
        };

		async function fetchApiUsersBanned() {
			let username = banned_username_input;
			var response = await UserService.getUsersBanned(username,parseInt(page_banned_users)-1, 10);
			setBannedUsers(response.users);
			setCountBannedUsers(response.totalPages)
			setNumberClassificationBannedUsers((parseInt(page_banned_users)-1)*10);
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
		
		if (current_user !== null && current_user["account_type"] === "A")
			fetchApiUsersBanned() 
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
				  <option selected value="Cheats">Cheats</option>
				  <option value="Bug Abuse">Bug Abuse</option>
				</select>
				</>
			  }
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => {modal_function(props.id); props.onHide();}} className="btn save-btn">Confimar</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        );
      }

	useEffect(
		retrieveUsers
	, [page_users, page_banned_users, username_input, banned_username_input])

	
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
					<div className="row">
						<div className="col-12 col-md-12 col-lg-12">
							<form className="shadow-white" onSubmit={submitFunction}>
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
											<input className="form-control form-control-lg" id="filter_min_level" type="number" placeholder="minimo"/>
											<input className="form-control form-control-lg" id="filter_max_level" type="number" placeholder="máximo"/>
										</div>
									</div>
								</div>
								
								
								<button id="searchButton" onClick={() => {setUsername(document.getElementById("filter_username").value); setFriendRequestSucess(false); setReportSucess(false)}} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
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
							<div className="col-lg-2 col-md-2 col-sm-2">
								Ações
							</div>
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
								<li className="list-group-item d-flex justify-content-between align-items-center row">
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
									<div className="col-lg-2 col-md-2 col-sm-2">
										{ current_user !== null && current_user["account_type"] !== "A" && 
											<>
											{ friends.length !== 0 &&
												<>
												{ friends.some(e => e.id === user.id) &&
													<>
													<i className="subicon pointer"   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_friend"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonRemove/></i>
													<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i>
													</>
												} 
												{ (!friends.some(e => e.id === user.id) && user.id !== current_user.id ) &&
													<>
													<i className="subicon pointer"  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonAdd/></i>
													<i className="subicon pointer" style={{marginLeft:"10px"}}   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i>
													</>
												} 
												</>	
											}
											{ friends.length === 0 &&  user.id !== current_user.id &&
												<>
												<i className="subicon pointer"  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonAdd/></i>
												<i className="subicon pointer" style={{marginLeft:"10px"}}   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i>
												</>
												
											}
											</>
										}


										{ current_user !== null && current_user["account_type"] === "A" && user.id !== current_user.id  &&
											<>
										
												<i className="subicon pointer" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleUp/></i>
												<i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleDown/></i>
												<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}><IoIcons.IoBan/></i>
												
											</>
										}
										
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
								<form className="shadow-white" onSubmit={submitFunction}>
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
												<input className="form-control form-control-lg" id="filter_min_level" type="number" placeholder="minimo"/>
												<input className="form-control form-control-lg" id="filter_max_level" type="number" placeholder="máximo"/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<button id="viewbanned" onClick={() => {setBannedUsername(document.getElementById("filter_banned_username").value); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
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
										<div className="col-lg-2 col-md-2 col-sm-2">
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_ban"); setConfirmModalShow(true) }}><IoIcons.IoRemoveCircle/></i>
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

				{ filterOption === "PrivilegePlayers" && 
					<>
					<div className="filters">
						<div className="title-ind">
							<i><FaIcons.FaUserTie/></i>
							<h1>Jogadores com Privilégios</h1>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12">
								<form className="shadow-white" onSubmit={submitFunction}>
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
												<input className="form-control form-control-lg" id="filter_min_level" type="number" placeholder="minimo"/>
												<input className="form-control form-control-lg" id="filter_max_level" type="number" placeholder="máximo"/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<button id="viewbanned" onClick={() => {setBannedUsername(document.getElementById("filter_banned_username").value); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
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
										<div className="col-lg-2 col-md-2 col-sm-2">
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_ban"); setConfirmModalShow(true) }}><IoIcons.IoRemoveCircle/></i>
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

				{ filterOption === "Admins" && 
					<>
					<div className="filters">
						<div className="title-ind">
							<i><FaIcons.FaUserCog/></i>
							<h1>Administradores</h1>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12">
								<form className="shadow-white" onSubmit={submitFunction}>
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
												<input className="form-control form-control-lg" id="filter_min_level" type="number" placeholder="minimo"/>
												<input className="form-control form-control-lg" id="filter_max_level" type="number" placeholder="máximo"/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<button id="viewbanned" onClick={() => {setBannedUsername(document.getElementById("filter_banned_username").value); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
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
										<div className="col-lg-2 col-md-2 col-sm-2">
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_ban"); setConfirmModalShow(true) }}><IoIcons.IoRemoveCircle/></i>
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

				{ filterOption === "BannedPlayers" && 
					<>
					<div className="filters">
						<div className="title-ind">
							<i><FaIcons.FaUserSlash/></i>
							<h1>Jogadores banidos</h1>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12">
								<form className="shadow-white" onSubmit={submitFunction}>
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
												<input className="form-control form-control-lg" id="filter_min_level" type="number" placeholder="minimo"/>
												<input className="form-control form-control-lg" id="filter_max_level" type="number" placeholder="máximo"/>
											</div>
										</div>
									</div>
									{ current_user !== null && current_user["account_type"] === "A" &&
										<button id="viewbanned" onClick={() => {setBannedUsername(document.getElementById("filter_banned_username").value); }} className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
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
										<div className="col-lg-2 col-md-2 col-sm-2">
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_ban"); setConfirmModalShow(true) }}><IoIcons.IoRemoveCircle/></i>
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
