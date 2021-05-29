import  React, { useEffect } from "react";
import Phaser from "phaser";
import socket from "../../index"
import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';
import RastrosAI from "../AI/RastrosAI";

var game_mode, ai_diff, auth_user, current_match, processGameOver;

export const RastrosEngine = ({process_game_over, arg_game_mode, arg_ai_diff, curr_match}) => {
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
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.RESIZE
            },
            scene: [RastrosScene]
        }
        new Phaser.Game(config);
    }, [process_game_over, arg_game_mode, arg_ai_diff, curr_match]);
    return (<></>);
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

        this.INITIAL_BOARD_POS = 37 + 20;
        this.DISTANCE_BETWEEN_SQUARES = 75 + 2;
        this.rastrosAI = new RastrosAI();

        // Players which can move the piece
        this.player = new Set();
        // Stores the player which can move in a given turn
        this.current_player = 1;
        // True if the player's last click was the moving piece, false otherwise
        this.clicked_piece_flag = false;
        // Squares which have been blocked
        this.blocked_squares = new Set();
        // Squares to where the moving piece can currently move
        this.valid_squares = new Set([10, 11, 12, 17, 19, 24, 25, 26]);
        // Positions referencing the last movement made
        this.last_played = new Set();
        // Stores whether the game has finished or not
        this.game_over = false;
        this.mycount = 0;

    }

    create() {
        this.squares_group = this.add.group();
    
        // Sound effect played after every move
        this.move_sound = this.sound.add('click', {volume: 0.2});

        if ( game_mode === 'offline' ) {
            this.player.add(1);
            this.player.add(2);
        }

        // Must be later changed to allow player to choose which side he is on
        if ( game_mode === 'ai' )
            this.player.add(1);

        if ( game_mode === "online" || game_mode === "amigo" ) {
            if ( AuthService.getCurrentUsername() === current_match['player1'] )
                this.player.add(1);
            else
                this.player.add(2);

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

        var img;
        var scene = this;
        // Loop used to fill the board with clickable squares
        for (var pos_y = 0; pos_y < 7; pos_y++) {
            for (var pos_x = 0; pos_x < 7; pos_x++) {
                var pos = pos_y*7+pos_x;
                if (pos === 6)
                    img = this.squares_group.create(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'p2').setInteractive().setName(String(pos));
                else if (pos === 42)
                    img = this.squares_group.create(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'p1').setInteractive().setName(String(pos));
                else
                    img = this.squares_group.create(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setInteractive().setName(String(pos));
                img.on('pointerup', function () {scene.click_square(this)});
            }
        }

        // Fill in the moving piece
        this.player_piece = this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*4, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*2, 'piece').setName('player_piece').setInteractive();
        this.player_piece.on('pointerup', this.click_piece, this);

        // Fill in accessory text
        this.add.text(601+10, 120, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
        this.current_player_text = this.add.text(601+75, 180, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});

    }

    update() {
        this.mycount += 1;
        if ( this.mycount >= 2 && !this.game_over && game_mode === "ai" && !this.player.has(this.current_player) )
            this.move( this.squares_group.getChildren()[ this.rastrosAI.randomPlay(ai_diff, this.valid_squares, this.player_piece) ] );
    }

    click_square(clicked_square) {
        if ( !this.clicked_piece_flag )
            return;

        this.clicked_piece_flag = false;
        this.valid_squares.forEach(square => this.squares_group.getChildren()[square].clearTint());

        if ( this.valid_squares.has( parseInt(clicked_square.name) ) ) {
            this.move(clicked_square);
            if ( game_mode === "online" || game_mode === "amigo" )
                socket.emit("move", clicked_square.name, AuthService.getCurrentUserId(), current_match['match_id']);
        }
        
    }

    click_piece() {
        if (!this.player.has(this.current_player))
                return;

        if (!this.clicked_piece_flag)
            this.valid_squares.forEach(square => this.squares_group.getChildren()[square].setTint(0x00FF00));
        else
            this.valid_squares.forEach(square => this.squares_group.getChildren()[square].clearTint());

        this.clicked_piece_flag = !this.clicked_piece_flag;
    }

    move(clicked_square) {
        this.mycount = 0;
        this.move_sound.play();

        // Update blocked squares
        var old_x = ( this.player_piece.x - this.INITIAL_BOARD_POS )/ this.DISTANCE_BETWEEN_SQUARES;
        var old_y = ( this.player_piece.y - this.INITIAL_BOARD_POS )/ this.DISTANCE_BETWEEN_SQUARES;
        this.blocked_squares.add( old_y*7+old_x );

        // Remove last movement highlight and add new one
        this.last_played.forEach( pos => this.squares_group.getChildren()[pos].clearTint() );
        this.last_played.clear();
        this.last_played.add( old_y*7 + old_x );
        this.last_played.add( parseInt( clicked_square.name ) );
        this.last_played.forEach( pos =>  this.squares_group.getChildren()[pos].setTint(0xFFFF00) );

        // Move player piece to new square
        this.add.image(this.player_piece.x, this.player_piece.y, 'blocked').setName('blocked');
        this.player_piece.setPosition(clicked_square.x, clicked_square.y);

        // Get new square's position [0..49]
        var current_pos = parseInt( clicked_square.name );
        this.valid_squares.clear();

        // Add all possible positions
        [current_pos-6, current_pos-7, current_pos-8, current_pos+6, current_pos+7, current_pos+8, current_pos-1, current_pos+1].forEach(this.valid_squares.add, this.valid_squares);

        // Remove invalid squares (edge cases)
        if ( [0,1,2,3,4,5,6].includes(current_pos) )
            [current_pos-6, current_pos-7, current_pos-8].forEach(this.valid_squares.delete, this.valid_squares);

        if ( [42,43,44,45,46,47,48].includes(current_pos) )
            [current_pos+6, current_pos+7, current_pos+8].forEach(this.valid_squares.delete, this.valid_squares);

        if ( [0,7,14,21,28,35,42].includes(current_pos) )
            [current_pos-8, current_pos-1, current_pos+6].forEach(this.valid_squares.delete, this.valid_squares);

        if ( [6,13,20,27,34,41,48].includes(current_pos) )
            [current_pos-6, current_pos+1, current_pos+8].forEach(this.valid_squares.delete, this.valid_squares);

        // Remove blocked squares
        this.blocked_squares.forEach(this.valid_squares.delete, this.valid_squares);

        // Check for win conditions
        if ( game_mode === "offline" || game_mode === "ai" ) {
            let winner = "";

            if ( current_pos === 6 )
                winner = "player2"
            if ( current_pos === 42 )
                winner = "player1"
            if ( set_diff(this.valid_squares, this.blocked_squares).size === 0 )
                winner = "player" + String(this.current_player);

            if ( winner !== "" ) {
                this.finish_game( {match_id: current_match['match_id'], match_result: winner, end_mode: "valid_move"} );
                return;
            }
        }

        this.current_player = this.current_player===1 ? 2 : 1
        this.current_player_text.setText("Jogador " + this.current_player);

    }

    finish_game(end_message) {
        if ( String(end_message['match_id']) !== String(current_match['match_id']) )
            return;

        this.game_over = true;
        this.valid_squares.clear();
        this.player.clear();
        this.squares_group.getChildren().forEach(x => x.disableInteractive());

        processGameOver(end_message);
    }
}


async function atualizarUserInfo() {
    if (!AuthService.isAuthenticated())
        return;
    var response = await UserService.getUserById(auth_user.id)
    localStorage.setItem("user", JSON.stringify(response));
}

function set_diff(a, b) {
    return new Set( [...a].filter(x => !b.has(x)) )
}
