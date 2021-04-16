import { React, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
    const [signIn, setSignIn] = useState(true);

    function toggle_sign_up() {
        setSignIn(!signIn);

        if (signIn === true) {
            var toggle_side = document.getElementById("toggle_side");
            var toggle_side_width = toggle_side.clientWidth;

            var signup_id = document.getElementById("signup_id");
            var signup_id_width = signup_id.clientWidth;

            var signin_id = document.getElementById("signin_id");
            signin_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
            signup_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
            signup_id.style.zIndex = "0";

            toggle_side.style.transform = `translate(${signup_id_width}px, 0px)`;
        } else {
            var toggle_side = document.getElementById("toggle_side");
            toggle_side.style.transform = `translate(0px, 0px)`;

            var signin_id = document.getElementById("signin_id");
            signin_id.style.transform = `translate(0px, 0px)`;

            var signup_id = document.getElementById("signup_id");
            signup_id.style.transform = `translate(0px, 0px)`;
            signup_id.style.zIndex = "-1";
        }
    }

    function run_register(event) {
        event.preventDefault();
        let userInfo= {
            username: document.getElementById('nomeUtilizadorRegisto').value,
            email: document.getElementById('emailRegisto').value,
            password: document.getElementById('passwordRegisto').value,
        }
        
        fetch('http://localhost:4000/register', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        }).then(r=>r.json()).then(res=> {
            if(res) {
                console.log('New User was created')
                window.location.reload();
            }
        })
    }

    function run_login(event) {
        event.preventDefault();
        let userInfo= {
            username: document.getElementById('nomeUtilizadorLogin').value,
            password: document.getElementById('passwordLogin').value,
        }
        
        fetch('http://localhost:4000/login', {
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(userInfo)
        }).then(r=>r.json()).then(res=> {
            if(res) {
                console.log(res)
                window.location.reload();
            }
        })
    }

    return (
        <div className="container container-login">
            <div className="forms-container-login">
                <div id="signin_id" className={"signin"}>
                    <form action="#" className="sign-in-form" onSubmit={run_login}>
                        <h2 className="title">Iniciar Sessao</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input id="nomeUtilizadorLogin" type="text" placeholder="Nome de Utilizador" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input id="passwordLogin" type="password" placeholder="Palavra-chave" />
                        </div>
                        <input
                            type="submit"
                            value="Entrar"
                            className="btn-login solid"
                        />
                    </form>
                </div>

                <div id="signup_id" className="signup">
                    <form action="#" className="sign-in-form" onSubmit={run_register}>
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
                        <input
                            type="submit"
                            value="Registar"
                            className="btn-login solid"
                        />
                    </form>
                </div>

                <div
                    className={signIn ? "signin-side" : "signup-side"}
                    id="toggle_side"
                >
                    <button
                        className="btn-login transparent"
                        onClick={toggle_sign_up}
                    >
                        {signIn ? "Registe-se" : "Iniciar Sessao"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
