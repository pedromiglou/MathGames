    /*
    easy -> 20% good plays
    medium -> 50% good plays
    hard -> 80% good plays
    */

class caes_gatosAI {
    constructor(player, probabilityOfGoodMove) {
        this.player = player; //Cats or Dogs

        this.probabilityOfGoodMove = probabilityOfGoodMove;

        // Array that stores the board
        this.board = []

        // Loop used to fill the board
        for (var pos_y = 0; pos_y < 8; pos_y++) {
            this.board.push([]);
            for (var pos_x = 0; pos_x < 8; pos_x++) {
                this.board[pos_y].push("_");
            }
        }
        this.depth = 2;
        
        this.aiPieces = [[false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false]];
        
        this.playerPieces = [[false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false]];
        
        this.turnCount = 0;
    }

    //print the field in the console
    printField() {
        var s = "  0 1 2 3 4 5 6 7\n";
        for (var pos_y = 0; pos_y < 8; pos_y++) {
            s+= pos_y + " ";
            for (var pos_x = 0; pos_x < 8; pos_x++) {
                s += this.board[pos_y][pos_x] + " ";
            }
            s += "\n";
        }

        console.log(s);
    }
    
    //update board
    fieldUpdateP(piece, type) {
        this.validSquares = [];
        this.board[piece[0]][piece[1]] = type;
        this.playerPieces[piece[0]][piece[1]] = true;
        for (var y=0; y<8; y++) {
            for (var x=0;x<8;x++ ) {
                if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y==0 || !this.playerPieces[y-1][x]) &&
                (y==7 || !this.playerPieces[y+1][x]) && (x==0 || !this.playerPieces[y][x-1]) && (x==7 || !this.playerPieces[y][x+1])) {
                    this.validSquares.push([y,x]);
                }
            }
        }
        this.turnCount++;
        console.log(this.validSquares);
        if (this.turnCount>=20) this.depth = 4;
    }

    fieldUpdateAI(piece, type) {
        //var oldHeuristic = this.heuristic(this.aiPieces, this.playerPieces);
        this.validSquares = [];
        this.board[piece[0]][piece[1]] = type;
        this.aiPieces[piece[0]][piece[1]] = true;
        for (var y=0; y<8; y++) {
            for (var x=0;x<8;x++ ) {
                if (!this.playerPieces[y][x] && !this.aiPieces[y][x] && (y==0 || !this.aiPieces[y-1][x]) &&
                (y==7 || !this.aiPieces[y+1][x]) && (x==0 || !this.aiPieces[y][x-1]) && (x==7 || !this.aiPieces[y][x+1])) {
                    this.validSquares.push([y,x]);
                }
            }
        }
        console.log(this.validSquares);
        this.turnCount++;
    }

    //check if game ended
    ended(validSquares) {
        return validSquares.length === 0;
    }

    heuristic(aiPieces, playerPieces) {
        var countAI = 0;
        var countPlayer = 0;
        for (var y=0; y<8; y++) {
            for (var x=0;x<8;x++ ) {
                if (!playerPieces[y][x] && !aiPieces[y][x] && (y==0 || !aiPieces[y-1][x]) &&
                (y==7 || !aiPieces[y+1][x]) && (x==0 || !aiPieces[y][x-1]) && (x==7 || !aiPieces[y][x+1])) {
                    countPlayer++;
                }
                if (!aiPieces[y][x] && !playerPieces[y][x] && (y==0 || !playerPieces[y-1][x]) &&
                (y==7 || !playerPieces[y+1][x]) && (x==0 || !playerPieces[y][x-1]) && (x==7 || !playerPieces[y][x+1])) {
                    countAI++;
                }
            }
        }
        return countAI-countPlayer;
    }

    //make a play using the AI
    makePlay() {
        var startTime=new Date();
        var chosen = null;

        if (Math.random()>this.probabilityOfGoodMove) {
            chosen = this.validSquares[Math.floor(Math.random() * this.validSquares.length)];
        } else {
            var score = -100;

            this.validSquares.forEach( (piece) => {
                var validSquares2 = [];
                this.aiPieces[piece[0]][piece[1]] = true;
                for (var y=0; y<8; y++) {
                    for (var x=0;x<8;x++) {
                        if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y==0 || !this.playerPieces[y-1][x]) &&
                        (y==7 || !this.playerPieces[y+1][x]) && (x==0 || !this.playerPieces[y][x-1]) && (x==7 || !this.playerPieces[y][x+1])) {
                            validSquares2.push([y,x]);
                        }
                    }
                }
                var newScore = this.minimax(validSquares2, Math.ceil(this.turnCount/7), false);
                if (newScore > score) {
                    chosen = piece;
                    score = newScore;
                }

                this.aiPieces[piece[0]][piece[1]] = false;
            });
        }

        console.log(Math.round(new Date()-startTime));

        this.fieldUpdateAI(chosen, this.player[0]);
        return chosen;
    }

    //minimax algorithmn
    minimax(validSquares, depth, maximizingPlayer) {
        if (depth == 0 || validSquares.length==0) {
            return this.heuristic(this.aiPieces, this.playerPieces);
        }
        if (maximizingPlayer) {
            var value = -100;
            validSquares.forEach((piece) => {
                var validSquares2 = [];
                this.aiPieces[piece[0]][piece[1]] = true;
                for (var y=0; y<8; y++) {
                    for (var x=0;x<8;x++) {
                        if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y==0 || !this.playerPieces[y-1][x]) &&
                        (y==7 || !this.playerPieces[y+1][x]) && (x==0 || !this.playerPieces[y][x-1]) && (x==7 || !this.playerPieces[y][x+1])) {
                            validSquares2.push([y,x]);
                        }
                    }
                }

                var newValue = this.minimax(validSquares2, depth-1, false);
                if (newValue > value) {
                    value = newValue;
                }
                
                this.aiPieces[piece[0]][piece[1]] = false;
            })
        } else {
            var value = 100;
            validSquares.forEach((piece) => {
                var validSquares2 = [];
                this.playerPieces[piece[0]][piece[1]] = true;
                for (var y=0; y<8; y++) {
                    for (var x=0;x<8;x++) {
                        if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y==0 || !this.aiPieces[y-1][x]) &&
                        (y==7 || !this.aiPieces[y+1][x]) && (x==0 || !this.aiPieces[y][x-1]) && (x==7 || !this.aiPieces[y][x+1])) {
                            validSquares2.push([y,x]);
                        }
                    }
                }

                var newValue = this.minimax(validSquares2, depth-1, true);
                if (newValue < value) {
                    value = newValue;
                }
                
                this.playerPieces[piece[0]][piece[1]] = false;
            })
        }
        return value;
    }
}

//click the button in the html test file
function buttonClick() {
    var play = document.getElementById("onlyInput").value;

    play = play.split(",");
    play = [Number(play[0]), Number(play[1])];

    console.log("You played:");
    AI.fieldUpdateP(play, "C");
    AI.printField();

    if (AI.ended(AI.validSquares)) {
        console.log("gg1");
    } else {
        console.log("AI played:");
        AI.makePlay();
        AI.printField();

        if (AI.ended(AI.validSquares)) {
            console.log("gg2")
        }
    }
}

var player = "Dogs";
var AI = new caes_gatosAI(player, 1);
AI.printField();

if (player=="Cats") {
    console.log("AI played:")
    AI.makePlay();
    AI.printField();
}