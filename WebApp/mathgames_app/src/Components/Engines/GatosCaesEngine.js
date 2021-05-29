import  React, { useEffect } from "react";
import Phaser from "phaser";
import socket from "../../index"
import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';
import GatosCaesAI from "../AI/GatosCaesAI";

var game_mode, ai_diff, auth_user, current_match, processGameOver;

export const GatosCaesEngine = ({process_game_over, arg_game_mode, arg_ai_diff, curr_match}) => {
    useEffect(() => {
        // Clear listeners to make sure there are no repeated events
        socket.off("match_end");
        socket.off("move_piece");

        current_match = curr_match;
        processGameOver = process_game_over;
        game_mode = arg_game_mode;
        auth_user = AuthService.getCurrentUser();

        if (arg_ai_diff === "easy")
            ai_diff = 0.2
        else if (arg_ai_diff === "medium")
            ai_diff = 0.5
        else
            ai_diff = 0.8

        const config = {
            parent: document.getElementById("my_div_game"),
            transparent: true,
            type: Phaser.WEBGL,
            scale: {
                mode: Phaser.Scale.RESIZE
            },
            scene: [GatosCaesScene]
        }
        new Phaser.Game(config);
    }, [process_game_over, arg_game_mode, arg_ai_diff, curr_match]);
    
    return (<></>);
}

class GatosCaesScene extends Phaser.Scene {
	constructor() {
		super({key:"GatosCaesScene"});
	}

    preload() {
        this.load.image('square', process.env.PUBLIC_URL + '/game_assets/gatos_caes/square.png')
		this.load.image('center', process.env.PUBLIC_URL + '/game_assets/gatos_caes/center_square.png')
        this.load.audio('click', [process.env.PUBLIC_URL + '/game_assets/rastros/move.wav']);
        this.load.spritesheet('cat_dog', process.env.PUBLIC_URL + '/game_assets/gatos_caes/cat_dog.png', { frameWidth: 74, frameHeight: 74 });

        this.INITIAL_BOARD_POS = 37 + 5;
        this.DISTANCE_BETWEEN_SQUARES = 75 + 2;
        this.gcAI = new GatosCaesAI();

        // Players which can move the piece
        this.player = new Set();
        // Stores the player which can move in a given turn
        this.current_player = 0;

        this.game_over = false;

        this.valid_squares = {0: new Set(), 1: new Set()};
        this.player_0_first_move = true
        this.player_1_first_move = true
        this.mycount = 0;
    }

