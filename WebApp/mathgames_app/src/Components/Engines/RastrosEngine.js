import  React, {useEffect, useState} from "react";
import Phaser from "phaser";
import socket from "../../index"

var game_mode;
var ai_diff;

export const RastrosEngine = ({arg_game_mode, arg_ai_diff}) => {
    game_mode = arg_game_mode;

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
                height: 750,
            },
            backgroundColor: '#4488aa',
            scene: [RastrosScene]
        }
        new Phaser.Game(config);
        setRendered(true);
    }, [rendered]);
    
    return (
        
        <canvas id="game_canvas" className="game" />
    );
}

class RastrosScene extends Phaser.Scene {
	constructor() {
		super({key:"RastrosScene"});
	}

    preload() {
        this.load.image('square', process.env.PUBLIC_URL + '/game_assets/rastros/square.png');
        this.load.image('p1', process.env.PUBLIC_URL + '/game_assets/rastros/p1.png');
        this.load.image('p2', process.env.PUBLIC_URL + '/game_assets/rastros/p2.png');
        this.load.image('piece', process.env.PUBLIC_URL + '/game_assets/rastros/piece.png');
        this.load.image('blocked', process.env.PUBLIC_URL + '/game_assets/rastros/blocked.png');
        this.load.audio('click', [process.env.PUBLIC_URL + '/game_assets/rastros/move.wav']);
    }
    
