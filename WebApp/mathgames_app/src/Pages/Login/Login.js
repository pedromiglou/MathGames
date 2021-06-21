import { React, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import AuthService from "../../Services/auth.service";
import {urlWeb} from "./../../data/data";

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from "react-icons/md";

function Login() {
    // const [signIn, setSignIn] = useState(true);

    async function login(event) {
        event.preventDefault();
        hide_everything()
        
        var response = await AuthService.login(
            document.getElementById("nomeUtilizadorLogin").value.trim(),
            document.getElementById("passwordLogin").value
        )   

        if (response.id !== undefined)
            window.location.assign(urlWeb);
        else if (response.msg === "This account is banned") {
            document.getElementById("erroBan").style.display = "block"
        } else {
            document.getElementById("erroLogin").style.display = "block"
        }
        
    }

    

    async function register(event) {
        event.preventDefault();
        hide_everything()
        if (document.getElementById("passwordRegisto").value.match(/^(?=.*\d)(?=.*[a-zA-Z]).{5,25}$/)) {

            if (20 >= document.getElementById("nomeUtilizadorRegisto").value.length && document.getElementById("nomeUtilizadorRegisto").value.length >= 3) {
                
                if (/\S+@\S+\.\S+/.test(document.getElementById("emailRegisto").value)) {
                    var response = await AuthService.register(
                        document.getElementById("nomeUtilizadorRegisto").value.trim(),
                        document.getElementById("emailRegisto").value.trim(),
                        document.getElementById("passwordRegisto").value
                    )

                    if (response.ok === true) {
                        document.getElementById('nomeUtilizadorRegisto').value = ''
                        document.getElementById('emailRegisto').value = ''
                        document.getElementById('passwordRegisto').value = ''
                        document.getElementById('change_button').click()
                        document.getElementById("sucessoRegisto").style.display = "block"
                        }
                    else {
                        if (response.error === "username")
                            // username já foi escolhido
                            document.getElementById("erroNamesAlreadyTakenRegisto").style.display = "block"
                        if (response.error === "email")
                            // email já foi escolhido
                            document.getElementById("erroEmailAlreadyTakenRegisto").style.display = "block"
                        if (response.error === "error")
                            // outro erro na base de dados
                            document.getElementById("erroRegisto").style.display = "block"

                    }
                } else {
                    // erro email
                    document.getElementById("erroEmailInvalido").style.display = "block"
                }
            } else {
                // erro username
                document.getElementById("erroUsernameInvalido").style.display = "block"
            }
        } else {
            // password tem que ter 5 caracteres, no minimo uma letra e um numero
            document.getElementById("erroPasswordRegisto").style.display = "block"
        }
    }

    function hide_everything() {
        document.getElementById("erroLogin").style.display = "none"
        document.getElementById("erroBan").style.display = "none"
        document.getElementById("erroRegisto").style.display = "none"
        document.getElementById("erroNamesAlreadyTakenRegisto").style.display = "none"
        document.getElementById("erroEmailAlreadyTakenRegisto").style.display = "none"
        document.getElementById("erroPasswordRegisto").style.display = "none"
        document.getElementById("sucessoRegisto").style.display = "none"
        document.getElementById("erroUsernameInvalido").style.display = "none"
        document.getElementById("erroEmailInvalido").style.display = "none"
    }

    function hide_message(id) {
        var elemento = document.getElementById(id)
        if (elemento !== undefined && elemento !== null)
            elemento.style.display = "none"
    }

    const [id, setId] = useState("login");
    
    useEffect( () => {
        if (id === "login"){
            document.getElementById("nomeUtilizadorLogin").value = "";
            document.getElementById("passwordLogin").value = "";
        } else if (id === "registar"){
            document.getElementById("nomeUtilizadorRegisto").value = "";
            document.getElementById("emailRegisto").value = "";
            document.getElementById("passwordRegisto").value = "";
        }
    }, [id] )

    // function toggle_sign_up() {
    //     setSignIn(!signIn);

    //     var signin_id;
    //     var signup_id;
    //     var toggle_side;

    //     if (signIn === true) {
    //         toggle_side = document.getElementById("toggle_side");
    //         var toggle_side_width = toggle_side.clientWidth;

    //         signup_id = document.getElementById("signup_id");
    //         var signup_id_width = signup_id.clientWidth;

    //         signin_id = document.getElementById("signin_id");
    //         signin_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
    //         signup_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
    //         signup_id.style.zIndex = "0";

    //         toggle_side.style.transform = `translate(${signup_id_width}px, 0px)`;
    //     } else {
    //         toggle_side = document.getElementById("toggle_side");
    //         toggle_side.style.transform = `translate(0px, 0px)`;

    //         signin_id = document.getElementById("signin_id");
    //         signin_id.style.transform = `translate(0px, 0px)`;

    //         signup_id = document.getElementById("signup_id");
    //         signup_id.style.transform = `translate(0px, 0px)`;
    //         signup_id.style.zIndex = "-1";
    //     }
    // }

    return (
        <div>
            

            <div className="login-section">

                <div id={"erroBan"} className="alert alert-danger row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}> 
                    Esta conta encontra-se banida.
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroBan")}></img>
                </div> 

                <div id={"erroLogin"} className="alert alert-danger row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}> 
                    Ocorreu um erro no seu processo login. As suas credênciais são inválidas. 
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroLogin")}></img>
                </div> 

                <div id={"erroRegisto"} className="alert alert-danger row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}} >
                    Erro. Por favor efetue novamente.
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroRegisto")}></img>
                </div>

                <div id={"erroNamesAlreadyTakenRegisto"} className="alert alert-danger row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}>
                    Erro. O nome que introduziu já se encontra em utilização.
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroNamesAlreadyTakenRegisto")}></img>
                </div>

                <div id={"erroEmailAlreadyTakenRegisto"} className="alert alert-danger row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}>
                    Erro. O email que introduziu já se encontra em utilização.
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroEmailAlreadyTakenRegisto")}></img>
                </div>
                
                <div id={"erroPasswordRegisto"} className="alert alert-danger row" role="alert" style={{margin:"10px auto", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}>
                    Palavra-passe inválida. Palavra-passe tem que ter no mínimo 5 caracteres, um número e uma letra.
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroPasswordRegisto")}></img>
                </div> 


                <div id={"erroUsernameInvalido"}  className="alert alert-danger row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}>
                    Username inválido. Username tem que ter no minimo 3 caracteres, e um maximo de 20.
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroUsernameInvalido")}></img>
                </div> 

                <div id={"erroEmailInvalido"} className="alert alert-danger row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}>
                    Email inválido. Insira um email válido.
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroEmailInvalido")}></img>
                </div>

                <div id={"sucessoRegisto"} className="alert alert-success row" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none", justifyContent: 'center'}}>
                    A sua conta foi criada com sucesso! 
                    <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("sucessoRegisto")}></img>
                </div> 

            
                <div className="form-login-register">
                    <div className="form-content">
                        { id === "login" ?
                            <form onSubmit={login}>
                                <h2 className="title">Iniciar Sessão</h2>
                                <div className="login-input-field">
                                    <FaIcons.FaUser/>
                                    <input id="nomeUtilizadorLogin" type="text" placeholder="Nome de Utilizador" />
                                </div>
                                <div className="login-input-field">
                                    <FaIcons.FaLock/>
                                    <input id="passwordLogin" type="password" placeholder="Palavra-chave" />
                                </div>
                                <h6>Ainda não tem conta? <span className="switch-logins" onClick={() => setId("registar")}>Clique aqui para se registar</span></h6>
                                <div className="button-section">
                                    <button
                                        type="submit"
                                        value="Entrar"
                                        className="button-login-confirm"
                                        
                                    >Entrar</button>
                                </div>
                                
                            </form>
                        :
                            <form onSubmit={register}>
                                <h2 className="title">Registar</h2>
                                <div className="login-input-field">
                                    <FaIcons.FaUser/>
                                    <input id="nomeUtilizadorRegisto" type="text" placeholder="Nome de Utilizador" />
                                </div>
                                <div className="login-input-field">
                                    <MdIcons.MdEmail/>
                                    <input id="emailRegisto" type="email" placeholder="Email" />
                                </div>
                                <div className="login-input-field">
                                    <FaIcons.FaLock/>
                                    <input id="passwordRegisto" type="password" placeholder="Palavra-chave" />
                                </div>
                                <h6>Já tem conta? <span className="switch-logins" onClick={() => setId("login")}>Clique aqui para entrar</span></h6>
                                <div className="button-section">
                                    <button
                                        type="submit"
                                        value="Registar"
                                        className="button-login-confirm"
                                        
                                    >Registar</button>
                                </div>
                                
                            </form>                     
                        }
                    </div>
                    <div className="custom-shape-divider-bottom-1624243004">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                        </svg>
                    </div>
                        
                    
                </div>
            </div>

            {/* <div className="container container-login">
                <div className="forms-container-login">
                    <div id="signin_id" className={"signin"}>
                        <form action="#" className="sign-in-form login-form">
                            <h2 className="title">Iniciar Sessao</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input id="nomeUtilizadorLogin" type="text" placeholder="Nome de Utilizador" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input id="passwordLogin" type="password" placeholder="Palavra-chave" />
                            </div>
                            <button
                                type="button"
                                value="Entrar"
                                className="btn-login solid"
                                onClick={login}
                            >Entrar</button>
                        </form>
                    </div>

                    <div id="signup_id" className="signup">
                        <form action="#" className="sign-in-form login-form">
                            <h2 className="title">Registar</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input id="nomeUtilizadorRegisto" type="text" placeholder="Nome de Utilizador" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input id="emailRegisto" type="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input id="passwordRegisto" type="password" placeholder="Palavra-chave" />
                            </div>
                            <button
                                type="button"
                                value="Registar"
                                className="btn-login solid"
                                onClick={register}
                            >Registar</button>
                        </form>
                    </div>

                    <div
                        className={signIn ? "signin-side" : "signup-side"}
                        id="toggle_side"
                    >
                        <button
                            id="change_button"
                            className="btn-login transparent"
                            onClick={toggle_sign_up}
                        >
                            {signIn ? "Registe-se" : "Iniciar Sessao"}
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Login;
