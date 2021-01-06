"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const game = new Game_1.Game({
    boardHeight: 10,
    boardWidth: 10,
    ladderCount: 10,
    snakeCount: 10,
    players: 2
});
game.start();
