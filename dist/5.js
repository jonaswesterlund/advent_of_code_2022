import { readFile } from "./helpers.js";
const input = readFile("5_test");
const numberOfStacks = 3;
const highestHeight = 3;
let height = 0;
let stackArray = new Array(numberOfStacks);
for (let i = 0; i < numberOfStacks; i++) {
    stackArray[i] = [];
}
for (let line of input.split("\n")) {
    if (height >= highestHeight) {
        break;
    }
    const lineChars = line.split("");
    for (let i = 0; i < numberOfStacks; i++) {
        if (lineChars[4 * i + 1] !== " ") {
            stackArray[i].push(lineChars[4 * i + 1]);
        }
    }
    height++;
}
for (let i = 0; i < numberOfStacks; i++) {
    stackArray[i] = stackArray[i].reverse();
}
console.log(stackArray);
//# sourceMappingURL=5.js.map