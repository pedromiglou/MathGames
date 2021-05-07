import { React, useState, useEffect} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import AuthService from "../../Services/auth.service"

function Login() {
    const [signIn, setSignIn] = useState(true);
    const [errorLogin, setErroLogin] = useState(false);
    const [errorRegisto, setErroRegisto] = useState(false);
    const [sucessoRegisto, setSucessoRegisto] = useState(false);

    async function login() {
        setErroRegisto(false);
        setErroLogin(false)
        var response = await AuthService.login(
            document.getElementById("nomeUtilizadorLogin").value,
            document.getElementById("passwordLogin").value
        )   
        
        if (response === true)
            window.location.assign("http://localhost:3000/");
        else {
            setErroLogin(true);
        }
    }

    

    async function register() {
        setErroRegisto(false);
        setErroLogin(false)
        var response = await AuthService.register(
            document.getElementById("nomeUtilizadorRegisto").value,
            document.getElementById("emailRegisto").value,
            document.getElementById("passwordRegisto").value
        )

        if (response === true) {
            document.getElementById('nomeUtilizadorRegisto').value = ''
            document.getElementById('emailRegisto').value = ''
            document.getElementById('passwordRegisto').value = ''
            document.getElementById('change_button').click()
            setSucessoRegisto(true);
            }
        else
            setErroRegisto(true);
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
            {errorLogin === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "60%", textAlign:"center", fontSize:"22px"}}> 
                Ocorreu um erro no seu processo login. As suas credênciais são inválidas.
                 </div> 
                : null}

            {errorRegisto === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "60%", textAlign:"center", fontSize:"22px"}}>
                Ocorreu um erro no seu processo registo. Username/Email já se encontram em utilização.
                 </div> : null}

            {sucessoRegisto === true 
                ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "60%", textAlign:"center", fontSize:"22px"}}>
                A sua conta foi criada com sucesso! 
                </div> : null}

            <div className="container container-login">
            <div className="forms-container-login">
                <div id="signin_id" className={"signin"}>
                    <form action="#" className="sign-in-form">
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
                    <form action="#" className="sign-in-form" >
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
