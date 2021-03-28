class rastrosAI {
    constructor() {
        // Array that stores the board
        this.board = []

        // Loop used to fill the board
        for (var pos_y = 0; pos_y < 7; pos_y++) {
            this.board.push([]);
            for (var pos_x = 0; pos_x < 7; pos_x++) {
                this.board[pos_y].push("_");
            }
        }

        this.board[0][6] = "2";
        this.board[6][0] = "1";
        
        this.piece = [2, 4];

        this.blocked_squares = new Set();

        this.fieldUpdate([2,4]);
    }

    printField() {
        var s = "";
        for (var pos_y = 0; pos_y < 7; pos_y++) {
            for (var pos_x = 0; pos_x < 7; pos_x++) {
                s += this.board[pos_y][pos_x] + " ";
            }
            s += "\n";
        }

        console.log(s);
    }
    
    //update board, blocked_squares, piece coordinates and validSquares
    fieldUpdate(new_pos) {
        // Squares which have been blocked
        this.blocked_squares.add(new_pos.toString());

        this.board[this.piece[0]][this.piece[1]] = "B";

        // piece coordinates
        this.piece = [new_pos[0], new_pos[1]];
        this.board[new_pos[0]][new_pos[1]] = "P";

        // Squares to where the moving piece can currently move
        this.validSquares = [];
        for (var y = new_pos[0]-1; y<=new_pos[0]+1; y++) {
            for (var x = new_pos[1]-1; x<=new_pos[1]+1; x++) {
                if (! this.blocked_squares.has(([y,x]).toString())) {
                    if (!(y==new_pos[0] && x==new_pos[1]) && y>=0 && y<=6 && x>=0 && x<=6) {
                        this.validSquares.push([y,x]);
                    }
                }
            }
        }
    }

    //check if game ended
    ended() {
        if (this.piece.toString() == "6,0" || this.piece.toString() == "0,6") {
            return true;
        } else {
            return false;
        }
    }

    //not that random of a play
    randomPlay() {
        var chosen = this.validSquares.reduce((accumulator, current) => {
            if (accumulator === undefined) {
                return current;
            }
            if (Math.pow(accumulator[0]-6, 2) + Math.pow(accumulator[1] - 0, 2) < Math.pow(current[0]-6, 2) + Math.pow(current[1] - 0, 2)) {
                return accumulator;
            } else {
                return current;
            }
        });
        this.fieldUpdate(chosen);
    }

}

var AI = new rastrosAI();

while (true) {
    AI.printField();
    AI.randomPlay();
    if (AI.ended()) {
        break;
    }
}

AI.printField();