    create() {
        this.squares_group = this.add.group();

        // Sound effect played after every move
        this.move_sound = this.sound.add('click', {volume: 0.2});

        if ( game_mode === 'offline' ) {
            this.player.add(0);
            this.player.add(1);
        }

        // Must be later changed to allow player to choose which side he is on
        if ( game_mode === 'ai' )
            this.player.add(0);

        if ( game_mode === "online" || game_mode === "amigo" ) {
            if ( sessionStorage.getItem("starter") === "false" )
                this.player.add(1);
            else
                this.player.add(0);

            socket.emit("start_game", { "user_id": AuthService.getCurrentUserId(),"match_id": current_match['match_id'],  "account_player": false});
            
            socket.on("move_piece", (new_pos) => {
                console.log("Received move: ", new_pos);
                this.move(this.squares_group.getChildren()[new_pos]);
            });

            socket.on("match_end", (msg) => {
                console.log("Game Over Received")
                if (this.game_over === false)
                    this.finish_game(msg)
                atualizarUserInfo();
            })
        }

        // temos que adicionar só no fim as imagens dos X centrais, para quando recebemos o new_pos no online podermos mapear logo no positions[new_pos]
        var img;
        var scene = this;
        // Loop used to fill the board with clickable squares
        for (var pos_y = 0; pos_y < 8; pos_y++) {
            for (var pos_x = 0; pos_x < 8; pos_x++) {
                var pos = pos_y*8+pos_x;
                if ([27, 28, 35, 36].includes(pos))
                    img = this.squares_group.create(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'center').setInteractive().setName(String(pos));
                else
                    img = this.squares_group.create(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setInteractive().setName(String(pos));
                img.on('pointerup', function () {scene.click_square(this)});
                this.valid_squares[0].add(pos);
                this.valid_squares[1].add(pos);
            }
        }

        if (this.player.size===1)
            this.add.text(624+60, 30, "És o jogador " + (this.player.values().next().value+1), {font: "40px Impact", color: "Orange"});
        this.add.text(624+40, 120, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
        this.current_player_text = this.add.text(624+95, 180, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});
    }
    
    update() {
        this.mycount += 1;
        if ( this.mycount >= 2 && !this.game_over && game_mode === "ai" && !this.player.has(this.current_player) )
            this.move( this.squares_group.getChildren()[ this.gcAI.randomPlay(ai_diff, this.valid_squares[this.current_player]) ] );
    }

    click_square(clicked_square) {
        if (!this.player.has(this.current_player))
            return;

        if ( this.valid_squares[this.current_player].has( parseInt(clicked_square.name) ) ) {
            if ( this.player_0_first_move && this.current_player === 0 && !["27", "28", "35", "36"].includes(clicked_square.name) )
                return;
            if ( this.player_1_first_move && this.current_player === 1 && ["27", "28", "35", "36"].includes(clicked_square.name) )
                return;
            this.move( clicked_square );
            if ( game_mode === "online" || game_mode === "amigo" )
                socket.emit("move", clicked_square.name, AuthService.getCurrentUserId(), current_match['match_id']);
        }
    }

    move(clicked_square) {
        this.mycount = 0;
        this.move_sound.play();

        // Update first move variables
        if (this.player_0_first_move && !this.current_player)
            this.player_0_first_move = false
        if (this.player_1_first_move && this.current_player)
            this.player_1_first_move = false
        
        // Get new square's position [0..49]
        var current_pos = parseInt(clicked_square.name)

        var adjacents = new Set([current_pos-1, current_pos+1, current_pos-8, current_pos+8]);

        if ( [0,1,2,3,4,5,6,7].includes(current_pos) )
            adjacents.delete(current_pos-8);

        if ( [56,57,58,59,60,61,62,63].includes(current_pos) )
            adjacents.delete(current_pos+8);

        if ( [0,8,16,24,32,40,48,56].includes(current_pos) )
            adjacents.delete(current_pos-1);

        if ( [7,15,23,31,39,47,55].includes(current_pos) )
            adjacents.delete(current_pos+1);

        // Remove played position from both player's valid squares
        this.valid_squares[0].delete( current_pos )
        this.valid_squares[1].delete( current_pos )
        
        // Add player piece to new square
        this.add.sprite(clicked_square.x, clicked_square.y, 'cat_dog', this.current_player);

        var tmpPieceCoords = [(current_pos-(current_pos%8))/8, current_pos%8];

        // Remove adjacent squares from opponent's valid moves
        this.valid_squares[1 - this.current_player] = set_diff(this.valid_squares[1 - this.current_player], adjacents)

        // Check for win conditions
        if ( game_mode === "offline" || game_mode === "ai" ) {
            let winner = "";

            if ( this.valid_squares[1 - this.current_player].size === 0 )
                winner = "player" + String(1+this.current_player);

            if ( winner !== "" ) {
                this.finish_game( {match_id: current_match['match_id'], match_result: winner, end_mode: "valid_move"} );
                return;
            }
        }

        // Update AI's data structures
        if ( game_mode === "ai" ) {
            this.gcAI.playerPieces[tmpPieceCoords[0]][tmpPieceCoords[1]] = true;
            if (!this.player.has(this.current_player))
                this.gcAI.aiPieces[tmpPieceCoords[0]][tmpPieceCoords[1]] = true;
        }

        // Update player text
        this.current_player = 1 - this.current_player;
        this.current_player_text.setText("Jogador " + (this.current_player+1));
    }

    finish_game(end_message) {
        if ( String(end_message['match_id']) !== String(current_match['match_id']) )
            return;

        this.game_over = true;

        processGameOver(end_message);
    }
}

async function atualizarUserInfo() {
    var response = await UserService.getUserById(auth_user.id)
    var newResponse = await UserService.getUserRanksById(auth_user.id)
    response["token"] = JSON.parse(sessionStorage.getItem("user"))["token"]
    response["userRanksData"] = newResponse
    sessionStorage.setItem("user", JSON.stringify(response));
}



function set_diff(a, b) {
    var c = new Set( [...a].filter(x => !b.has(x)) )
    return c
}