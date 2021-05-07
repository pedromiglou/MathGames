import  React,  {useEffect, useState} from "react";
import Phaser from "phaser";
import socket from "../../index"
import AuthService from '../../Services/auth.service';

var user1;
var game_mode;
var ai_diff;

export const GatosCaesEngine = ({arg_game_mode, arg_ai_diff}) => {
    game_mode = arg_game_mode;
    user1 = AuthService.getCurrentUser();

    if (arg_ai_diff === "easy")
        ai_diff = 0.2
    else if (arg_ai_diff === "medium")
        ai_diff = 0.5
    else
        ai_diff = 0.8

    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (rendered)
            return;

        let canvasobj = document.getElementById("game_canvas");
        canvasobj.style.border = "20px solid black";

        const config = {
            canvas: canvasobj,
            type: Phaser.WEBGL,
            scale: {
                mode: Phaser.Scale.FIT,
                width: 1100,
                height: 855,
            },
            backgroundColor: '#4488aa',
            scene: [GatosCaesScene]
        }
        new Phaser.Game(config);
        setRendered(true);
    }, [rendered]);
    
    return (
        
        <canvas id="game_canvas" className="game" />
    );
}


class GatosCaesScene extends Phaser.Scene {
	constructor() {
		super({key:"GatosCaesScene"});
	}

    preload() {
        this.load.image('square', process.env.PUBLIC_URL + '/game_assets/gatos_caes/square.png')
		this.load.spritesheet('cat_dog', process.env.PUBLIC_URL + '/game_assets/gatos_caes/cat_dog.png', { frameWidth: 100, frameHeight: 100 });
		this.load.image('center', process.env.PUBLIC_URL + '/game_assets/gatos_caes/center_square.png')
        this.load.audio('click', [process.env.PUBLIC_URL + '/game_assets/rastros/move.wav']);
    }
    