    create() {
        this.INITIAL_BOARD_POS = 60
        this.DISTANCE_BETWEEN_SQUARES = 105

        // Sound effect played after every move
        this.move_sound = this.sound.add('click', {volume: 0.2});
        // Array that stores the board's clickable positions
        this.positions = []
        // Players which can move the piece
        this.player = new Set();
        // Stores the player which can move in a given turn
        this.current_player = 1;
        // True if the player's last click was the moving piece, false otherwise
        this.scene.clicked_piece_flag = false;
        // Squares which have been blocked
        this.blocked_squares = new Set();
        // Squares to where the moving piece can currently move
        this.valid_squares = new Set([10, 11, 12, 17, 19, 24, 25, 26]);
        // Positions referencing the last movement made
        this.last_played = new Set();
        // Stores whether the game has finished or not
        this.is_finished = false;

        var AI_blocked_squares = [[false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false]];

        if ( game_mode === 'offline' ) {
            this.player.add(1);
            this.player.add(2);
        }
        // Must be later changed to allow player to choose which side he is on
        if ( game_mode === 'ai' )
            this.player.add(1);

        if ( game_mode === "online" || game_mode === "amigo" ) {
            if ( sessionStorage.getItem("starter") === "false" )
                this.player.add(2);
            else
                this.player.add(1);

            socket.emit("start_game", sessionStorage.getItem("user_id"), sessionStorage.getItem("match_id"));
            socket.on("move_piece", (new_pos) => {
                console.log("Received move: ", new_pos);
                this.move(this.positions[new_pos]);
            });
        }


        // Loop used to fill the board with clickable squares
        for (var pos_y = 0; pos_y < 7; pos_y++) {
            for (var pos_x = 0; pos_x < 7; pos_x++) {
                var pos = pos_y*7+pos_x;
                if (pos === 6)
                    this.positions.push(this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'p2').setName(String(pos)).setInteractive());
                else if (pos === 42)
                    this.positions.push(this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'p1').setName(String(pos)).setInteractive());
                else
                    this.positions.push(this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setName(String(pos)).setInteractive());
            }
        }

        // Fill in the moving piece
        this.player_piece = this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*4, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*2, 'piece').setName('player_piece').setInteractive();

        // Fill in accessory text
        if (this.player.size===1)
            this.add.text(750+20, 30, "És o jogador " + this.player.values().next().value, {font: "40px Impact", color: "Orange"});
        this.add.text(750+20, 120, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
        this.current_player_text = this.add.text(750+95, 180, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});

        // Triggered when the player clicks
        this.input.on('pointerdown', function(pointer, currentlyOver) {
            var clicked_piece = currentlyOver[0];

            if (!this.player.has(this.current_player))
                return;

            if ( this.validate_click(clicked_piece) )
                if ( this.move(clicked_piece) ) {
                    // Emit move just made
                    if ( game_mode === "online" || game_mode === "amigo" )
                        socket.emit("move", clicked_piece.name, sessionStorage.getItem("user_id"), sessionStorage.getItem("match_id"));

                    // Process AI move
                    if ( game_mode === "ai" && !this.is_finished )
                        this.move( this.positions[ randomPlay(this.valid_squares, AI_blocked_squares, clicked_piece) ] );
                }
        }, this);
    }

    validate_click(clicked_piece) {
        if ( clicked_piece !== undefined )
            if (clicked_piece.name === "player_piece") {
                if (!this.clicked_piece_flag) {
                    this.clicked_piece_flag = !this.clicked_piece_flag;
                    this.valid_squares.forEach(square => this.positions[square].setTint(0x00FF00));
                } else {
                    this.clicked_piece_flag = false;
                    this.valid_squares.forEach(square => this.positions[square].clearTint());
                }
            } else if ( this.clicked_piece_flag ) {
                this.clicked_piece_flag = false;
                this.valid_squares.forEach(square => this.positions[square].clearTint());

                if ( this.valid_squares.has( parseInt(clicked_piece.name) ) )
                    return true;

            }
        return false;
    }

    move(clicked_square) {
        if ( this.valid_squares.has( parseInt(clicked_square.name) ) ) {
            this.move_sound.play();
    
            // Update blocked squares
            var old_x = ( this.player_piece.x - this.INITIAL_BOARD_POS )/ this.DISTANCE_BETWEEN_SQUARES;
            var old_y = ( this.player_piece.y - this.INITIAL_BOARD_POS )/ this.DISTANCE_BETWEEN_SQUARES;
            this.blocked_squares.add( old_y*7+old_x );
    
            // Remove last movement highlight and add new one
            this.last_played.forEach( pos => this.positions[pos].clearTint() );
            this.last_played.clear();
            this.last_played.add( old_y*7 + old_x );
            this.last_played.add( parseInt( clicked_square.name ) );
            this.last_played.forEach( pos =>  this.positions[pos].setTint(0xFFFF00) );
    
            // Move player piece to new square
            this.add.image(this.player_piece.x, this.player_piece.y, 'blocked').setName('blocked');
            this.player_piece.setPosition(clicked_square.x, clicked_square.y);
            
            // Get new square's position [0..49]
            var current_pos = parseInt( clicked_square.name )
            this.valid_squares.clear()
    
            // Add all possible positions
            this.valid_squares.add(current_pos-6);
            this.valid_squares.add(current_pos-7);
            this.valid_squares.add(current_pos-8);
    
            this.valid_squares.add(current_pos+6);
            this.valid_squares.add(current_pos+7);
            this.valid_squares.add(current_pos+8);
    
            this.valid_squares.add(current_pos-1);
            this.valid_squares.add(current_pos+1);
            
            // Remove invalid squares (edge cases)
            if ( [0,1,2,3,4,5,6].includes(current_pos) ) {
                this.valid_squares.delete(current_pos-6);
                this.valid_squares.delete(current_pos-7);
                this.valid_squares.delete(current_pos-8);
            }
    
            if ( [42,43,44,45,46,47,48].includes(current_pos) ) {
                this.valid_squares.delete(current_pos+6);
                this.valid_squares.delete(current_pos+7);
                this.valid_squares.delete(current_pos+8);
            }
    
            if ( [0,7,14,21,28,35,42].includes(current_pos) ) {
                this.valid_squares.delete(current_pos-8);
                this.valid_squares.delete(current_pos-1);
                this.valid_squares.delete(current_pos+6);
            }
    
            if ( [6,13,20,27,34,41,48].includes(current_pos) ) {
                this.valid_squares.delete(current_pos-6);
                this.valid_squares.delete(current_pos+1);
                this.valid_squares.delete(current_pos+8);
            }
    
            // Remove blocked squares
            this.blocked_squares.forEach(square => this.valid_squares.delete(square));
    
            // Check for win conditions
            if (current_pos === 6 || current_pos === 42 || set_diff(this.valid_squares, this.blocked_squares).size === 0) {
                this.finish_game(this, current_pos);
            }   else {
                this.current_player = (this.current_player===1 ? 2:1)
                this.current_player_text.setText("Jogador " + this.current_player);
            }

            return true;
        }
        return false;
    }

    finish_game(current_pos) {
        this.is_finished = true;
        this.valid_squares.clear();
        this.player.clear();

        if (current_pos === 42)
            var winner = 1
        else if (current_pos === 6)
            winner = 2
        else
            winner = this.current_player
    
        this.text = this.add.text(0, 0, "O jogador " + winner + " ganhou.", {font: "80px Impact", color: "Red"});
        this.tweens.add ({
            targets: this.text,
            x: 230,
            y: 270,
            durations: 2000,
            ease: "Elastic",
            easeParams: [1.5, 0.5],
            delay: 0
        }, this);
        this.positions.forEach(x => x.disableInteractive());
    }
}

