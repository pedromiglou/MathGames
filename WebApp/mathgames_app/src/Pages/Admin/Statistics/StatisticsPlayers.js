import React, { useState, useEffect } from 'react';
import UserService from '../../../Services/user.service';
import './Statistics.css';
import { Modal, Button } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import * as IoIcons from 'react-icons/io5';
//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatisticsPlayers(props){
    const [users, setUsers] = useState([]);
    var [numberClassificationUsers, setNumberClassificationUsers] = useState([]);
    const [page_users, setPageUsers] = useState(1);
	const [count_users, setCountUsers] = useState(0);

    const [modalConfirmShow, setConfirmModalShow] = useState(false);
	const [modalOperation, setModalOperation] = useState("");
	const [modalUsername, setModalUsername] = useState("");
	const [modalId, setModalUserId] = useState(0);

    const handlePageChangeUsers = (event, value) => {
		setPageUsers(value);
	};

    async function ban_player(player) {
		await UserService.ban_player(player);
		retrieveUsers()
	}

    function ConfirmOperationModal(props) {
		let modal_username = props.username;
		let title = "";
		let text = "";
		let modal_function = null;
		if (props.operation === "ban") {
			title = "Banir Jogador";
			text = "Tem a certeza que pretende banir a conta " + modal_username + "?";
			modal_function = ban_player;
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
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => {modal_function(props.id); props.onHide();}} className="btn save-btn">Confimar</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        );
      }


    const retrieveUsers = () => {
        async function fetchApiUsers() {
			var response = await UserService.getReportUsers(parseInt(page_users)-1, 8);
			setUsers(response.reports);
			setCountUsers(response.totalPages)
			setNumberClassificationUsers((parseInt(page_users)-1)*8);
        };

        fetchApiUsers()
    }

    useEffect(
		retrieveUsers
	, [page_users])


    return(
        <>
            <div className="statsPlayers">
                <div className="player-stats">
                    <div className="player-table shadow3D">
                        <h1> Tabela de jogadores com mais reports </h1>
                        <ul className="list-group">
                            {/* Cabeçalho. Se não quiserem por, deixem estar assim vazio. */}
                            <li className="list-group-item d-flex justify-content-between align-items-center row">
                            
                            </li>

                            {users.map(function(user, index) {
                                numberClassificationUsers++;
                                return (
                                    <li className="list-group-item d-flex justify-content-between align-items-center row">
                                        <div className="col-lg-2 col-md-2 col-sm-2">
                                            <span className="badge badge-primary badge-pill">{numberClassificationUsers}</span>
                                        </div>

                                        <div className="col-lg-5 col-md-5 col-sm-5">
                                            {user.receiver_user.username}
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            {user.reportCount} reports
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1">
                                            <i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.receiver_user.id); setModalUsername(user.receiver_user.username); setModalOperation("ban"); setConfirmModalShow(true) }}><IoIcons.IoBan/></i>
                                        </div>
                                    </li>
                                )
                            })}
                            
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
                    </div>
                
                    <div className="player-graphs">
                        <div className="shadow3D">
                            <h2>Novos Jogadores</h2>
                            <div className="graph">
                            <CanvasJSChart options={props.newPlayers7DaysGraph} />
                            </div>
                        </div>
                        <div className="shadow3D">
                            <h2>Jogadores Banidos</h2>
                            <div className="graph">
                            <CanvasJSChart options={props.bannedPlayers7DaysGraph} />
                            {/*
                            <Line
                                data={state}
                                options={{
                                    title:{
                                    display:true,
                                    text:'Average Rainfall per month',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                                />
                            */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
    
}

export default StatisticsPlayers;