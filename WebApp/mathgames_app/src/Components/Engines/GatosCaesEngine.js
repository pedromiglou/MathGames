import  React, { useEffect } from "react";
import Phaser from "phaser";
import socket from "../../index"
import AuthService from '../../Services/auth.service';
import GatosCaesAI from "../AI/GatosCaesAI";

var game_mode;
var ai_diff;
var user;

export const GatosCaesEngine = ({arg_game_mode, arg_ai_diff}) => {
    useEffect(() => {
        game_mode = arg_game_mode;
        user = AuthService.getCurrentUser();

        if (arg_ai_diff === "easy")
            ai_diff = 0.2
        else if (arg_ai_diff === "medium")
            ai_diff = 0.5
        else
            ai_diff = 0.8

        const config = {
            canvas: document.getElementById("game_canvas"),
            type: Phaser.WEBGL,
            scale: {mode: Phaser.Scale.FIT},
            backgroundColor: '#4488aa',
            scene: [GatosCaesScene]
        }
        new Phaser.Game(config);
    }, [arg_game_mode, arg_ai_diff]);
    
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
        this.load.spritesheet('cat_dog', process.env.PUBLIC_URL + '/game_assets/gatos_caes/cat_dog.png', { frameWidth: 100, frameHeight: 100 });

        this.INITIAL_BOARD_POS = 60
        this.DISTANCE_BETWEEN_SQUARES = 105
        this.gcAI = new GatosCaesAI();

        // Players which can move the piece
        this.player = new Set();
        // Stores the player which can move in a given turn
        this.current_player = 0;

        this.valid_squares = {0: new Set(), 1: new Set()};
        this.player_0_first_move = true
        this.player_1_first_move = true
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

            socket.emit("start_game", {"user_id": sessionStorage.getItem("user_id"),"match_id": sessionStorage.getItem("match_id")});

            socket.on("move_piece", (new_pos) => {
                console.log("Received move: ", new_pos);
                this.move(this, this.squares_group.getChildren()[new_pos]);
            });
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
                    //tmpPositions.push(this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'center').setInteractive().setName(String(pos)));
                else
                    img = this.squares_group.create(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setInteractive().setName(String(pos));
                img.on('pointerup', function () {scene.click_square(this)});
                this.valid_squares[0].add(pos);
                this.valid_squares[1].add(pos);
            }
        }

        this.add.text(750+20, 60, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
        this.current_player_text = this.add.text(750+95, 120, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});
    }
    
    update() {}

    click_square(clicked_square) {
        if (!this.player.has(this.current_player))
            return;

        if ( this.valid_squares[this.current_player].has( parseInt(clicked_square.name) ) ) {
            if ( this.player_0_first_move && this.current_player === 0 && !["27", "28", "35", "36"].includes(clicked_square.name) )
                return;
            if ( this.player_1_first_move && this.current_player === 1 && ["27", "28", "35", "36"].includes(clicked_square.name) )
                return;
            this.move( clicked_square );
        }
        if ( game_mode === "online" || game_mode === "amigo" )
            socket.emit("move", clicked_square.name, sessionStorage.getItem("user_id"), sessionStorage.getItem("match_id"));
    
        if ( game_mode === "ai" )
            this.move( this.squares_group.getChildren()[ this.gcAI.randomPlay(ai_diff, this.valid_squares[this.current_player]) ] )
    }

    move(clicked_square) {
        // var adjacents = new Set();

        if (this.player_0_first_move && !this.current_player)
            this.player_0_first_move = false
        if (this.player_1_first_move && this.current_player)
            this.player_1_first_move = false

        this.move_sound.play();
        
        // Get new square's position [0..49]
        var current_pos = parseInt(clicked_square.name)

        // adjacents.clear()
        this.valid_squares[0].delete( current_pos )
        this.valid_squares[1].delete( current_pos )
        
        // Add player piece to new square
        this.add.sprite(clicked_square.x, clicked_square.y, 'cat_dog', this.current_player);

        var tmpPieceCoords = [(current_pos-(current_pos%8))/8, current_pos%8];
        console.log("----------------------------------------")
        console.log(current_pos);
        console.log(this.valid_squares[1 - this.current_player]);
        console.log(set_diff(this.valid_squares[1 - this.current_player], new Set([current_pos, current_pos-1, current_pos+1, current_pos-8, current_pos+8])));
        console.log("----------------------------------------")
        this.valid_squares[1 - this.current_player] = set_diff(this.valid_squares[1 - this.current_player], new Set([current_pos-1, current_pos+1, current_pos-8, current_pos+8]))

        if (this.valid_squares[1 - this.current_player].size === 0)
            this.finish_game(this);
        
        this.gcAI.playerPieces[tmpPieceCoords[0]][tmpPieceCoords[1]] = true;
        if (game_mode == "ai" && !this.player.has(this.current_player))
            this.gcAI.aiPieces[tmpPieceCoords[0]][tmpPieceCoords[1]] = true;

        this.current_player = 1 - this.current_player;
        this.current_player_text.setText("Jogador " + this.current_player);
    }

    finish_game() {    
        this.text = this.add.text(0, 0, "O jogador " + this.current_player+1 + " ganhou.", {font: "80px Impact", color: "Red"});
        this.tweens.add ({
            targets: this.text,
            x: 230,
            y: 270,
            durations: 2000,
            ease: "Elastic",
            easeParams: [1.5, 0.5],
            delay: 0
        }, this);
    }
}

function set_diff(a, b) {
    var c = new Set( [...a].filter(x => !b.has(x)) )
    return c
}