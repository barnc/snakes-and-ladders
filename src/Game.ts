import _ from 'lodash'
import { keypress } from './utils'
import Board from './Board'
import { Player }from './GameElements'

interface GameConfig {
    boardWidth: number;
    boardHeight: number;
    snakeCount: number;
    ladderCount: number;
    players: number;
}

export class Game {
    players: Player[] = [];
    activePlayerIndex: number = 0;
    board: Board;
    winner?: Player;

    static rollDice = (d: number = 6) => Math.ceil(Math.random() * d)

    constructor(config: GameConfig) {
        this.board = new Board(config.boardWidth, config.boardHeight);

        for (let x = 1; x <= config.players; x++) {
            const player = new Player(this.board.squares[0][0])
            this.players.push(player)
            this.board.gameElements.push(player)
            this.board.addSnakes(config.snakeCount)
            this.board.addLadders(config.ladderCount)
        }
    }

    getPlayer = () => this.players[this.activePlayerIndex]

    async start() {
        console.log("Press a key to start the game")

        while (!this.winner) {
            await this.takeTurn();
            ++this.activePlayerIndex;
            if (this.activePlayerIndex > this.players.length - 1) {
                this.activePlayerIndex = 0;
            }
        }
    }

    async takeTurn() {
        console.log(`Roll dice for player ${this.activePlayerIndex + 1}...currently at square ${this.getPlayer().position.index}`)
        await keypress();
        let player = this.getPlayer();
        const roll = Game.rollDice();
        console.log(`Rolled a ${roll}`)
        this.board.advancePlayer(player, roll)
        if (player.position === this.board.endSquare) {
            console.log(`Player ${this.activePlayerIndex + 1} won!`)
            this.winner = player; 
        }
    }
}