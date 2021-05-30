export default class RastrosAI {
	constructor(){
		this.AI_blocked_squares = [
			[false,false,false,false,false,false,false],
			[false,false,false,false,false,false,false],
			[false,false,false,false,true,false,false],
			[false,false,false,false,false,false,false],
			[false,false,false,false,false,false,false],
			[false,false,false,false,false,false,false],
			[false,false,false,false,false,false,false]
		];
	}

	//make a play using the AI
	randomPlay(ai_diff, valid_squares, piece) {
		var piece_x = piece[0];
		var piece_y = piece[1];

		if (Math.random()>ai_diff) {         
			if ((Math.pow(0-piece_y, 2) + Math.pow(6-piece_x,2)<=8) ||
				(Math.pow(6-piece_y, 2) + Math.pow(0-piece_x,2)<=8)) {
					chosen = valid_squares.reduce((accumulator, current) => {
						if (Math.pow(accumulator[0]-0, 2) + Math.pow(accumulator[1] - 6, 2) < Math.pow(current[0]-0, 2) + Math.pow(current[1] - 6, 2)) {
							return accumulator;
						} else {
							return current;
						}
					});
			} else {
				chosen = valid_squares[Math.floor(Math.random() * valid_squares.length)];
			}
		} else {
			var score = -100;

			valid_squares.forEach( (element) => {
				this.AI_blocked_squares[element[0]][element[1]] = true;
				var validSquares = [];
				for (var y = element[0]-1; y<=element[0]+1; y++) {
					for (var x = element[1]-1; x<=element[1]+1; x++) {
						if (y>=0 && y<=6 && x>=0 && x<=6 && !this.AI_blocked_squares[y][x]) {
							validSquares.push([y,x]);
						}
					}
				}

				var newScore = this.minimax(validSquares, element, 11, -100, 100, false);
				if (newScore >= score) {
					chosen = element;
					score = newScore;
				}
				this.AI_blocked_squares[element[0]][element[1]] = false;
			});
		}

		this.AI_blocked_squares[chosen[0]][chosen[1]] = true;

		return [chosen[1], chosen[0]];
	}


	//minimax algorithmn
	minimax(validSquares, piece, depth, alpha, beta, maximizingPlayer) {
		var x = this.ended(piece, validSquares);

		if (depth === 0 || x===99 || x===-99) {
			return x;
		}

		var value;
		var newValue;
		var y;
		var validSquares2;

		if (maximizingPlayer) {
            value = -100;
            for (const element of validSquares) {
                this.AI_blocked_squares[element[0]][element[1]] = true;
                validSquares2 = [];
                for (y = element[0]-1; y<=element[0]+1; y++) {
                    for (x = element[1]-1; x<=element[1]+1; x++) {
                        if (y>=0 && y<=6 && x>=0 && x<=6 && !this.AI_blocked_squares[y][x]) {
                            validSquares2.push([y,x]);
                        }
                    }
                }
                newValue = this.minimax(validSquares2, element, depth-1, alpha, beta, false);
                this.AI_blocked_squares[element[0]][element[1]] = false;
                if (newValue > value) {
                    value = newValue;
                }
                if (value>alpha) alpha=value;
                if (alpha>=beta) return value;
            }
        } else {
            value = 100;
            for (const element of validSquares) {
                this.AI_blocked_squares[element[0]][element[1]] = true;
                validSquares2 = [];
                for (y = element[0]-1; y<=element[0]+1; y++) {
                    for (x = element[1]-1; x<=element[1]+1; x++) {
                        if (y>=0 && y<=6 && x>=0 && x<=6 && !this.AI_blocked_squares[y][x]) {
                            validSquares2.push([y,x]);
                        }
                    }
                }
                newValue = this.minimax(validSquares2, element, depth-1, alpha, beta, true);
                this.AI_blocked_squares[element[0]][element[1]] = false;
                if (newValue < value) {
                    value = newValue;
                }
                if (value<beta) beta=value;
                if (beta<=alpha) return value;
            }
        }
		return value;
	}

	//heuristic
	ended(piece, validSquares) {
		if (piece[0] === 0 && piece[1] === 6) {
			return 99;
		} else if ((piece[0] === 6 && piece[1] === 0) || validSquares.length === 0) {
			return -99;
		} else {
			return 98 - Math.pow(piece[0]-0, 2) - Math.pow(piece[1] - 6, 2);
		}
	}
}