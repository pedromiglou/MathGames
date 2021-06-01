import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";

import * as FaIcons from "react-icons/fa";


function AboutUs() {
    return (
        <>
            
            
        <div className="aboutSection">
        <h1>A nossa equipa</h1>
        <div className="card-row">
            <div className="all">
                <div className="profile card ricardo">
                    <div className="body">
                        <div className="personalphoto">
                            <img className="photoperson ricardo" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/ricardo.JPG"}/>
                        </div>
                        <div className="align-items-center team_description">
                            <h1>Ricardo Cruz</h1>
                            {/* <h3>Product Owner</h3> */}
                            <div className="row media">
                                 <a className="circle ricardo" href="https://www.linkedin.com/in/ricardo-cruz-139599208/"><FaIcons.FaLinkedin></FaIcons.FaLinkedin></a>
                                 <a className="circle ricardo" href="https://github.com/ricardocruz29"><FaIcons.FaGithub></FaIcons.FaGithub></a>
                              </div>
                        </div>
                    </div>
                    <div className="wave_section">
                        <section className="cool_waves">
                            <div className="wave wave1"></div>
                        </section>
                    </div>
                </div>
            </div>
                <div className="all">
                     <div className="profile card diogo">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson diogo" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/diogo.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Diogo Carvalho</h1>
                              {/* <h3>Team Manager</h3> */}
                              <div className="row media">
                                 <a className="circle diogo" href="https://www.linkedin.com/in/diogo-carvalho-43bb33209/"><FaIcons.FaLinkedin></FaIcons.FaLinkedin></a>
                                 <a className="circle diogo" href="https://github.com/DiogoCarvalhoo"><FaIcons.FaGithub></FaIcons.FaGithub></a>
                              </div>
                           </div>
                        </div>
                        <div className="wave_section">
                           <section className="cool_waves">
                              <div className="wave wave1"></div>
                           </section>
                        </div>
                     </div>
                  </div>
                  <div className="all">
                     <div className="profile card rafa">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson rafa" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/rafa.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Rafael Baptista</h1>
                              {/* <h3>DevOps</h3> */}
                              <div class="row media">
                                 <a href="https://www.linkedin.com/in/rafael-baptista-51319a195/" className="circle rafa"><FaIcons.FaLinkedin></FaIcons.FaLinkedin></a>
                                 <a href="https://github.com/rafaelbaptista13" className="circle rafa"><FaIcons.FaGithub></FaIcons.FaGithub></a>
                              </div>
                           </div>
                        </div>
                        <div className="wave_section">
                           <section className="cool_waves">
                              <div className="wave wave1"></div>
                           </section>
                        </div>
                     </div>
                  </div>

                  <div className="all">
                     <div className="profile card cunha">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson cunha" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/cunha.jpg"}/>
                           </div>
                           <div class="align-items-center team_description">
                              <h1>Diogo Cunha</h1>
                              {/* <h3>UX Designer</h3> */}
                              <div className="row media">
                                 <a className="circle cunha" href="https://www.linkedin.com/in/diogo-cunha-a86185177/"><FaIcons.FaLinkedin></FaIcons.FaLinkedin></a>
                                 <a className="circle cunha" href="https://github.com/dgCunhaUA"><FaIcons.FaGithub></FaIcons.FaGithub></a>
                              </div>
                           </div>
                        </div>
                        <div className="wave_section">
                           <section className="cool_waves">
                              <div className="wave wave1"></div>
                           </section>
                        </div>
                     </div>
                  </div>
                  <div className="all">
                     <div className="profile card amaral">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson amaral" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/amaral.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Pedro Amaral</h1>
                              {/* <h3>Architect</h3> */}
                              <div className="row media">
                                 <a className="circle amaral" href="https://www.linkedin.com/in/pedro-amaral-528b221a3/"><FaIcons.FaLinkedin></FaIcons.FaLinkedin></a>
                                 <a className="circle amaral" href="https://github.com/pedromiglou"><FaIcons.FaGithub></FaIcons.FaGithub></a>
                              </div>
                           </div>
                        </div>
                        <div className="wave_section">
                           <section className="cool_waves">
                              <div className="wave wave1"></div>
                           </section>
                        </div>
                     </div>
                  </div>
                  <div className="all">
                     <div className="profile card pedro">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson pedro" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/pedro.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Pedro Santos</h1>
                              {/* <h3>QA Engineer</h3> */}
                              <div className="row media">
                                 <a href="https://www.linkedin.com/in/pedro-santos-46103920a/" className="circle pedro"><FaIcons.FaLinkedin></FaIcons.FaLinkedin></a>
                                 <a href="https://github.com/PedroS50" className="circle pedro"><FaIcons.FaGithub></FaIcons.FaGithub></a>
                              </div>
                           </div>
                        </div>
                        <div className="wave_section">
                           <section className="cool_waves">
                              <div className="wave wave1"></div>
                           </section>
                        </div>
                     </div>
                     
                  </div>
                  <div className="all">
                        <div className="profile card professor">
                            <div className="body">
                            <div className="personalphoto">
                                <img className="photoperson professor" alt="coordenador" src={process.env.PUBLIC_URL +  "images/Team/nl.jpg"}/>
                            </div>
                            <div className="align-items-center team_description">
                                <h1>Nuno Lau</h1>
                                
                                
                                
    
                            </div>
                            </div>
                            <div className="wave_section">
                            <section className="cool_waves">
                                <div className="wave wave1"></div>
                            </section>
                            </div>
                        </div>
                    </div>
                    <div className="all">
                        <div className="profile card professor">
                            <div className="body">
                            <div className="personalphoto">
                                <img className="photoperson professor" alt="coordenador" src={process.env.PUBLIC_URL +  "images/Team/dg.jpg"}/>
                            </div>
                            <div className="align-items-center team_description">
                                <h1>Diogo Gomes</h1>
                                
                                
                               
                                
                            </div>
                            </div>
                            <div className="wave_section">
                            <section className="cool_waves">
                                <div className="wave wave1"></div>
                            </section>
                            </div>
                        </div>
                    </div>

                </div>
        </div>
        
   
        </>
    );
}

export default AboutUs;
