import { readFile } from "./helpers.js";
const input = readFile("5");
const numberOfStacks = 9;
const highestHeight = 8;
let height = 0;
let stackArray = new Array(numberOfStacks);
let moves = [];
for (let i = 0; i < numberOfStacks; i++) {
    stackArray[i] = [];
}
for (let line of input.split("\n")) {
    if (height < highestHeight) {
        const lineChars = line.split("");
        for (let i = 0; i < numberOfStacks; i++) {
            if (lineChars[4 * i + 1] !== " ") {
                stackArray[i].push(lineChars[4 * i + 1]);
            }
        }
        height++;
    }
    else if (line.includes("move")) {
        const moveCommands = line.split(" ");
        const amount = Number(moveCommands[1]);
        const from = Number(moveCommands[3]);
        const to = Number(moveCommands[5]);
        moves.push({ amount, from, to });
    }
}
for (let i = 0; i < numberOfStacks; i++) {
    stackArray[i] = stackArray[i].reverse();
}
function executeSingleMoves(moves, stackArray) {
    for (let move of moves) {
        for (let i = 0; i < move.amount; i++) {
            const crate = stackArray[move.from - 1].pop();
            stackArray[move.to - 1].push(crate);
        }
    }
}
function executeMultipleMoves(moves, stackArray) {
    for (let move of moves) {
        let fromStack = stackArray[move.from - 1];
        let toStack = stackArray[move.to - 1];
        fromStack.slice(fromStack.length - move.amount).forEach(c => toStack.push(c));
        for (let i = 0; i < move.amount; i++) {
            fromStack.pop();
        }
    }
}
function getTopCrates(stackArray) {
    return stackArray.reduce((topCrates, stack) => `${topCrates}${stack[stack.length - 1]}`, "");
}
executeMultipleMoves(moves, stackArray);
console.log(getTopCrates(stackArray));
//# sourceMappingURL=5.js.map