function set_diff(a, b) {
    return new Set( [...a].filter(x => !b.has(x)) )
}

//make a play using the AI
function randomPlay(valid_squares, AI_blocked_squares, piece) {
    var chosen = null;
    var INITIAL_BOARD_POS = 60
    var DISTANCE_BETWEEN_SQUARES = 105

    var piece_x = ( piece.x - INITIAL_BOARD_POS )/ DISTANCE_BETWEEN_SQUARES;
    var piece_y = ( piece.y - INITIAL_BOARD_POS )/ DISTANCE_BETWEEN_SQUARES;
    AI_blocked_squares[piece_y][piece_x] = true;

    var tmpSquares = Array.from(valid_squares).map(x => [(parseInt(x)-(parseInt(x)%7))/7, parseInt(x)%7]);


    if (Math.random()>ai_diff) {         // [0..1] Prob   0.2->EASY     0.5->medium      0.8->dificil
        if ((Math.pow(0-piece_y, 2) + Math.pow(6-piece_x,2)<=8) ||
            (Math.pow(6-piece_y, 2) + Math.pow(0-piece_x,2)<=8)) {
                chosen = tmpSquares.reduce((accumulator, current) => {
                    if (Math.pow(accumulator[0]-0, 2) + Math.pow(accumulator[1] - 6, 2) < Math.pow(current[0]-0, 2) + Math.pow(current[1] - 6, 2)) {
                        return accumulator;
                    } else {
                        return current;
                    }
                });
        } else {
            chosen = tmpSquares[Math.floor(Math.random() * tmpSquares.length)];
        }
    } else {
        var score = -100;

        tmpSquares.forEach( (element) => {
            AI_blocked_squares[element[0]][element[1]] = true;
            var validSquares = [];
            for (var y = element[0]-1; y<=element[0]+1; y++) {
                for (var x = element[1]-1; x<=element[1]+1; x++) {
                    if (y>=0 && y<=6 && x>=0 && x<=6 && !AI_blocked_squares[y][x]) {
                        validSquares.push([y,x]);
                    }
                }
            }

            var newScore = minimax(validSquares, element, 9, false, AI_blocked_squares);
            if (newScore >= score) {
                chosen = element;
                score = newScore;
            }
            AI_blocked_squares[element[0]][element[1]] = false;
        });
    }

    AI_blocked_squares[chosen[0]][chosen[1]] = true;

    return chosen[0]*7+chosen[1];
}


//minimax algorithmn
function minimax(validSquares, piece, depth, maximizingPlayer, AI_blocked_squares) {
    var x = ended(piece, validSquares);

    if (depth === 0 || x===99 || x===-99) {
        return x;
    }

    var value;
    if (maximizingPlayer) {
        value = -100;
        validSquares.forEach((element) => {
            AI_blocked_squares[element[0]][element[1]] = true;
            var validSquares2 = [];
            for (var y = element[0]-1; y<=element[0]+1; y++) {
                for (x = element[1]-1; x<=element[1]+1; x++) {
                    if (y>=0 && y<=6 && x>=0 && x<=6 && !AI_blocked_squares[y][x]) {
                        validSquares2.push([y,x]);
                    }
                }
            }
            var newValue = minimax(validSquares2, element, depth-1, false, AI_blocked_squares);
            if (newValue > value) {
                value = newValue;
            }
            AI_blocked_squares[element[0]][element[1]] = false;
        })
    } else {
        value = 100;
        validSquares.forEach((element) => {
            AI_blocked_squares[element[0]][element[1]] = true;
            var validSquares2 = [];
            for (var y = element[0]-1; y<=element[0]+1; y++) {
                for (x = element[1]-1; x<=element[1]+1; x++) {
                    if (y>=0 && y<=6 && x>=0 && x<=6 && !AI_blocked_squares[y][x]) {
                        validSquares2.push([y,x]);
                    }
                }
            }
            var newValue = minimax(validSquares2, element, depth-1, true, AI_blocked_squares);
            if (newValue < value) {
                value = newValue;
            }
            AI_blocked_squares[element[0]][element[1]] = false;
        })
    }
    return value;
}

//heuristic
function ended(piece, validSquares) {
    if (piece[0] === 0 && piece[1] === 6) {
        return 99;
    } else if ((piece[0] === 6 && piece[1] === 0) || validSquares.length === 0) {
        return -99;
    } else {
        return 98 - Math.pow(piece[0]-0, 2) - Math.pow(piece[1] - 6, 2);
    }
}
