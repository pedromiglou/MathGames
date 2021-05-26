import './PlayerCard.css';

import Avatar from '../Avatar';
//import AuthService from '../../Services/auth.service';

function PlayerCard() {
    const hat = "MagicianHat";
    const shirt = "";
    const color = "#FFAF00";
    const accessorie = "None";
    const trouser = "#808080";

    return (
        <div className="exterior-card rounded">
            <div className="main-card">
                <div className="row ml-0 mr-0 h-100">
                    <div className="col-4 avatar">
                        <Avatar skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
                    </div>
                    <div className="col h-100">
                        <div className="row mb-2 mt-2">
                            <div className="col text-center">
                            Nome de Jogador
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-center">
                                Nivel
                            </div>
                            <div className="col-6 text-center">
                                Rank
                            </div>
                        </div>
                        <div className="row">
                            <div class="col text-center level-text">
                                30
                            </div>
                            <div class="col text-center level-text">
                                30
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;