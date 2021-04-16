    /*
    easy -> 20% good plays
    medium -> 50% good plays
    hard -> 80% good plays
    */

class rastrosState {
    constructor(blocked_squares, piece) {
        this.blocked_squares=[];
        for (var i = 0; i < blocked_squares.length; i++) this.blocked_squares[i] = blocked_squares[i].slice();
        this.blocked_squares[piece[0]][piece[1]] = true;
        this.piece = piece;
        this.validSquares = [];
        for (var y = piece[0]-1; y<=piece[0]+1; y++) {
            for (var x = piece[1]-1; x<=piece[1]+1; x++) {
                if (y>=0 && y<=6 && x>=0 && x<=6 && !this.blocked_squares[y][x]) {
                    this.validSquares.push([y,x]);
                }
            }
        }
    }
}

class rastrosAI {
    constructor(player) {
        //get goal
        if (player == 1) {
            this.goal = [6,0];
            this.otherGoal = [0,6];
        } else if (player == 2) {
            this.goal = [0,6];
            this.otherGoal = [6,0];
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

        this.blocked_squares = [[false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false]];

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
        this.blocked_squares[new_pos[0]][new_pos[1]] = true;

        this.board[this.piece[0]][this.piece[1]] = "B";

        // piece coordinates
        this.piece = [new_pos[0], new_pos[1]];
        this.board[new_pos[0]][new_pos[1]] = "P";

        this.state = new rastrosState(this.blocked_squares, this.piece);
    }

    //check if game ended
    ended(state) {
        if (state.piece[0] == this.goal[0] && state.piece[1] == this.goal[1]) {
            return 99;
        } else if ((state.piece[0] == this.otherGoal[0] && state.piece[1] == this.otherGoal[1]) || state.validSquares.length == 0) {
            return -99;
        } else {
            return 98 - Math.pow(state.piece[0]-this.goal[0], 2) - Math.pow(state.piece[1] - this.goal[1], 2);
        }
    }

    makePlay() {
        var startTime=new Date();
        var chosen = null;
        var score = -1;

        this.state.validSquares.forEach( (element) => {
            var state = new rastrosState(this.blocked_squares, element);
            var newScore = this.minimax(state, 9, false);
            if (newScore >= score) {
                chosen = element;
                score = newScore;
            }
        });
        console.log(Math.round(new Date()-startTime));

        this.fieldUpdate(chosen);
        return chosen;
    }

    minimax(node, depth, maximizingPlayer) {
        var x = this.ended(node);
        if (depth == 0 || x==99 || x==-99) {
            return x;
        }
        if (maximizingPlayer) {
            var value = -100;
            node.validSquares.forEach((element) => {
                var child = new rastrosState(node.blocked_squares, element);
                var newValue = this.minimax(child, depth-1, false);
                if (newValue > value) {
                    value = newValue;
                }
            })
        } else {
            var value = 100;
            node.validSquares.forEach((element) => {
                var child = new rastrosState(node.blocked_squares, element);
                var newValue = this.minimax(child, depth-1, true);
                if (newValue < value) {
                    value = newValue;
                }
            })
        }
        return value;
    }
}

function buttonClick() {
    var play = document.getElementById("onlyInput").value;

    play = play.split(",");
    play = [Number(play[0]), Number(play[1])]

    console.log("You played:")
    AI.fieldUpdate(play)
    AI.printField();

    if (AI.ended(AI.state)==1 || AI.ended(AI.state)==-1) {
        console.log("gg1")
    } else {
        console.log("AI played:")
        AI.makePlay();
        AI.printField();

        if (AI.ended(AI.state)==1 || AI.ended(AI.state)==-1) {
            console.log("gg2")
        }
    }
}

var playerNumber = 1;
var AI = new rastrosAI(playerNumber);
AI.printField();

if (playerNumber==1) {
    console.log("AI played:")
    AI.makePlay();
    AI.printField();
}