    create() {
        var INITIAL_BOARD_POS = 60
        var DISTANCE_BETWEEN_SQUARES = 105

        // Sound effect played after every move
        this.move_sound = this.sound.add('click', {volume: 0.2});
        // Array that stores the board's clickable positions
        this.positions = []
        // Player which is currently playing (0 or 1)
        this.current_player = 0;				
        this.player_turn = true;
        this.player_0_valid_squares = new Set()
        this.player_1_valid_squares = new Set()
        this.player_0_first_move = true
        this.player_1_first_move = true

        var adjacents = new Set()

        //AI Variables
        this.aiPieces = [[false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false]];
        
        this.playerPieces = [[false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false]];
        
        this.turnCount = 0;



        if ( game_mode === "online" || game_mode === "amigo" ) {
            if ( sessionStorage.getItem("starter") === "false" ) {
                this.player_turn = false;
            }
            else {
                this.player_turn = true
            }

            if (user1 === null)
                socket.emit("start_game", { "user_id": sessionStorage.getItem("user_id"),"match_id": sessionStorage.getItem("match_id"),  "account_player": false});
            else
                socket.emit("start_game", { "user_id": String(user1.id), "match_id": sessionStorage.getItem("match_id"), "account_player": true});

            socket.on("move_piece", (new_pos) => {
                console.log("Received move: ", new_pos);
                move(this, adjacents, this.positions[new_pos], current_player_text);
            });
        }

        // temos que adicionar só no fim as imagens dos X centrais, para quando recebemos o new_pos no online podermos mapear logo no positions[new_pos]
        var tmpPositions = []
        // Loop used to fill the board with clickable squares
        for (var pos_y = 0; pos_y < 8; pos_y++) {
            for (var pos_x = 0; pos_x < 8; pos_x++) {
                var pos = pos_y*8+pos_x;
                this.player_0_valid_squares.add(String(pos))
                this.player_1_valid_squares.add(String(pos))
                if ([27, 28, 35, 36].includes(pos)) {
                    this.positions.push(this.add.image(INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*pos_x, INITIAL_BOARD_POS+DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setName(String(pos)).setInteractive());
                    tmpPositions.push(this.add.image(INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*pos_x, INITIAL_BOARD_POS+DISTANCE_BETWEEN_SQUARES*pos_y, 'center').setName(String(pos)).setInteractive());
                } else {
                    this.positions.push(this.add.image(INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*pos_x, INITIAL_BOARD_POS+DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setName(String(pos)).setInteractive());
                }
            }
        }

        this.positions.concat(tmpPositions)
        

        this.add.text(750+20, 60, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
        var current_player_text = this.add.text(750+95, 120, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});
        

        // Triggered when the player clicks
        this.input.on('pointerdown', function(pointer, currentlyOver) {
            var clicked_piece = currentlyOver[0];
            if (clicked_piece === undefined) {
                return
            }


            if (this.player_turn) {
                if (this.player_0_first_move && this.current_player === 0) {
                    if (["27", "28", "35", "36"].includes(clicked_piece.name)) {
                        if (move(this, adjacents, clicked_piece, current_player_text)) {
                            if ( game_mode === "online" || game_mode === "amigo" )
                                if (user1 === null)
                                    socket.emit("move", clicked_piece.name, sessionStorage.getItem("user_id"), sessionStorage.getItem("match_id"));
                                else
                                    socket.emit("move", clicked_piece.name, String(user1.id), sessionStorage.getItem("match_id"));

                        
                            if ( game_mode === "ai" )
                                move(this, adjacents, this.positions[ randomPlay(this) ], current_player_text)
                        }
                    }
                } else if (this.player_1_first_move && this.current_player === 1) {
                    if (!["27", "28", "35", "36"].includes(clicked_piece.name)) {
                        if (move(this, adjacents, clicked_piece, current_player_text)) {
                            if ( game_mode === "online" || game_mode === "amigo" )
                                if (user1 === null)
                                    socket.emit("move", clicked_piece.name, sessionStorage.getItem("user_id"), sessionStorage.getItem("match_id"));
                                else
                                    socket.emit("move", clicked_piece.name, String(user1.id), sessionStorage.getItem("match_id"));
                        
                            if ( game_mode === "ai" )
                                move(this, adjacents, this.positions[ randomPlay(this) ], current_player_text)
                        }
                    }
                } else if (!(this.player_1_first_move && this.player_0_first_move)) {
                    if (move(this, adjacents, clicked_piece, current_player_text)) {
                        if ( game_mode === "online" || game_mode === "amigo" )
                            if (user1 === null)
                                socket.emit("move", clicked_piece.name, sessionStorage.getItem("user_id"), sessionStorage.getItem("match_id"));
                            else
                                socket.emit("move", clicked_piece.name, String(user1.id), sessionStorage.getItem("match_id"));
                    
                        if ( game_mode === "ai" )
                            move(this, adjacents, this.positions[ randomPlay(this) ], current_player_text)
                    }
                }   
            }
        }, this);
    }
    
    update() {}
    

    render() {
        return (
            <canvas id="game_canvas" />
        );
        
    }
}


function move(scene, adjacents, clicked_piece, current_player_text) {
    if ( (scene.player_0_valid_squares.has(clicked_piece.name) && scene.current_player === 0) 
        || (scene.player_1_valid_squares.has(clicked_piece.name) && scene.current_player === 1) ) {

        if (scene.player_0_first_move && scene.current_player === 0)
            scene.player_0_first_move = false
        if (scene.player_1_first_move && scene.current_player === 1)
            scene.player_1_first_move = false

        scene.move_sound.play();
        
        // Get new square's position [0..49]
        var current_pos = parseInt(clicked_piece.name)

        adjacents.clear()
        scene.player_0_valid_squares.delete(String(current_pos))
        console.log("aqui22")
        console.log(scene.player_0_valid_squares)

        scene.player_1_valid_squares.delete(String(current_pos))
        adjacents.add(String(current_pos-1))
        adjacents.add(String(current_pos+1))
        adjacents.add(String(current_pos-8))
        adjacents.add(String(current_pos+8))

        // Remove invalid squares (edge cases)
        if ( [0,1,2,3,4,5,6,7].includes(current_pos) ) {
            adjacents.delete(String(current_pos-8));
        }

        if ( [56,57,58,59,60,61,62,63].includes(current_pos) ) {
            adjacents.delete(String(current_pos+8));
        }

        if ( [0,8,16,24,32,40,48,56].includes(current_pos) ) {
            adjacents.delete(String(current_pos-1));
        }

        if ( [7,15,23,31,39,47,55].includes(current_pos) ) {
            adjacents.delete(String(current_pos+1));
        }
        
        // Add player piece to new square
        scene.add.sprite(clicked_piece.x, clicked_piece.y, 'cat_dog', scene.current_player);
        var tmpPieceCoords = [(parseInt(clicked_piece.name)-(parseInt(clicked_piece.name)%8))/8, parseInt(clicked_piece.name)%8];
        if (scene.current_player === 0) {
            scene.playerPieces[tmpPieceCoords[0]][tmpPieceCoords[1]] = true;
            scene.player_1_valid_squares = set_diff(scene.player_1_valid_squares, adjacents)
            if (scene.player_1_valid_squares.size === 0) {
                finish_game(scene)
            }
        } else {
            scene.aiPieces[tmpPieceCoords[0]][tmpPieceCoords[1]] = true;
            scene.player_0_valid_squares = set_diff(scene.player_0_valid_squares, adjacents)
            if (scene.player_0_valid_squares.size === 0) {
                finish_game(scene)
            }
        }
        
        scene.current_player = 1 - scene.current_player
        current_player_text.setText("Jogador " + scene.current_player);
        scene.turnCount++;

        if ( game_mode === "online" || game_mode === "amigo" || game_mode === "ai" ) 
            scene.player_turn = !scene.player_turn;
    
        return true
    }
    
    return false
}


function set_diff(a, b) {
    var c = new Set( [...a].filter(x => !b.has(x)) )
    return c
}

function finish_game(scene) {
    var winner = scene.current_player

    scene.text = scene.add.text(0, 0, "O jogador " + winner + " ganhou.", {font: "80px Impact", color: "Red"});
    scene.tweens.add ({
        targets: scene.text,
        x: 230,
        y: 270,
        durations: 2000,
        ease: "Elastic",
        easeParams: [1.5, 0.5],
        delay: 0
    }, scene);
}





//make a play using the AI
/*
transform validSquares to [[1,2],[2,3],...]
keep 2 matrixes aiPieces and playerPieces with only true/false -> initially everything is false
keep count of every turn
at the end transform chosen as needed
*/
function randomPlay(scene) {
    var chosen = null;
    var tmpSquares = Array.from(scene.player_1_valid_squares).map(x => [(parseInt(x)-(parseInt(x)%8))/8, parseInt(x)%8]);


    if (Math.random()>ai_diff) {
        chosen = tmpSquares[Math.floor(Math.random() * tmpSquares.length)];
    } else {
        var score = -100;

        tmpSquares.forEach( (piece) => {
            var validSquares2 = [];
            scene.aiPieces[piece[0]][piece[1]] = true;
            for (var y=0; y<8; y++) {
                for (var x=0;x<8;x++) {
                    if (!scene.aiPieces[y][x] && !scene.playerPieces[y][x] && (y===0 || !scene.playerPieces[y-1][x]) &&
                    (y===7 || !scene.playerPieces[y+1][x]) && (x===0 || !scene.playerPieces[y][x-1]) && (x===7 || !scene.playerPieces[y][x+1])) {
                        validSquares2.push([y,x]);
                    }
                }
            }
            var newScore = minimax(validSquares2, Math.ceil(scene.turnCount/7), false, scene.aiPieces, scene.playerPieces);
            if (newScore > score) {
                chosen = piece;
                score = newScore;
            }

            scene.aiPieces[piece[0]][piece[1]] = false;
        });
    }

    return chosen[0]*8+chosen[1];
}

//minimax algorithmn
function minimax(validSquares, depth, maximizingPlayer, aiPieces, playerPieces) {
    var value;

    if (depth === 0 || validSquares.length===0) {
        return heuristic(aiPieces, playerPieces);
    }

    if (maximizingPlayer) {
        value = -100;
        validSquares.forEach((piece) => {
            var validSquares2 = [];
            aiPieces[piece[0]][piece[1]] = true;
            for (var y=0; y<8; y++) {
                for (var x=0;x<8;x++) {
                    if (!aiPieces[y][x] && !playerPieces[y][x] && (y===0 || !playerPieces[y-1][x]) &&
                    (y===7 || !playerPieces[y+1][x]) && (x===0 || !playerPieces[y][x-1]) && (x===7 || !playerPieces[y][x+1])) {
                        validSquares2.push([y,x]);
                    }
                }
            }

            var newValue = minimax(validSquares2, depth-1, false, aiPieces, playerPieces);
            if (newValue > value) {
                value = newValue;
            }
            
            aiPieces[piece[0]][piece[1]] = false;
        })
    } else {
        value = 100;
        validSquares.forEach((piece) => {
            var validSquares2 = [];
            playerPieces[piece[0]][piece[1]] = true;
            for (var y=0; y<8; y++) {
                for (var x=0;x<8;x++) {
                    if (!aiPieces[y][x] && !playerPieces[y][x] && (y===0 || !aiPieces[y-1][x]) &&
                    (y===7 || !aiPieces[y+1][x]) && (x===0 || !aiPieces[y][x-1]) && (x===7 || !aiPieces[y][x+1])) {
                        validSquares2.push([y,x]);
                    }
                }
            }

            var newValue = minimax(validSquares2, depth-1, true, aiPieces, playerPieces);
            if (newValue < value) {
                value = newValue;
            }
            
            playerPieces[piece[0]][piece[1]] = false;
        })
    }
    return value;
}




function heuristic(aiPieces, playerPieces) {
    var countAI = 0;
    var countPlayer = 0;
    for (var y=0; y<8; y++) {
        for (var x=0;x<8;x++ ) {
            if (!playerPieces[y][x] && !aiPieces[y][x] && (y===0 || !aiPieces[y-1][x]) &&
            (y===7 || !aiPieces[y+1][x]) && (x===0 || !aiPieces[y][x-1]) && (x===7 || !aiPieces[y][x+1])) {
                countPlayer++;
            }
            if (!aiPieces[y][x] && !playerPieces[y][x] && (y===0 || !playerPieces[y-1][x]) &&
            (y===7 || !playerPieces[y+1][x]) && (x===0 || !playerPieces[y][x-1]) && (x===7 || !playerPieces[y][x+1])) {
                countAI++;
            }
        }
    }
    return countAI-countPlayer;
}