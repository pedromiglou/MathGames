import React, { useState, useEffect } from 'react';

import "./Podium.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from '../../Services/user.service';

function Podium() {
	
	const [users, setUsers] = useState([]);
	const [usersFiltered, setUsersFiltered] = useState([]);
	var [numberClassification, setNumberClassification] = useState([]);
	
	

	useEffect(() => {
		async function fetchApiUsers() {
            var response = await UserService.getUsers();
            setUsers(response);
			setUsersFiltered(response);
			setNumberClassification(0);
        };

		fetchApiUsers();
	}, [])

	function filterUsers(e) {
		e.preventDefault();
		let username = document.getElementById("filter_username").value;
		var filtered_users = users.filter(function (user) {
			return user.username.includes(username);
		});
		setUsersFiltered(filtered_users);
	}
	
	return (
		<div>
			<br></br>
			<div class="row justify-content-center">
				<div class="col-12 col-md-10 col-lg-8">
					<form onSubmit={filterUsers}>
						<div class="card-body row no-gutters align-items-center">
							<div class="col-auto">
								<i class="fas fa-search h4 text-body"></i>
							</div>
							<div class="col">
								<input class="form-control form-control-lg" id="filter_username" type="search" placeholder="Procurar por username" />
							</div>
							<div class="col-auto">
								<button class="btn btn-lg btn-success" type="submit">Procurar</button>
							</div>
						</div>
					</form>
				</div>
			</div>

			<ul class="list-group" style={{color: "#2C96C7", fontSize: 23}}>
				{usersFiltered.map(function(user, index) {
					numberClassification++;
					var contador = 1;
					while (true) {
						var minimo = contador === 1 ? 0 : 400 * Math.pow(contador, 1.1);
						var maximo = 400 * Math.pow(contador+1, 1.1);
						if ( (minimo <= user.account_level) && (user.account_level < maximo)) {
							break;
						}
						contador++;
					}
					return (
						<li class="list-group-item d-flex justify-content-between align-items-center row">
							<div class="col-sm-1">
								<span className="badge badge-primary badge-pill">{numberClassification}</span>
							</div>
							<div class="col-sm-7">
								{user.username}
							</div>
							<div class="col-sm 1">
								Nível {contador}
							</div>
							<div class="col-sm 2">
								{user.account_level} pontos
							</div>
							<div class="col-sm 1">
								Pedir amizade
							</div>
						</li>
					)
					})
				}
			</ul>
		</div>
	);
}

export default Podium;
