"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class Board {
    // Create all of our squares
    constructor(width, height) {
        this.squares = [];
        this.gameElements = [];
        this.width = width;
        this.height = height;
        for (let x = 0; x < width; x++) {
            this.squares.push([]);
            for (let y = 0; y < height; y++) {
                const square = new Square(x, y, y * this.width + x % this.width);
                this.squares[x][y] = square;
                if (x === width - 1 && y === height - 1) {
                    this.endSquare = square;
                }
                this.startSquare = this.squares[0][0];
            }
        }
    }
    getSquare(index) {
        const y = Math.floor(index / this.width);
        const x = index % this.width;
        console.log(y, x);
        return this.squares[x][y];
    }
    advancePlayer(player, numSquares) {
        let newIndex = player.position.index + numSquares;
        // Bounce player back from the end square if moving past it
        if (newIndex > this.width * this.height - 1) {
            newIndex = (this.width * this.height - 1) - (newIndex - (this.width * this.height));
        }
        const destSquare = this.getSquare(newIndex);
        console.log(`Moving to square ${destSquare.index}`);
        player.move(destSquare);
    }
    addSnakes(numSnakes) {
        for (let x = 0; x <= numSnakes; x++) {
            // Snakes can only start on row 2.
            const start = lodash_1.default.sample(this.getFillableSquares().filter(square => square.y > 0));
            // If our board is full, return early
            if (!start) {
                return;
            }
            // Must always go down at least one row
            const end = lodash_1.default.sample(this.getFillableSquares().filter(square => square.y < start.y));
            if (!end) {
                return;
            }
            this.gameElements.push(new PlayerMover("Snake", start, end));
        }
    }
    addLadders(numLadders) {
        for (let x = 0; x <= numLadders; x++) {
            // Ladders can only start up to row x-1.
            const start = lodash_1.default.sample(this.getFillableSquares().filter(square => square.y < this.height - 1));
            // If our board is full, quit out
            if (!start) {
                return;
            }
            // Must always go up at least one row
            const end = lodash_1.default.sample(this.getFillableSquares().filter(square => square.y > start.y));
            if (!end) {
                return;
            }
            this.gameElements.push(new PlayerMover("Ladder", start, end));
        }
    }
    // Return all squares which are not occupied by another game element (snake or ladder start or end)
    getFillableSquares() {
        return this.squares.flat().filter((square) => {
            return !this.gameElements.find(e => e.occupies.includes(square))
                && square !== this.startSquare
                && square !== this.endSquare;
        });
    }
}
exports.default = Board;
class GameElement {
    constructor(position) {
        this.position = position;
        this.occupies = [];
    }
}
class Player extends GameElement {
    move(target) {
        this.position = target;
        // Follow any snakes or ladders
        if (target.mover) {
            console.log(`You hit a ${target.mover.name}, moving to ${target.mover.end.index}`);
            this.move(target.mover.end);
        }
    }
}
class PlayerMover extends GameElement {
    constructor(name, start, end) {
        super(start);
        this.name = name;
        this.start = start;
        this.end = end;
        this.occupies = [start, end];
        start.mover = this;
    }
}
class Square {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
}
