"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMover = exports.Player = exports.GameElement = exports.Square = void 0;
class Square {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
}
exports.Square = Square;
class GameElement {
    constructor(position) {
        this.position = position;
        this.occupies = [];
    }
}
exports.GameElement = GameElement;
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
exports.Player = Player;
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
exports.PlayerMover = PlayerMover;
