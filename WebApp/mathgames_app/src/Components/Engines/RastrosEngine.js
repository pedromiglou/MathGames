
import  React from "react";
import Phaser from "phaser";

var game_type = null

export default class RastrosEngine extends React.Component {
    constructor(props)  {
        super(props)
        game_type = props.game_type
    }

    componentDidMount() {

        let canvasobj = document.getElementById("game_canvas");
        canvasobj.style.border = "20px solid black";

        const config = {
            canvas: canvasobj,
            type: Phaser.WEBGL,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: 1100,
            height: 750,
            backgroundColor: '#4488aa',
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        }
        new Phaser.Game(config);
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
        // Player which is currently playing (1 or 2)
        this.current_player = 1;
        // True if it's a player's turn, False if it's the AI's turn
        this.player_turn = true;		
        // True if the player's last click was the moving piece, false otherwise
        var clicked_piece_flag = false
        // Squares which have been blocked
        var blocked_squares = new Set()
        // Squares to where the moving piece can currently move
        var valid_squares = new Set(["10", "11", "12", "17", "19", "24", "25", "26"])
        // Positions referencing the last movement made
        var last_played = new Set()
    
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
        
        console.log(this.positions)


        // Fill in the moving piece
        var player_piece = this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*4, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*2, 'piece').setName('player_piece').setInteractive();
    
        this.add.text(750+20, 60, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
        var current_player_text = this.add.text(750+95, 120, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});

        // Triggered when the player clicks
        this.input.on('pointerdown', function(pointer, currentlyOver) {
            var clicked_piece = currentlyOver[0];
            if ( clicked_piece !== undefined  && this.player_turn)
                if (clicked_piece.name === "player_piece") {
                    if (!clicked_piece_flag) {
                        clicked_piece_flag = true;
                        valid_squares.forEach(square => this.positions[square].setTint(0x00FF00));
                    } else {
                        clicked_piece_flag = false;
                        valid_squares.forEach(square => this.positions[square].clearTint());
                    }
                } else if ( clicked_piece_flag ) {
                    clicked_piece_flag = false;
                    valid_squares.forEach(square => this.positions[square].clearTint());

                    if ( !valid_squares.has(clicked_piece.name) )
                        return;

                    var is_finished = move(this, blocked_squares, clicked_piece, current_player_text, last_played, valid_squares, player_piece);

                    if ( game_type === "AI" && !is_finished ) {
                        this.player_turn = false;
                        
                        // Process AI move
                        var ai_move = randomPlay(valid_squares);
                        clicked_piece = this.positions[ai_move];
                        var wait_time =  Math.floor(Math.random() * (2000 - 500) ) + 500;
                        setTimeout(() => {move(this, blocked_squares, clicked_piece, current_player_text, last_played, valid_squares, player_piece); this.player_turn = true;}, wait_time);
                    }
                }
        }, this);
    }
    
    update() {}

    render() {
        return (
            <canvas id="game_canvas" className="game"/>
        );
    }
}

function move_image(scene, image, new_x, new_y) {
    scene.add.image(image.x, image.y, 'blocked').setName('blocked');
    image.setPosition(new_x, new_y);
}

function move(scene, blocked_squares, clicked_piece, current_player_text, last_played, valid_squares, player_piece) {
    if ( valid_squares.has(clicked_piece.name) ) {
        scene.move_sound.play();

        // Update blocked squares
        var old_x = ( player_piece.x - scene.INITIAL_BOARD_POS )/ scene.DISTANCE_BETWEEN_SQUARES;
        var old_y = ( player_piece.y - scene.INITIAL_BOARD_POS )/ scene.DISTANCE_BETWEEN_SQUARES;
        blocked_squares.add(String(old_y*7+old_x));

        // Remove last movement highlight and add new one
        last_played.forEach( pos => scene.positions[pos].clearTint() );
        last_played.clear();
        last_played.add( old_y*7 + old_x );
        last_played.add( parseInt(clicked_piece.name) );
        last_played.forEach( pos =>  scene.positions[pos].setTint(0xFFFF00) );

        // Move player piece to new square
        move_image(scene, player_piece, clicked_piece.x, clicked_piece.y);
        
        // Get new square's position [0..49]
        var current_pos = parseInt(clicked_piece.name)
        valid_squares.clear()

        // Add all possible positions
        valid_squares.add(String(current_pos-6));
        valid_squares.add(String(current_pos-7));
        valid_squares.add(String(current_pos-8));

        valid_squares.add(String(current_pos+6));
        valid_squares.add(String(current_pos+7));
        valid_squares.add(String(current_pos+8));

        valid_squares.add(String(current_pos-1));
        valid_squares.add(String(current_pos+1));
        
        // Remove invalid squares (edge cases)
        if ( [0,1,2,3,4,5,6].includes(current_pos) ) {
            valid_squares.delete(String(current_pos-6));
            valid_squares.delete(String(current_pos-7));
            valid_squares.delete(String(current_pos-8));
        }

        if ( [42,43,44,45,46,47,48].includes(current_pos) ) {
            valid_squares.delete(String(current_pos+6));
            valid_squares.delete(String(current_pos+7));
            valid_squares.delete(String(current_pos+8));
        }

        if ( [0,7,14,21,28,35,42].includes(current_pos) ) {
            valid_squares.delete(String(current_pos-8));
            valid_squares.delete(String(current_pos-1));
            valid_squares.delete(String(current_pos+6));
        }

        if ( [6,13,20,27,34,41,48].includes(current_pos) ) {
            valid_squares.delete(String(current_pos-6));
            valid_squares.delete(String(current_pos+1));
            valid_squares.delete(String(current_pos+8));
        }

        // Remove blocked squares
        blocked_squares.forEach(square => valid_squares.delete(square));

        // Check for win conditions
        if (current_pos === 6 || current_pos === 42 || set_diff(valid_squares, blocked_squares).size === 0) {
            finish_game(scene, current_pos);
            valid_squares.clear();
            return true;
        }   else {
            if (scene.current_player===1)
                scene.current_player=2;
            else
                scene.current_player=1;
            
            current_player_text.setText("Jogador " + scene.current_player);
        }
    }
    return false;
}


function set_diff(a, b) {
    return new Set( [...a].filter(x => !b.has(x)) )
}

function finish_game(scene, current_pos) {
    if (current_pos === 42)
        var winner = 1
    else if (current_pos === 6)
        winner = 2
    else
        winner = scene.current_player

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
    scene.positions.forEach(x => x.disableInteractive());
}

function randomPlay(validSquares) {
    var tmpSquares = Array.from(validSquares).map(x => [(parseInt(x)-(parseInt(x)%7))/7, parseInt(x)%7]);
    var chosen = tmpSquares.reduce((accumulator, current) => {
        if (Math.pow(accumulator[0]-0, 2) + Math.pow(accumulator[1] - 6, 2) < Math.pow(current[0]-0, 2) + Math.pow(current[1] - 6, 2)) {
            return accumulator;
        } else {
            return current;
        }
    });
    return chosen[0]*7+chosen[1];
}

