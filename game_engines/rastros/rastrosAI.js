class rastrosState {
    constructor(blocked_squares, piece, depth) {
        this.blocked_squares = blocked_squares;
        this.piece = piece;
        this.validSquares = [];
        for (var y = piece[0]-1; y<=piece[0]+1; y++) {
            for (var x = piece[1]-1; x<=piece[1]+1; x++) {
                if (!this.blocked_squares.find(element => element[0] == y && element[1] == x)) {
                    if (!(y==piece[0] && x==piece[1]) && y>=0 && y<=6 && x>=0 && x<=6) {
                        this.validSquares.push([y,x]);
                    }
                }
            }
        }
        this.depth = depth;
    }
}

class rastrosAI {
    constructor(player) {
        //get goal
        if (player == 1) {
            this.goal = [6,0];
        } else if (player == 2) {
            this.goal = [0,6];
        } else {
            throw Error("Invalid player number");
        }

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

        this.blocked_squares = [];

        this.fieldUpdate([2,4]);
    }

    printField() {
        var s = "  0 1 2 3 4 5 6\n";
        for (var pos_y = 0; pos_y < 7; pos_y++) {
            s+= pos_y + " ";
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
        this.blocked_squares.push(new_pos);

        this.board[this.piece[0]][this.piece[1]] = "B";

        // piece coordinates
        this.piece = [new_pos[0], new_pos[1]];
        this.board[new_pos[0]][new_pos[1]] = "P";

        // Squares to where the moving piece can currently move
        this.validSquares = [];
        for (var y = new_pos[0]-1; y<=new_pos[0]+1; y++) {
            for (var x = new_pos[1]-1; x<=new_pos[1]+1; x++) {
                if (!this.blocked_squares.find(element => element[0] == y && element[1] == x)) {
                    if (!(y==new_pos[0] && x==new_pos[1]) && y>=0 && y<=6 && x>=0 && x<=6) {
                        this.validSquares.push([y,x]);
                    }
                }
            }
        }

        this.state = new rastrosState(this.blocked_squares, this.piece, 0);
    }

    //check if game ended
    ended(state) {
        if ((state.piece.toString() == "6,0" && this.goal.toString() == "6,0") || (state.piece.toString() == "0,6" && this.goal.toString() == "0,6")) {
            return 1;
        } else if ((state.piece.toString() == "0,6" && this.goal.toString() == "6,0") || (state.piece.toString() == "6,0" && this.goal.toString() == "0,6") || state.validSquares.length == 0) {
            return -1;
        } else {
            return 0;
        }
    }

    randomPlay2() {
        var chosen = null;
        var score = -1;

        //console.log(this.validSquares);

        this.validSquares.forEach( (element) => {
            var state = new rastrosState(this.blocked_squares.concat([element]), element, 0);
            var newScore = this.search(state, 3);
            if (newScore >= score) {
                chosen = element;
                score = newScore;
            }
        });

        //console.log(chosen);

        this.fieldUpdate(chosen);
        return chosen;
    }

    /*
    //not that random of a play
    randomPlay() {
        var chosen = this.validSquares.reduce((accumulator, current) => {
            if (accumulator === undefined) {
                return current;
            }
            if (Math.pow(accumulator[0]-this.goal[0], 2) + Math.pow(accumulator[1] - this.goal[1], 2) < Math.pow(current[0]-this.goal[0], 2) + Math.pow(current[1] - this.goal[1], 2)) {
                return accumulator;
            } else {
                return current;
            }
        });
        this.fieldUpdate(chosen);
        return chosen;
    }*/

    /*
    fácil -> move-se sempre em direção ao goal
    médio -> o mesmo mas se estiver perto de cada um dos goals pensa em fazer jogadas que garantam a vitória/evitem a derrota
    difícil -> começa a pensar mais cedo e também tem cuidado em ficar encurralado
    */
    
    //oldState -> rastros state object, limit -> depth search depth limit
    search(oldState, limit) {
        //number of validSquares
        var size = oldState.validSquares.length;
        var sum = 0;

        //calcular uma probabilidade de vitória para uma jogada
        oldState.validSquares.forEach(element => {
            var newState = new rastrosState(oldState.blocked_squares.concat([element]), element, oldState.depth+1);
            if (newState.depth == limit || this.ended(newState)!=0) {
                sum += this.ended(newState);
            } else {
                sum += this.search(newState, limit);
            }
        });
        return sum/size;
    }
    
    //if close to a goal try to get a winning play
    tryToWin() {
        if (Math.pow(this.piece[0]-this.goal[0],2) <=4 && Math.pow(this.piece[1]-this.goal[1],2) <=4) {
            
        }
    }

    //if close to a enemy goal try to make a saving play
    tryNotToLose() {

    }

    //if cornered try to make the enemy lose first
    cornered() {

    }

}

function buttonClick() {
    var play = document.getElementById("onlyInput").value;

    play = play.split(",");
    play = [Number(play[0]), Number(play[1])]

    console.log("You played:")
    AI.fieldUpdate(play)
    AI.printField();

    if (AI.ended(AI.state)) {
        console.log("gg")
    } else {
        console.log("AI played:")
        AI.randomPlay2();
        AI.printField();

        if (AI.ended(AI.state)) {
            console.log("gg")
        }
    }
    
}

var playerNumber = 1;
var AI = new rastrosAI(playerNumber);
AI.printField();

if (playerNumber==1) {
    console.log("AI played:")
    AI.randomPlay2();
    AI.printField();
}