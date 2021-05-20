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
	const [friends, setFriends] = useState([]);
	var [numberClassification, setNumberClassification] = useState([]);
	
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	
	const handlePageChange = (event, value) => {
		setPage(value);
	};
	
	function friend_request(friend2) {
		UserService.make_friend_request(current_user.id, friend2);
	}

	function remove_friend(friend2) {
		UserService.remove_friend(current_user.id, friend2);
	}

	function report_player(friend2) {
		UserService.report_player(current_user.id, friend2);
	}

	function ban_player(friend2) {
		UserService.ban_player(current_user.id, friend2);
	}

	function upgrade_account(friend2) {
		UserService.upgrade_account(current_user.id, friend2);
	}

	function downgrade_account(friend2) {
		UserService.downgrade_account(current_user.id, friend2);
	}

	const retrieveUsers = () => {
		async function fetchApiUsers() {
			let username = document.getElementById("filter_username").value;
            var response = await UserService.getUsers(username,parseInt(page)-1, 10);
            setUsers(response.users);
			setCount(response.totalPages)
			setNumberClassification((parseInt(page)-1)*10);
        };

		async function fetchApiFriends(userId) {
            var response = await UserService.getFriends(userId);
            setFriends(response);
        };

		if (current_user !== null) {
			fetchApiFriends(current_user.id)
		}
		fetchApiUsers();
	}

	function submitFunction(event) {
		event.preventDefault();
		document.getElementById("searchButton").click();
	}

	useEffect(
		retrieveUsers
	, [page])

	
	return (
		<div>
			<br></br>
			<div className="row justify-content-center">
				<div className="col-12 col-md-10 col-lg-8">
					<form onSubmit={submitFunction}>
						<div className="card-body row no-gutters align-items-center">
							<div className="col">
								<input className="form-control form-control-lg" id="filter_username" type="search" placeholder="Procurar por username"/>
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
					numberClassification++;
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
								<span className="badge badge-primary badge-pill">{numberClassification}</span>
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
				count={count}
				page={page}
				siblingCount={1}
				boundaryCount={1}
				variant="outlined"
				shape="rounded"
				onChange={handlePageChange}
				/>
		  	</div>
		</div>
	);
}

export default Podium;
