import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Game_Page.css';
import io from "socket.io-client";

import data from '../../data/data'

const { devAPI } = data;

function Game_Page() {
	var socket;
	let history = useHistory();
	function find_match() {
		socket = io( devAPI );
		socket.on("connection", () => {
			console.log("Connected.")
			socket.emit("user_id", sessionStorage.getItem("user_id"))
		})

		socket.on("match_found", (match_id) => {
			console.log("Match found!");
			sessionStorage.setItem('match_id', match_id);
			history.push("/game")
			
		})

	}

	function get_data() {
		socket.emit('get_data');
	}

	return (
		<div className="container">
			<button className="btn-danger btn_mtchmkng" onClick={find_match}>
				Matchmaking
			</button>
			<hr />
			<button className="btn-danger btn_mtchmkng" onClick={get_data}>
				Get Data
			</button>
		</div>
	)
}

export default Game_Page;