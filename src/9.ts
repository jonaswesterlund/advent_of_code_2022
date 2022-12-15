import { readFile } from './helpers.js';

const input = readFile("9_test");

const moves = {
  'R': { dX: 1, dY: 0 },
  'L': { dX: -1, dY: 0 },
  'U': { dX: 0, dY: 1 },
  'D': { dX: 0, dY: -1 },
  'UR': { dX: 1, dY: 1 },
  'UL': { dX: -1, dY: 1 },
  'DL': { dX: -1, dY: -1 },
  'DR': { dX: 1, dY: -1 },
}
class Position {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
  }

  moveTo(pos: Position) {
    this.x = pos.x;
    this.y = pos.y;
  }

  distanceTo(pos: Position): number {
    return Math.abs(Math.sqrt(Math.pow(this.x-pos.x,2)+Math.pow(this.y-pos.y,2)));
  }

}

function twoKnotMovement() {
  const visited = new Set<string>();
  visited.add(JSON.stringify(new Position(0, 0))); 
  let head: Position = new Position(0, 0);
  let tail: Position = new Position(0, 0);

  for(let line of input.split("\n")) {
    const [direction, steps] = line.split(" ");
    for(let i = 0; i < Number(steps); i++) {
      const previousHead = new Position(head.x, head.y);
      const move = moves[direction];
      head.move(move.dX, move.dY);
      if(head.distanceTo(tail) >= 2) {
        tail.moveTo(previousHead);
        visited.add(JSON.stringify(new Position(tail.x,tail.y)));
      }
    }
  }
  return visited;
}

function tenKnotMovement() {
  const visited = new Set<string>();
  visited.add(JSON.stringify(new Position(0, 0))); 
  const knots = [];
  for(let i = 0; i<10;i++) {
    knots.push(new Position(0,0));
  }
  for(let line of input.split("\n")) {
    const [direction, steps] = line.split(" ");
    for(let i = 0; i < Number(steps); i++) {
      let previousKnot = new Position(knots[0].x, knots[0].y);
      const move = moves[direction];
      knots[0].move(move.dX, move.dY);
      for(let j = 1; j < 10; j++) {
        previousKnot = new Position(knots[j-1].x, knots[j-1].y);
        if(knots[j].distanceTo(knots[j-1]) >= 2) {
          knots[j].moveTo(previousKnot);
          if(j === 9) {
            visited.add(JSON.stringify(new Position(knots[j].x,knots[j].y)));
          }
        }
      }
    }
  }
  return visited;
}
console.log(twoKnotMovement().size); 
console.log(tenKnotMovement().size);