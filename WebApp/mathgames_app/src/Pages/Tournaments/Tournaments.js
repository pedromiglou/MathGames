import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Tournaments.css";

import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';

import { Link } from 'react-router-dom';


import AuthService from '../../Services/auth.service';

function Tournaments() {
    // const [user, setUser] = useState("");

    // useEffect(() => {
	// 	var current_user = AuthService.getCurrentUser();
	// 	setUser(current_user);

    // }, [])

    var current_user = AuthService.getCurrentUser();

    function submitFunction(event) {
		event.preventDefault();
		document.getElementById("searchButton").click();
	}

    return (
        <>
        
            <div className="list-tournaments shadow3D animation-down">
				
				<div className="filters-t">
					
                    <div className="title-ind-t">
                        <i><RiIcons.RiTrophyFill/></i>
                        <h1>Torneios</h1>
                    </div>
                        
					
					<div className="row">
						<div className="col-12 col-md-12 col-lg-12">
							<form className="shadow-white" onSubmit={submitFunction}>
								<div className="form-tournaments">
									<div className="name-section">
										<h2>Nome Torneio</h2>
										
                                        <input className="form-control form-control-lg" id="filter_username" type="search" placeholder="Procurar pelo nome do torneio"/>
									</div>
								
                                    <div className="privacy-section">
                                        <h2>Privacidade</h2>
                                        <div className="checkbox-display">
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="publico" type="checkbox" name="Público"/>
                                                <h5>Público</h5>
                                            </div>
                                            
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="privado" type="checkbox" name="Privado"/>
                                                <h5>Privado</h5>
                                            </div>
                                                
                                            
                                        </div>
									</div>

                                    <div className="users-section">
										<h2>Número Utilizadores</h2>
                                        <input className="form-control form-control-lg" id="filter_allusers_min_level" type="number" placeholder="capacidade"/>
									</div>

                                    <div className="games-section">
                                        <h2>Jogos</h2>
                                        <div className="checkbox-display">
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="rastros" type="checkbox" name="Público"/>
                                                <h5>Rastros</h5>
                                            </div>
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="GC" type="checkbox" name="Privado"/>
                                                <h5>Gatos&Cães</h5>
                                            </div>
                                            
                                            
                                        </div>
                                        
									</div>

								</div>
								
								
								<button id="searchButton" className="btn btn-lg btn-search" type="button">Procurar <FaIcons.FaSearch/></button>
                                <hr></hr>
							</form>
                            
						</div>
					</div>

                    {current_user !== null && current_user["account_type"] === "T" &&
                    <div id="gerir" className="shadow-white">
                        <h1>Gerir Torneios</h1>
                        <Link to="createTournament" className="btn btn-lg btn-search">
                            Criar Novo Torneio <FaIcons.FaPlus/>
                        </Link>
                        <button id="myTButton" className="btn btn-lg btn-search" type="button">Ver os meus torneios <FaIcons.FaSearch/></button>
                    </div>
                    }
				</div>
                
                <hr></hr>

                <ul className="list-group">
                    <li className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Nome
                        </div>    
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Jogo
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Capacidade
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2">
                            Privacidade
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 join">
                            
                        </div>                                
                    </li>

                    <li className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Nome do torneio
                        </div>    
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Jogo
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-3">
                            0/64
                        </div>
                        <div title="Privado" className="col-lg-2 col-md-2 col-sm-2">
                            <BsIcons.BsFillLockFill/>
                        </div>
                        <div title="Entrar" className="col-lg-1 col-md-1 col-sm-1 join">
                            <FaIcons.FaArrowAltCircleRight/>
                        </div>                                
                    </li>

                    <li className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Nome do torneio
                        </div>    
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Jogo
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-3">
                            20/32
                        </div>
                        <div title="Privado" className="col-lg-2 col-md-2 col-sm-2">
                            <BsIcons.BsFillLockFill/>
                        </div>
                        <div title="Entrar" className="col-lg-1 col-md-1 col-sm-1 join">
                            <FaIcons.FaArrowAltCircleRight/>
                        </div>                                  
                    </li>

                    <li className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Nome do torneio
                        </div>    
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Jogo
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-3">
                            20/32
                        </div>
                        <div title="Público" className="col-lg-2 col-md-2 col-sm-2">
                            <BsIcons.BsFillUnlockFill/>
                        </div>
                        <div title="Entrar" className="col-lg-1 col-md-1 col-sm-1 join">
                            <FaIcons.FaArrowAltCircleRight/>
                        </div>                                 
                    </li>

                    <li className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Nome do torneio
                        </div>    
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Jogo
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-3">
                            20/32
                        </div>
                        <div title="Público" className="col-lg-2 col-md-2 col-sm-2">
                            <BsIcons.BsFillUnlockFill/>
                        </div>
                        <div title="Entrar" className="col-lg-1 col-md-1 col-sm-1 join">
                            <FaIcons.FaArrowAltCircleRight/>
                        </div>                                  
                    </li>



                    {/* {users.map(function(user, index) {
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
                    } */}

                </ul>
            </div>


            
        </>
    );
}

export default Tournaments;
