"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const utils_1 = require("./utils");
const Board_1 = __importDefault(require("./Board"));
const GameElements_1 = require("./GameElements");
let Game = /** @class */ (() => {
    class Game {
        constructor(config) {
            this.players = [];
            this.activePlayerIndex = 0;
            this.getPlayer = () => this.players[this.activePlayerIndex];
            this.board = new Board_1.default(config.boardWidth, config.boardHeight);
            for (let x = 1; x <= config.players; x++) {
                const player = new GameElements_1.Player(this.board.squares[0][0]);
                this.players.push(player);
                this.board.gameElements.push(player);
                this.board.addSnakes(config.snakeCount);
                this.board.addLadders(config.ladderCount);
            }
        }
        async start() {
            console.log("Press a key to start the game");
            while (!this.winner) {
                await this.takeTurn();
                ++this.activePlayerIndex;
                if (this.activePlayerIndex > this.players.length - 1) {
                    this.activePlayerIndex = 0;
                }
            }
        }
        async takeTurn() {
            console.log(`Roll dice for player ${this.activePlayerIndex + 1}...currently at square ${this.getPlayer().position.index}`);
            await utils_1.keypress();
            let player = this.getPlayer();
            const roll = Game.rollDice();
            console.log(`Rolled a ${roll}`);
            this.board.advancePlayer(player, roll);
            if (player.position === this.board.endSquare) {
                console.log(`Player ${this.activePlayerIndex + 1} won!`);
                this.winner = player;
            }
        }
    }
    Game.rollDice = (d = 6) => Math.ceil(Math.random() * d);
    return Game;
})();
exports.Game = Game;
