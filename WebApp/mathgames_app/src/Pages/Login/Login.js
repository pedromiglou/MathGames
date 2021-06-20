import { React, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import AuthService from "../../Services/auth.service";
import {urlWeb} from "./../../data/data";



function Login() {
    const [signIn, setSignIn] = useState(true);

    async function login() {
        hide_everything()

        var response = await AuthService.login(
            document.getElementById("nomeUtilizadorLogin").value,
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

    

    async function register() {
        hide_everything()

        if (document.getElementById("passwordRegisto").value.match(/^(?=.*\d)(?=.*[a-zA-Z]).{5,25}$/)) {

            if (20 >= document.getElementById("nomeUtilizadorRegisto").value.length && document.getElementById("nomeUtilizadorRegisto").value.length >= 3) {
                
                if (/\S+@\S+\.\S+/.test(document.getElementById("emailRegisto").value)) {
                    var response = await AuthService.register(
                        document.getElementById("nomeUtilizadorRegisto").value,
                        document.getElementById("emailRegisto").value,
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


    function toggle_sign_up() {
        setSignIn(!signIn);

        var signin_id;
        var signup_id;
        var toggle_side;

        if (signIn === true) {
            toggle_side = document.getElementById("toggle_side");
            var toggle_side_width = toggle_side.clientWidth;

            signup_id = document.getElementById("signup_id");
            var signup_id_width = signup_id.clientWidth;

            signin_id = document.getElementById("signin_id");
            signin_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
            signup_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
            signup_id.style.zIndex = "0";

            toggle_side.style.transform = `translate(${signup_id_width}px, 0px)`;
        } else {
            toggle_side = document.getElementById("toggle_side");
            toggle_side.style.transform = `translate(0px, 0px)`;

            signin_id = document.getElementById("signin_id");
            signin_id.style.transform = `translate(0px, 0px)`;

            signup_id = document.getElementById("signup_id");
            signup_id.style.transform = `translate(0px, 0px)`;
            signup_id.style.zIndex = "-1";
        }
    }


    return (
        <div>
            

            <div className="container container-login">

            <div id={"erroBan"} className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}}> 
                Esta conta encontra-se banida.
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroBan")}></img>
            </div> 

             <div id={"erroLogin"} className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}}> 
                Ocorreu um erro no seu processo login. As suas credênciais são inválidas. 
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroLogin")}></img>
             </div> 

            <div id={"erroRegisto"} className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}} >
                Erro. Por favor efetue novamente.
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroRegisto")}></img>
            </div>

            <div id={"erroNamesAlreadyTakenRegisto"} className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}}>
                Erro. O nome que introduziu já se encontra em utilização.
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroNamesAlreadyTakenRegisto")}></img>
            </div>

            <div id={"erroEmailAlreadyTakenRegisto"} className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}}>
                Erro. O email que introduziu já se encontra em utilização.
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroEmailAlreadyTakenRegisto")}></img>
            </div>
            
            <div id={"erroPasswordRegisto"} className="alert alert-danger" role="alert" style={{margin:"10px auto", textAlign:"center", fontSize:"22px", display:"none"}}>
                Palavra-passe inválida. Palavra-passe tem que ter no mínimo 5 caracteres, um número e uma letra.
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroPasswordRegisto")}></img>
            </div> 


            <div id={"erroUsernameInvalido"}  className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}}>
                Username inválido. Username tem que ter no minimo 3 caracteres, e um maximo de 20.
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroUsernameInvalido")}></img>
             </div> 

            <div id={"erroEmailInvalido"} className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}}>
                Email inválido. Insira um email válido.
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("erroEmailInvalido")}></img>
            </div>

            <div id={"sucessoRegisto"} className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px", display:"none"}}>
                A sua conta foi criada com sucesso! 
                <img src={process.env.PUBLIC_URL + "/images/crossicon.png"}  style={{width: "3%", height: "auto", marginLeft:"8px"}} alt={"Close Icon"} onClick={() => hide_message("sucessoRegisto")}></img>
            </div> 

                
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
        </div>
        </div>
    );
}

export default Login;
