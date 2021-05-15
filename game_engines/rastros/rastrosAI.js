    /*
    easy -> 20% good plays
    medium -> 50% good plays
    hard -> 80% good plays
    */

class rastrosAI {
    constructor(player, probabilityOfGoodMove) {
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

        this.probabilityOfGoodMove = probabilityOfGoodMove;

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

    //print the field in the console
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
    fieldUpdate(piece) {
        // Squares which have been blocked
        this.blocked_squares[piece[0]][piece[1]] = true;

        this.board[this.piece[0]][this.piece[1]] = "B";

        // piece coordinates
        this.piece = piece;
        this.board[piece[0]][piece[1]] = "P";

        this.validSquares = [];
        for (var y = piece[0]-1; y<=piece[0]+1; y++) {
            for (var x = piece[1]-1; x<=piece[1]+1; x++) {
                if (y>=0 && y<=6 && x>=0 && x<=6 && !this.blocked_squares[y][x]) {
                    this.validSquares.push([y,x]);
                }
            }
        }
    }

    //check if game ended
    ended(piece, validSquares) {
        if (piece[0] == this.goal[0] && piece[1] == this.goal[1]) {
            return 99;
        } else if ((piece[0] == this.otherGoal[0] && piece[1] == this.otherGoal[1]) || validSquares.length == 0) {
            return -99;
        } else {
            return 98 - Math.pow(piece[0]-this.goal[0], 2) - Math.pow(piece[1] - this.goal[1], 2);
        }
    }

    //make a play using the AI
    makePlay() {
        var startTime=new Date();
        var chosen = null;

        if (Math.random()>this.probabilityOfGoodMove) {
            if ((Math.pow(this.goal[0]-this.piece[0], 2) + Math.pow(this.goal[1]-this.piece[1],2)<=8) ||
                (Math.pow(this.otherGoal[0]-this.piece[0], 2) + Math.pow(this.otherGoal[1]-this.piece[1],2)<=8)) {
                    chosen = this.validSquares.reduce((accumulator, current) => {
                        if (Math.pow(accumulator[0]-this.goal[0], 2) + Math.pow(accumulator[1] - this.goal[1], 2) < Math.pow(current[0]-this.goal[0], 2) + Math.pow(current[1] - this.goal[1], 2)) {
                            return accumulator;
                        } else {
                            return current;
                        }
                    });
            } else {
                chosen = this.validSquares[Math.floor(Math.random() * this.validSquares.length)];
            }
        } else {
            var score = -100;

            this.validSquares.forEach( (element) => {
                this.blocked_squares[element[0]][element[1]] = true;
                var validSquares = [];
                for (var y = element[0]-1; y<=element[0]+1; y++) {
                    for (var x = element[1]-1; x<=element[1]+1; x++) {
                        if (y>=0 && y<=6 && x>=0 && x<=6 && !this.blocked_squares[y][x]) {
                            validSquares.push([y,x]);
                        }
                    }
                }

                var newScore = this.minimax(validSquares, element, 13, -100, 100, false);
                if (newScore >= score) {
                    chosen = element;
                    score = newScore;
                }
                this.blocked_squares[element[0]][element[1]] = false;
            });
        }

        console.log(Math.round(new Date()-startTime));

        this.fieldUpdate(chosen);
        return chosen;
    }

    //minimax algorithmn
    minimax(validSquares, piece, depth, alpha, beta, maximizingPlayer) {
        var x = this.ended(piece, validSquares);
        if (depth == 0 || x==99 || x==-99) {
            return x;
        }
        if (maximizingPlayer) {
            var value = -100;
            for (const element of validSquares) {
                this.blocked_squares[element[0]][element[1]] = true;
                var validSquares2 = [];
                for (var y = element[0]-1; y<=element[0]+1; y++) {
                    for (var x = element[1]-1; x<=element[1]+1; x++) {
                        if (y>=0 && y<=6 && x>=0 && x<=6 && !this.blocked_squares[y][x]) {
                            validSquares2.push([y,x]);
                        }
                    }
                }
                var newValue = this.minimax(validSquares2, element, depth-1, alpha, beta, false);
                this.blocked_squares[element[0]][element[1]] = false;
                if (newValue > value) {
                    value = newValue;
                }
                if (value>alpha) alpha=value;
                if (alpha>=beta) return value;
            }
        } else {
            var value = 100;
            for (const element of validSquares) {
                this.blocked_squares[element[0]][element[1]] = true;
                var validSquares2 = [];
                for (var y = element[0]-1; y<=element[0]+1; y++) {
                    for (var x = element[1]-1; x<=element[1]+1; x++) {
                        if (y>=0 && y<=6 && x>=0 && x<=6 && !this.blocked_squares[y][x]) {
                            validSquares2.push([y,x]);
                        }
                    }
                }
                var newValue = this.minimax(validSquares2, element, depth-1, alpha, beta, true);
                this.blocked_squares[element[0]][element[1]] = false;
                if (newValue < value) {
                    value = newValue;
                }
                if (value<beta) beta=value;
                if (beta<=alpha) return value;
            }
        }
        return value;
    }
}

//click the button in the html test file
function buttonClick() {
    var play = document.getElementById("onlyInput").value;

    play = play.split(",");
    play = [Number(play[0]), Number(play[1])]

    console.log("You played:")
    AI.fieldUpdate(play)
    AI.printField();

    if (AI.ended(AI.piece, AI.validSquares)==99 || AI.ended(AI.piece, AI.validSquares)==-99) {
        console.log("gg1")
    } else {
        console.log("AI played:")
        AI.makePlay();
        AI.printField();

        if (AI.ended(AI.piece, AI.validSquares)==99 || AI.ended(AI.piece, AI.validSquares)==-99) {
            console.log("gg2")
        }
    }
}

var playerNumber = 1;
var AI = new rastrosAI(playerNumber, 0.5);
AI.printField();

if (playerNumber==1) {
    console.log("AI played:")
    AI.makePlay();
    AI.printField();
}