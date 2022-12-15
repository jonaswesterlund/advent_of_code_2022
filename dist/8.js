import { readFile } from "./helpers.js";
const input = readFile("8_test");
let trees = [];
for (let row of input.split("\r\n")) {
    trees.push(row.split("").map((c) => Number(c)));
}
function countVisibleTrees(trees) {
    let visibleTrees = 0;
    for (let row = 0; row < trees.length; row++) {
        for (let col = 0; col < trees.length; col++) {
            if (row === 0 ||
                row === trees.length - 1 ||
                col === 0 ||
                col === trees.length - 1) {
                visibleTrees++;
                continue;
            }
            const selectedTree = trees[row][col];
            const higherLeft = trees[row].filter((tree, index) => index < col && tree >= selectedTree);
            const higherRight = trees[row].filter((tree, index) => index > col && tree >= selectedTree);
            const higherAbove = trees
                .map((row) => row[col])
                .filter((tree, index) => index < row && tree >= selectedTree);
            const higherBelow = trees
                .map((row) => row[col])
                .filter((tree, index) => index > row && tree >= selectedTree);
            if (higherLeft.length === 0 ||
                higherRight.length === 0 ||
                higherAbove.length === 0 ||
                higherBelow.length === 0) {
                visibleTrees++;
            }
        }
    }
    return visibleTrees;
}
function calculateViewingDistance(trees) {
    let scenicScores = new Array(trees.length).fill(new Array(trees.length).fill(1));
    for (let row = 0; row < trees.length; row++) {
        for (let col = 0; col < trees.length; col++) {
            if (row === 0 ||
                row === trees.length - 1 ||
                col === 0 ||
                col === trees.length - 1) {
                scenicScores[row][col] = 0;
                continue;
            }
            const selectedTree = trees[row][col];
            const treesLeft = trees[row]
                .filter((tree, index) => index < col)
                .reverse();
            const firstIndexLeft = treesLeft.findIndex((tree) => tree >= selectedTree);
            const treesRight = trees[row].filter((tree, index) => index > col);
            const firstIndexRight = treesRight.findIndex((tree) => tree >= selectedTree);
            const treesUp = trees
                .map((row) => row[col])
                .filter((tree, index) => index < row)
                .reverse();
            const firstIndexUp = treesUp.findIndex((tree) => tree >= selectedTree);
            const treesDown = trees
                .map((row) => row[col])
                .filter((tree, index) => index > row);
            const firstIndexDown = treesDown.findIndex((tree) => tree >= selectedTree);
            const indexes = [
                firstIndexLeft,
                firstIndexRight,
                firstIndexUp,
                firstIndexDown,
            ];
            const treeDirections = [treesLeft, treesRight, treesUp, treesDown];
            console.log(scenicScores);
            scenicScores[row][col] = indexes.reduce((score, index, i) => {
                if (index < 0) {
                    return score * treeDirections[i].length;
                }
                else {
                    return score * (index + 1);
                }
            }, 1);
            console.log(scenicScores);
        }
    }
    return scenicScores;
}
console.log(countVisibleTrees(trees));
console.log(calculateViewingDistance(trees));
//# sourceMappingURL=8.js.map