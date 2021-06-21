import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";

import * as FaIcons from "react-icons/fa";


function AboutUs() {

    function seeMoreInfo(id){

      if (id==="universidade"){
         window.open('https://www.ua.pt/pt/universidade', '_blank')
      } else if (id==="fabrica") {
         window.open('https://www.ua.pt/pt/fabrica/', '_blank')
      } else {
         window.open( id, '_blank')
      }
    }
    return (
        <>
            
            
        <div className="aboutSection">
         <div className="card-row">
               <div className="all">
                  <div className="profile-card card ricardo">
                     <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson ricardo" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/ricardo.JPG"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Ricardo Cruz</h1>
                              <h3>Product Owner</h3>
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
                     <div className="profile-card card diogo">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson diogo" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/diogo.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Diogo Carvalho</h1>
                              <h3>Team Manager</h3>
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
                     <div className="profile-card card rafa">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson rafa" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/rafa.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Rafael Baptista</h1>
                              <h3>DevOps</h3>
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
                     <div className="profile-card card cunha">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson cunha" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/cunha.jpg"}/>
                           </div>
                           <div class="align-items-center team_description">
                              <h1>Diogo Cunha</h1>
                              <h3>UX Designer</h3>
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
                     <div className="profile-card card amaral">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson amaral" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/amaral.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Pedro Amaral</h1>
                              <h3>Architect</h3>
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
                     <div className="profile-card card pedro">
                        <div className="body">
                           <div className="personalphoto">
                              <img className="photoperson pedro" alt="desenvolvedor" src={process.env.PUBLIC_URL +  "images/Team/pedro.jpg"}/>
                           </div>
                           <div className="align-items-center team_description">
                              <h1>Pedro Santos</h1>
                              <h3>QA Engineer</h3>
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
                        <div className="profile-card card professor">
                            <div className="body">
                            <div className="personalphoto">
                                <img className="photoperson professor" alt="coordenador" src={process.env.PUBLIC_URL +  "images/Team/nl.jpg"}/>
                            </div>
                            <div className="align-items-center team_description">
                                <h1>Nuno Lau</h1>
                                <h3>Advisor</h3>
                                
                                
    
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
                        <div className="profile-card card professor">
                            <div className="body">
                            <div className="personalphoto">
                                <img className="photoperson professor" alt="coordenador" src={process.env.PUBLIC_URL +  "images/Team/dg.jpg"}/>
                            </div>
                            <div className="align-items-center team_description">
                                <h1>Diogo Gomes</h1>
                                
                                <h3>Co-Advisor</h3>
                               
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

               <div className="collaborators-section">
                  <h1>Colaboradores</h1>
                  <div className="collaborators-flex">
                     <div className="collaborator uni">
                        <div>
                           <h1 className="sporrt_text" >Universidade de Aveiro</h1>
                           <p  className="lorem_text">A Universidade de Aveiro é, desde 2009, uma fundação pública com regime de direito privado. Atualmente, é frequentada por cerca de 17000 estudantes de graduação e pós-graduação, sendo que 9% são estudantes internacionais. Constituem ainda a comunidade académica, cerca de 1400 professores e investigadores e 630 membros do pessoal técnico, administrativo e de gestão.</p>
                           
                           <div onClick={() => seeMoreInfo("universidade")} className="button-clicky seeMoreInfo">
                              <span className="shadow"></span>
                              <span className="front">Ler mais</span>
                           </div>
                              
                           
                        </div>
                        
                        <div className="img-box">
                           <img src={process.env.PUBLIC_URL + "/images/Team/ua.jpeg"}/>
                        </div>
                     </div>
                     <div className="collaborator fccva">
                        <div>
                           <h1 className="sporrt_text" >Fábrica Centro Ciência Viva Aveiro</h1>
                           <p  className="lorem_text">À distância de um clique, a equipa da Fábrica “entra” online e em direto nas salas de aula com um conjunto de atividades, em diferentes formatos como workshops, histórias com ciência, oficinas laboratoriais e snacks de ciência, garantindo proximidade aos alunos de todas as idades. Mesmo estando à distância dos alunos e professores, é possível continuar a explorar ciência de forma interativa e dinâmica. </p>
                           
                           <div onClick={() => seeMoreInfo("fabrica")} className="button-clicky seeMoreInfo">
                              <span className="shadow"></span>
                              <span className="front">Ler mais</span>
                           </div>
                           
                        </div>
                        
                        <div className="img-box ">
                           <img src={process.env.PUBLIC_URL + "/images/Team/fabrica.jpg"} alt="fabrica centro ciência viva de Aveiro"/>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="Credits-section">
                  <h1>Avatar Créditos</h1>
                  <div className="credits-flex">
                     <div className="credit-item">
                        <h3>Christmas Hat</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/hats/christmasHat.png"} alt="christmas hat"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/3d-models/christmas-hat-b44d66b16ba543c9825af6f95bd3d678")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                     <div className="credit-item">
                        <h3>Sombrero Hat</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/hats/cowboyHat.png"} alt="christmas hat"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/models/e8d5a5d300024a7fa981cd294e97ce60")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                     <div className="credit-item">
                        <h3>Top Hat</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/hats/magicianHat.png"} alt="christmas hat"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/models/689cd0d635cf4906920dd3ba435d991e")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                     <div className="credit-item">
                        <h3>Trapper Hat</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/hats/ushanka.png"} alt="ushanka hat"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/models/1046cd56a67d4b79902e47aa0daf3ccb")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                     <div className="credit-item">
                        <h3>Witch Hat</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/hats/witchHat.png"} alt="witch hat"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/3d-models/witch-hat-444a0c2f7ed449be9f127341b4eb2137")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                     <div className="credit-item">
                        <h3>Deal With It Glasses</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/accessories/pixelGlasses.png"} alt="pixel glasses"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/models/53dd57e2352f45128f26e41eadd36699")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                     <div className="credit-item">
                        <h3>Steampunk glasses</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/accessories/steamPunkGlasses.png"} alt="steam punk glasses"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/3d-models/steampunk-glasses-808866ce78a24354ae871c0f8721097f")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                     <div className="credit-item">
                        <h3>Glasses</h3>
                        <img src={process.env.PUBLIC_URL + "/avatar_assets/accessories/sunGlasses.png"} alt="sun glasses"></img>
                        <div onClick={() => seeMoreInfo("https://sketchfab.com/models/5c78f100eea749c895d69fe2ed728197")} className="button-clicky seeSource">
                           <span className="shadow"></span>
                           <span className="front">Ver Source</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="contact_us">
                  <div className="contact-flex">
                     <div className="contact-logo">
                        <img src={process.env.PUBLIC_URL + "/images/Team/message.png"} alt="message-icon"/>
                     </div>
                     <div className="contact-description">
                        <ul>
                           <li>
                              <img src={process.env.PUBLIC_URL + "/images/Team/departamento.png"} alt="departamento-icon" />
                              <span>DETI - Departamento de Electrónica, Telecomunicações e Informática </span>
                              <span> Universidade de Aveiro</span>
                           </li>
                           <li>
                              <img src={process.env.PUBLIC_URL + "/images/Team/email.png"} alt="email-icon"/>
                              <span>math-games@outlook.pt</span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
        </div>
        
   
        </>
    );
}

export default AboutUs;
