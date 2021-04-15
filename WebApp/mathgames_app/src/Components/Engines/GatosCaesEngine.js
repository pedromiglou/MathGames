
import  React from "react";
import Phaser from "phaser";

//var game_type = null

export default class GatosCaesEngine extends React.Component {


    // constructor(props)  {
    //     super(props)
    //     //game_type = props.game_type
    // }

    componentDidMount() {

        let canvasobj = document.getElementById("game_canvas");

        const config = {
            canvas: canvasobj,
            type: Phaser.WEBGL,
            width: 1100,
			height: 855,
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
        var positions = []
        // Player which is currently playing (0 or 1)
        this.current_player = 0;				

        this.player_0_valid_squares = new Set()
        this.player_1_valid_squares = new Set()
        var player_0_first_move = true
        var player_1_first_move = true

        var adjacents = new Set()

        // Loop used to fill the board with clickable squares
        for (var pos_y = 0; pos_y < 8; pos_y++) {
            for (var pos_x = 0; pos_x < 8; pos_x++) {
                var pos = pos_y*8+pos_x;
                this.player_0_valid_squares.add(String(pos))
                this.player_1_valid_squares.add(String(pos))
                if ([27, 28, 35, 36].includes(pos)) {
                    positions.push(this.add.image(INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*pos_x, INITIAL_BOARD_POS+DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setName(String(pos)).setInteractive());
                    positions.push(this.add.image(INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*pos_x, INITIAL_BOARD_POS+DISTANCE_BETWEEN_SQUARES*pos_y, 'center').setName(String(pos)).setInteractive());
                } else {
                    positions.push(this.add.image(INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*pos_x, INITIAL_BOARD_POS+DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setName(String(pos)).setInteractive());
                }
            }
        }

        this.add.text(750+20, 60, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
        var current_player_text = this.add.text(750+95, 120, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});
        
        // Triggered when the player clicks
        this.input.on('pointerdown', function(pointer, currentlyOver) {
            var clicked_piece = currentlyOver[0];
            if (clicked_piece === undefined) {
                return
            }
            if (player_0_first_move && this.current_player === 0) {
                if (["27", "28", "35", "36"].includes(clicked_piece.name)) {
                    player_0_first_move = false;
                    move(this, adjacents, clicked_piece, current_player_text)
                }
            } else if (player_1_first_move && this.current_player === 1) {
                if (!["27", "28", "35", "36"].includes(clicked_piece.name)) {
                    player_1_first_move = false;
                    move(this, adjacents, clicked_piece, current_player_text)
                }
            } else if (!(player_1_first_move && player_0_first_move)) {
                move(this, adjacents, clicked_piece, current_player_text)
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
        scene.move_sound.play();
        
        // Get new square's position [0..49]
        var current_pos = parseInt(clicked_piece.name)

        adjacents.clear()
        scene.player_0_valid_squares.delete(String(current_pos))
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
        if (scene.current_player === 0) {
            scene.player_1_valid_squares = set_diff(scene.player_1_valid_squares, adjacents)
            if (scene.player_1_valid_squares.size === 0) {
                finish_game(scene)
            }
        } else {
            scene.player_0_valid_squares = set_diff(scene.player_0_valid_squares, adjacents)
            if (scene.player_0_valid_squares.size === 0) {
                finish_game(scene)
            }
        }
        
        scene.current_player = 1 - scene.current_player
        current_player_text.setText("Jogador " + scene.current_player);

    }
    

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


/*

function AI_move(scene, valid_squares, player_piece, blocked_squares, clicked_piece, last_played, positions, current_player_text) {
    var INITIAL_BOARD_POS = 60
	var DISTANCE_BETWEEN_SQUARES = 105
    var AI_square = randomPlay(valid_squares)
    var poslist = [(AI_square-(AI_square%7))/7, AI_square%7]
    var pos_x = INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*poslist[1]
    var pos_y = INITIAL_BOARD_POS + DISTANCE_BETWEEN_SQUARES*poslist[0]

    // Update blocked squares
    var old_x = (player_piece.x-INITIAL_BOARD_POS)/ DISTANCE_BETWEEN_SQUARES;
    var old_y = (player_piece.y-INITIAL_BOARD_POS)/ DISTANCE_BETWEEN_SQUARES;
    blocked_squares.add(String(old_y*7+old_x));

    // Remove last movement highlight and add new one
    last_played.forEach(pos =>  positions[pos].clearTint());
    last_played.clear();
    last_played.add(old_y*7+old_x);
    last_played.add(parseInt(clicked_piece.name));
    last_played.forEach(pos =>  positions[pos].setTint(0xFFFF00));

    // Move player piece to new square
    move_image(scene, player_piece, pos_x, pos_y);

    
    // Get new square's position [0..49]
    var current_pos = parseInt(AI_square)
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
    } else {
        if (scene.current_player===1)
            scene.current_player=2;
        else
            scene.current_player=1;
        
        current_player_text.setText("Jogador " + scene.current_player);
    }
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
   // this.fieldUpdate(chosen);
    return chosen[0]*7+chosen[1];
}

*/