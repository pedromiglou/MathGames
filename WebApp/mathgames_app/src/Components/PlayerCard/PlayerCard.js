import React, { useEffect, useState } from 'react';
import './PlayerCard.css';
// import Avatar from '../Avatar';
import userService from '../../Services/user.service';
import { ranks_info } from '../../data/ranksInfo';

const PlayerCard = (({username, gameId, shouldFindUser}) => {
    const [user, setUser] = useState(null);
    var rankGameNames = {0: "rastros", 1: "gatos_e_caes"};
    //const Avatar = React.lazy(() => import('../Avatar'));

    useEffect(() => {
        if (!shouldFindUser)
            return;
        userService.getUserByUsername(username).then(value => {
            setUser(value)
        })
        //setUser( userService.getUserByUsername(username) );
    }, [username, shouldFindUser])

    function isGuest() {
        return user===null;
    }

    function getUserLevel() {
        let account_level = user.account_level;
        var contador = 1;
		if (typeof account_level !== "undefined") {
			while (true) {
				var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
				var maximo = 400 * Math.pow(contador, 1.1);
				if ( (minimo <= account_level) && (account_level < maximo)) {
					return contador;
				}
				contador++;
			}
		} else {
			return 0;
		}
    }

    // const hat = "MagicianHat";
    // const shirt = "";
    // const color = "#FFAF00";
    // const accessorie = "None";
    // const trouser = "#808080";

    return (
        <div className="exterior-card rounded">
            <div className="main-card">
                <div className="row ml-0 mr-0 h-100">
                    {/* <div className="col-4 pl-1 pr-1 avatar">
                        <Avatar skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
                    </div> */}
                    <div className="col h-100 main-card-body">
                        <div className="row mb-2 mt-2 justify-content-center card-username">
                            <div className="name-text">
                                { isGuest() && username }
                                { !isGuest() && user.username }
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
                        <div className="row mt-2">
                            <div className="col text-center level-text">
                                { isGuest() && "-" }
                                { !isGuest() && getUserLevel() }
                            </div>
                            <div className="col text-center level-text">
                                { isGuest() && "-" }
                                { !isGuest() && 
                                    <img alt="Rank" width={60} height={60} src={process.env.PUBLIC_URL + ranks_info[ userService.convert_user_rank( user.ranks[rankGameNames[gameId]] ) ].image } />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default PlayerCard;