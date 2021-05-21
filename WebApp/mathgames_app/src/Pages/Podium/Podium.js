import React, { useState, useEffect } from 'react';

import "./Podium.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "@material-ui/lab/Pagination";
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';



import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';

function Podium() {
	var current_user = AuthService.getCurrentUser();
	const [users, setUsers] = useState([]);
	const [banned_users, setBannedUsers] = useState([]);
	const [friends, setFriends] = useState([]);
	const [banned, setBanned] = useState(false);
	var [numberClassificationUsers, setNumberClassificationUsers] = useState([]);
	var [numberClassificationBannedUsers, setNumberClassificationBannedUsers] = useState([]);
	const [filterOption, setfilterOption] = useState("Players");
	
	const [page_users, setPageUsers] = useState(1);
	const [count_users, setCountUsers] = useState(0);
	const [page_banned_users, setPageBannedUsers] = useState(1);
	const [count_banned_users, setCountBannedUsers] = useState(0);
	
	const [banned_username, setBannedUsername] = useState("");
	const [username_input, setUsername] = useState("");

	const handlePageChangeUsers = (event, value) => {
		setPageUsers(value);
	};

	const handlePageChangeUsersBanned = (event, value) => {
		setPageBannedUsers(value);
	};
	
	function friend_request(friend2) {
		UserService.make_friend_request(current_user.id, friend2);
	}

	function remove_friend(friend2) {
		UserService.remove_friend(current_user.id, friend2);
	}

	function report_player(player) {
		UserService.report_player(current_user.id, player);
	}

	function ban_player(player) {
		UserService.ban_player(player);
	}

	function remove_ban(player) {
		UserService.remove_ban(player);
	}

	function upgrade_account(player) {
		UserService.upgrade_account(player);
	}

	function downgrade_account(player) {
		UserService.downgrade_account(player);
	}

	const retrieveUsers = () => {
		var current_user = AuthService.getCurrentUser();
		async function fetchApiUsers() {
			let username = username_input;
			console.log(username)
			var response = await UserService.getUsers(username,parseInt(page_users)-1, 10);
			setUsers(response.users);
			setCountUsers(response.totalPages)
			setNumberClassificationUsers((parseInt(page_users)-1)*10);
        };

		async function fetchApiUsersBanned() {
			let username = banned_username;
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
		
		fetchApiUsersBanned() 
		fetchApiUsers();
	}

	function submitFunction(event) {
		event.preventDefault();
		document.getElementById("searchButton").click();
	}

	function viewPlayers() {
		setfilterOption("Players");
		setBanned(false);
	}

	function viewBannedPlayers() {
		setfilterOption("BannedPlayers");
		setBanned(true);
	}

	useEffect(
		retrieveUsers
	, [page_users, page_banned_users])

	
	return (
		<div>
			<br></br>
			<div className="col-lg-12 col-md-12 col-sm-12" id="filter_options">
				<div className="row top-bar no-margin">
					<div className="col-lg-3 col-md-3 col-sm-3">
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 top-button">
						<button
							id="players"
							onClick={viewPlayers}
							className={
								filterOption === "Players"
									? "box actived-btn"
									: "box up"
							}
						>
							Jogadores
						</button>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 top-button">
						<button
							id="banned_players"
							onClick={viewBannedPlayers}
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

			{ filterOption === "Players" && 
			<>
			<div className="row justify-content-center">
				<div className="col-12 col-md-10 col-lg-8">
					<form onSubmit={submitFunction}>
						<div className="card-body row no-gutters align-items-center">
							<div className="col">
								<input onChange={event => setUsername(event.target.value)} className="form-control form-control-lg" id="filter_username" type="search" placeholder="Procurar por username"/>
							</div>
							<div className="col-auto">
								<button id="searchButton" onClick={retrieveUsers} className="btn btn-lg btn-success" type="button">Procurar</button>
							</div>
						</div>
					</form>
					
				</div>
			</div>

			<ul className="list-group" style={{color: "#2C96C7", fontSize: 23}}>
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
							<div className="col-sm-1">
								<span className="badge badge-primary badge-pill">{numberClassificationUsers}</span>
							</div>
							{
								current_user !== null && current_user["account_type"] === "A" 
								?  <>
									<div className="col-sm-4">
										{user.username}
									</div>
									<div className="col-sm-2">
										Tipo de Conta:   {user["account_type"]}
									</div>
									</>
								:
								<div className="col-sm-6">
									{user.username}
								</div>
							}
							<div className="col-sm-1">
								Nível {contador}
							</div>
							<div className="col-sm-2">
								{user.account_level} pontos
							</div>
							<div className="col-sm-2">
								{ current_user !== null && current_user["account_type"] !== "A" && 
									<>
									{ friends.length !== 0 &&
										<>
										{ friends.some(e => e.id === user.id) &&
											<>
											<i className="subicon pointer"  onClick={() => {remove_friend(user.id)}}><IoIcons.IoPersonRemove/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {report_player(user.id)}}><MdIcons.MdReport/></i>
											</>
										} 
										{ (!friends.some(e => e.id === user.id) && user.id !== current_user.id ) &&
											<>
											<i className="subicon pointer"  onClick={() => {friend_request(user.id)}}><IoIcons.IoPersonAdd/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {report_player(user.id)}}><MdIcons.MdReport/></i>
											</>
										} 
										</>	
									}
									{ friends.length === 0 &&  user.id !== current_user.id &&
										<>
										<i className="subicon pointer"  onClick={() => {friend_request(user.id)}}><IoIcons.IoPersonAdd/></i>
										<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {report_player(user.id)}}><MdIcons.MdReport/></i>
										</>
										
									}
									</>
								}


								{ current_user !== null && current_user["account_type"] === "A" && 
									<>
								
										<i className="subicon pointer"  onClick={() => {upgrade_account(user.id)}}><FaIcons.FaRegArrowAltCircleUp/></i>
										<i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {downgrade_account(user.id)}}><FaIcons.FaRegArrowAltCircleDown/></i>
										<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {ban_player(user.id)}}><IoIcons.IoBan/></i>
										
									</>
								}
								
							</div>
						</li>
					)
					})
				}
			</ul>
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


			{ filterOption === "BannedPlayers" && 
				<>
				<div className="row justify-content-center">
					<div className="col-12 col-md-10 col-lg-8">
						<form onSubmit={submitFunction}>
							<div className="card-body row no-gutters align-items-center">
								<div className="col">
									<input onChange={event => setBannedUsername(event.target.value)} className="form-control form-control-lg" id="filter_banned_username" type="search" placeholder="Procurar por username"/>
								</div>
								{ current_user !== null && current_user["account_type"] === "A" &&
									<button id="viewbanned" onClick={retrieveUsers} className="btn btn-lg btn-success" type="button">Ver Jogadores Banidos</button>
								}
							</div>
						</form>
						
					</div>
				</div>
	
				<ul className="list-group" style={{color: "#2C96C7", fontSize: 23}}>
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
								<div className="col-sm-1">
									<span className="badge badge-primary badge-pill">{numberClassificationBannedUsers}</span>
								</div>
								{
									current_user !== null && current_user["account_type"] === "A" 
									?  <>
										<div className="col-sm-4">
											{user.username}
										</div>
										<div className="col-sm-2">
											Tipo de Conta:   {user["account_type"]}
										</div>
										</>
									:
									<div className="col-sm-6">
										{user.username}
									</div>
								}
								<div className="col-sm-1">
									Nível {contador}
								</div>
								<div className="col-sm-2">
									{user.account_level} pontos
								</div>
								<div className="col-sm-2">
									{ current_user !== null && current_user["account_type"] !== "A" && 
										<>
										{ friends.length !== 0 &&
											<>
											{ friends.some(e => e.id === user.id) &&
												<>
												<i className="subicon pointer"  onClick={() => {remove_friend(user.id)}}><IoIcons.IoPersonRemove/></i>
												<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {report_player(user.id)}}><MdIcons.MdReport/></i>
												</>
											} 
											{ (!friends.some(e => e.id === user.id) && user.id !== current_user.id ) &&
												<>
												<i className="subicon pointer"  onClick={() => {friend_request(user.id)}}><IoIcons.IoPersonAdd/></i>
												<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {report_player(user.id)}}><MdIcons.MdReport/></i>
												</>
											} 
											</>	
										}
										{ friends.length === 0 &&  user.id !== current_user.id &&
											<>
											<i className="subicon pointer"  onClick={() => {friend_request(user.id)}}><IoIcons.IoPersonAdd/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {report_player(user.id)}}><MdIcons.MdReport/></i>
											</>
											
										}
										</>
									}
	
	
									{ current_user !== null && current_user["account_type"] === "A" && 
										<>
									
											<i className="subicon pointer"  onClick={() => {upgrade_account(user.id)}}><FaIcons.FaRegArrowAltCircleUp/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {downgrade_account(user.id)}}><FaIcons.FaRegArrowAltCircleDown/></i>
											<i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {ban_player(user.id)}}><IoIcons.IoBan/></i>
											
										</>
									}
									
								</div>
							</li>
						)
						})
					}
				</ul>
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

		</div>
	
	);
}

export default Podium;
