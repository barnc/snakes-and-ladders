import _ from 'lodash'

export default class Board {
    squares: Square[][] = [];
    width: number;
    height: number;
    gameElements: GameElement[] = [];
    startSquare?: Square;
    endSquare?: Square;

    // Create all of our squares
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        for (let x = 0; x < width; x++) {
            this.squares.push([])
            for (let y = 0; y < height; y++) {
                const square = new Square(x, y, y * this.width + x % this.width)
                this.squares[x][y] = square;
                if (x === width - 1 && y === height - 1) {
                    this.endSquare = square;
                }
                this.startSquare = this.squares[0][0]
            }
        }
    }

    getSquare(index: number) {
        const y = Math.floor(index / this.width);
        const x = index % this.width;
        console.log(y, x)
        return this.squares[x][y];
    }
    
    advancePlayer(player: Player, numSquares: number) {
        let newIndex = player.position.index + numSquares;
        // Bounce player back from the end square if moving past it
        if (newIndex > this.width * this.height - 1) {
            newIndex = (this.width * this.height - 1) - (newIndex - (this.width * this.height))
        }


        const destSquare = this.getSquare(newIndex)
        console.log(`Moving to square ${destSquare.index}`)
        player.move(destSquare);
    }
    
    addSnakes(numSnakes: number) {
        for (let x = 0; x <= numSnakes; x++) {
            // Snakes can only start on row 2.
            const start = _.sample(this.getFillableSquares().filter(square => square.y > 0))
            // If our board is full, return early
            if (!start) {
                return;
            }
            // Must always go down at least one row
            const end = _.sample(this.getFillableSquares().filter(square => square.y < start.y))
            if (!end) {
                return;
            }
            this.gameElements.push(new PlayerMover("Snake", start, end))
        }
    }
    
    addLadders(numLadders: number) {
        for (let x = 0; x <= numLadders; x++) {
            // Ladders can only start up to row x-1.
            const start = _.sample(this.getFillableSquares().filter(square => square.y < this.height - 1))
            // If our board is full, quit out
            if (!start) {
                return;
            }
            // Must always go up at least one row
            const end = _.sample(this.getFillableSquares().filter(square => square.y > start.y))
            if (!end) {
                return
            }
            this.gameElements.push(new PlayerMover("Ladder", start, end))
        }
    }

    // Return all squares which are not occupied by another game element (snake or ladder start or end)
    getFillableSquares(): Square[] {
        return this.squares.flat().filter((square) => {
            return !this.gameElements.find(e => e.occupies.includes(square)) 
            && square !== this.startSquare 
            && square !== this.endSquare;
        });
    }
}

abstract class GameElement {
    occupies: Square[] = [];
    constructor(public position: Square) {}
}

class Player extends GameElement {
    move(target: Square) {
        this.position = target;
        // Follow any snakes or ladders
        if (target.mover) {
            console.log(`You hit a ${target.mover.name}, moving to ${target.mover.end.index}`)
            this.move(target.mover.end)
        }
    }
}

class PlayerMover extends GameElement {
    occupies: Square[];

    constructor(readonly name: string, readonly start: Square, readonly end: Square) {
        super(start);
        this.occupies = [start, end]
        start.mover = this;
    }
} 

class Square {
    mover?: PlayerMover;
    constructor(public x: number, public y: number, public index: number) {}
}