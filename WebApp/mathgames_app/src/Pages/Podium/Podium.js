import React, { useState, useEffect } from 'react';

import "./Podium.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from '../../Services/user.service';
import Pagination from "@material-ui/lab/Pagination";

function Podium() {
	
	const [users, setUsers] = useState([]);
	var [numberClassification, setNumberClassification] = useState([]);
	
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	
	const handlePageChange = (event, value) => {
		setPage(value);
	};
	
	const retrieveUsers = () => {
		async function fetchApiUsers() {
			let username = document.getElementById("filter_username").value;
            var response = await UserService.getUsers(username,parseInt(page)-1, 10);
            setUsers(response.users);
			setCount(response.totalPages)
			setNumberClassification((parseInt(page)-1)*10);
        };

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
							<div className="col-sm-7">
								{user.username}
							</div>
							<div className="col-sm 1">
								Nível {contador}
							</div>
							<div className="col-sm 2">
								{user.account_level} pontos
							</div>
							<div className="col-sm 1">
								Pedir amizade
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
