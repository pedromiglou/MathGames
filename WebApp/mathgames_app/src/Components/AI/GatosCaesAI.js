export default class GatosCaesAI {
    constructor() {
        this.turnCount = 0;
        //AI Variables
        this.aiPieces = [
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false]
        ];

        this.playerPieces = [
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false]
        ];
    }

    //make a play using the AI
    /*
    transform validSquares to [[1,2],[2,3],...]
    keep 2 matrixes this.aiPieces and this.playerPieces with only true/false -> initially everything is false
    keep count of every turn
    at the end transform chosen as needed
    */
    randomPlay(ai_diff, valid_squares) {
        this.turnCount += 2;
        var chosen = null;
        var tmpSquares = Array.from(valid_squares).map(x => [(parseInt(x)-(parseInt(x)%8))/8, parseInt(x)%8]);

        if (Math.random()>ai_diff) {
            chosen = tmpSquares[Math.floor(Math.random() * tmpSquares.length)];
        } else {
            var score = -100;

            tmpSquares.forEach( (piece) => {
                var validSquares2 = [];
                this.aiPieces[piece[0]][piece[1]] = true;
                for (var y=0; y<8; y++) {
                    for (var x=0;x<8;x++) {
                        if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y===0 || !this.playerPieces[y-1][x]) &&
                        (y===7 || !this.playerPieces[y+1][x]) && (x===0 || !this.playerPieces[y][x-1]) && (x===7 || !this.playerPieces[y][x+1])) {
                            validSquares2.push([y,x]);
                        }
                    }
                }
                var newScore = this.minimax(validSquares2, Math.ceil(this.turnCount/7), false, this.aiPieces, this.playerPieces);
                if (newScore > score) {
                    chosen = piece;
                    score = newScore;
                }

                this.aiPieces[piece[0]][piece[1]] = false;
            });
        }

        return chosen[0]*8+chosen[1];
    }

    //this.minimax algorithmn
    minimax(validSquares, depth, maximizingPlayer) {
        var value;

        if (depth === 0 || validSquares.length===0) {
            return this.heuristic(this.aiPieces, this.playerPieces);
        }

        if (maximizingPlayer) {
            value = -100;
            validSquares.forEach((piece) => {
                var validSquares2 = [];
                this.aiPieces[piece[0]][piece[1]] = true;
                for (var y=0; y<8; y++) {
                    for (var x=0;x<8;x++) {
                        if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y===0 || !this.playerPieces[y-1][x]) &&
                        (y===7 || !this.playerPieces[y+1][x]) && (x===0 || !this.playerPieces[y][x-1]) && (x===7 || !this.playerPieces[y][x+1])) {
                            validSquares2.push([y,x]);
                        }
                    }
                }

                var newValue = this.minimax(validSquares2, depth-1, false, this.aiPieces, this.playerPieces);
                if (newValue > value) {
                    value = newValue;
                }
                
                this.aiPieces[piece[0]][piece[1]] = false;
            })
        } else {
            value = 100;
            validSquares.forEach((piece) => {
                var validSquares2 = [];
                this.playerPieces[piece[0]][piece[1]] = true;
                for (var y=0; y<8; y++) {
                    for (var x=0;x<8;x++) {
                        if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y===0 || !this.aiPieces[y-1][x]) &&
                        (y===7 || !this.aiPieces[y+1][x]) && (x===0 || !this.aiPieces[y][x-1]) && (x===7 || !this.aiPieces[y][x+1])) {
                            validSquares2.push([y,x]);
                        }
                    }
                }

                var newValue = this.minimax(validSquares2, depth-1, true, this.aiPieces, this.playerPieces);
                if (newValue < value) {
                    value = newValue;
                }
                
                this.playerPieces[piece[0]][piece[1]] = false;
            })
        }
        return value;
    }




    heuristic() {
        var countAI = 0;
        var countPlayer = 0;
        for (var y=0; y<8; y++) {
            for (var x=0;x<8;x++ ) {
                if (!this.playerPieces[y][x] && !this.aiPieces[y][x] && (y===0 || !this.aiPieces[y-1][x]) &&
                (y===7 || !this.aiPieces[y+1][x]) && (x===0 || !this.aiPieces[y][x-1]) && (x===7 || !this.aiPieces[y][x+1])) {
                    countPlayer++;
                }
                if (!this.aiPieces[y][x] && !this.playerPieces[y][x] && (y===0 || !this.playerPieces[y-1][x]) &&
                (y===7 || !this.playerPieces[y+1][x]) && (x===0 || !this.playerPieces[y][x-1]) && (x===7 || !this.playerPieces[y][x+1])) {
                    countAI++;
                }
            }
        }
        return countAI-countPlayer;
    }
}