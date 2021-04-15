import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";


const Profile = () => {
    return (
        <div className="hero-container">
            <div className="row container border">
                <div className="col-lg-3 side">
                    <input className="side-button" value="Geral" />
                    <input className="side-button" value="Password" /> 
                </div>
                <div className="col-lg-9">
                    <div className="container profile">
                        <img src={process.env.PUBLIC_URL + "/images/user-profile.png"} />
                        <div className="input-field">
                            <input type="text" value="Nome" />
                        </div>
                        <div className="input-field">
                            <input type="text" value="Nome" />
                        </div>
                        <div className="input-field">
                            <input type="text" value="Nome" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
