import { Game } from './Game'

const game = new Game({
    boardHeight: 10,
    boardWidth: 10,
    ladderCount: 10,
    snakeCount: 10,
    players: 2
})

game.start();