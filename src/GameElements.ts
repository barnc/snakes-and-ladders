
export class Square {
    mover?: PlayerMover;
    constructor(public x: number, public y: number, public index: number) {}
}

export abstract class GameElement {
    occupies: Square[] = [];
    constructor(public position: Square) {}
}

export class Player extends GameElement {
    move(target: Square) {
        this.position = target;
        // Follow any snakes or ladders
        if (target.mover) {
            console.log(`You hit a ${target.mover.name}, moving to ${target.mover.end.index}`)
            this.move(target.mover.end)
        }
    }
}

export class PlayerMover extends GameElement {
    occupies: Square[];

    constructor(readonly name: string, readonly start: Square, readonly end: Square) {
        super(start);
        this.occupies = [start, end]
        start.mover = this;
    }
} 
