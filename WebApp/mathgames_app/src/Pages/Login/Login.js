import { React, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import AuthService from "../../Services/auth.service";
import {urlWeb} from "./../../data/data";

function Login() {
    const [signIn, setSignIn] = useState(true);
    const [errorLogin, setErroLogin] = useState(false);
    const [errorBan, setErroBan] = useState(false);
    const [errorRegisto, setErroRegisto] = useState(false);
    const [errorNamesAlreadyTakenRegisto, setErroNamesAlreadyTakenRegisto] = useState("");
    const [errorPasswordRegisto, setErroPasswordRegisto] = useState(false);
    const [errorEmailUsernameRegisto, setErroEmailUsernameRegisto] = useState("");
    const [sucessoRegisto, setSucessoRegisto] = useState(false);

    async function login() {
        setErroRegisto(false);
        setErroLogin(false);
        setErroBan(false);
        setSucessoRegisto(false);
        setErroPasswordRegisto(false);
        setErroEmailUsernameRegisto("");
        setErroNamesAlreadyTakenRegisto("");
        var response = await AuthService.login(
            document.getElementById("nomeUtilizadorLogin").value,
            document.getElementById("passwordLogin").value
        )   

        if (response.id !== undefined)
            window.location.assign(urlWeb);
        else if (response.msg === "This account is banned") {
            setErroBan(true);
        } else {
            setErroLogin(true);
        }
    }

    

    async function register() {
        setErroRegisto(false);
        setErroLogin(false);
        setErroBan(false);
        setSucessoRegisto(false);
        setErroPasswordRegisto(false);
        setErroEmailUsernameRegisto("");
        setErroNamesAlreadyTakenRegisto("");
        if (document.getElementById("passwordRegisto").value.match(/^(?=.*\d)(?=.*[a-zA-Z]).{5,25}$/)) {

            if (25 >= document.getElementById("nomeUtilizadorRegisto").value.length && document.getElementById("nomeUtilizadorRegisto").value.length >= 3) {
                
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
                        setSucessoRegisto(true);
                        }
                    else {
                        if (response.error === "username")
                            // username já foi escolhido
                            setErroNamesAlreadyTakenRegisto("Username");
                        if (response.error === "email")
                            // email já foi escolhido
                            setErroNamesAlreadyTakenRegisto("Email");
                        if (response.error === "error")
                            // outro erro na base de dados
                            setErroRegisto(true);
                    }
                } else {
                    // erro email
                    setErroEmailUsernameRegisto("Email");
                }
            } else {
                // erro username
                setErroEmailUsernameRegisto("Username");
            }
        } else {
            // password tem que ter 5 caracteres, no minimo uma letra e um numero
            setErroPasswordRegisto(true);
        }
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
            {errorBan === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}> 
                Esta conta encontra-se banida.
                 </div> : null}

            {errorLogin === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}> 
                Ocorreu um erro no seu processo login. As suas credênciais são inválidas.
                 </div> : null}

            {errorRegisto === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                Erro. Por favor efetue novamente.
                 </div> : null}

            {errorNamesAlreadyTakenRegisto !== "" 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                Erro. {errorNamesAlreadyTakenRegisto} já se encontra em utilização.
                 </div> : null}
            
            {errorPasswordRegisto === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", textAlign:"center", fontSize:"22px"}}>
                Palavra-passe inválida. Palavra-passe tem que ter no mínimo 5 caracteres, um número e uma letra.
                 </div> : null}

            {errorEmailUsernameRegisto === "Username"
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                Username inválido. Username tem que ter no minimo 3 caracteres, e um maximo de 20.
                 </div> : null}

            {errorEmailUsernameRegisto === "Email"
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                Email inválido. Insira um email válido.
                 </div> : null}

            {sucessoRegisto === true 
                ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                A sua conta foi criada com sucesso! 
                </div> : null}
                
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
