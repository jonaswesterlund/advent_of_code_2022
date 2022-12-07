import { readFile } from "./helpers.js";
class FileTreeNode {
    constructor(name, size) {
        this.files = [];
        this.folders = [];
        this.name = name;
        this.size = size;
    }
}
const input = readFile("7_test");
function createTreeNodeStructure() {
    const rootNode = new FileTreeNode("/", 0);
    let currentFileTreeNode = rootNode;
    for (let line of input.split("\r\n")) {
        if (line === "$ cd /" || line === "$ ls" || line.includes("dir ")) {
            continue;
        }
        const splitLine = line.split(" ");
        if (line === "$ cd ..") {
            currentFileTreeNode = currentFileTreeNode.parentFolder;
        }
        else if (line.includes("$ cd ")) {
            const newFolder = new FileTreeNode(splitLine[splitLine.length - 1], 0);
            currentFileTreeNode.folders.push(newFolder);
            newFolder.parentFolder = currentFileTreeNode;
            currentFileTreeNode = newFolder;
        }
        else {
            const size = Number(splitLine[0]);
            const fileName = splitLine[1];
            const newFile = new FileTreeNode(fileName, size);
            currentFileTreeNode.files.push(newFile);
            newFile.parentFolder = currentFileTreeNode;
        }
    }
    return rootNode;
}
function addSizesThroughPostOrderTraversal(node) {
    for (let folder of node.folders) {
        addSizesThroughPostOrderTraversal(folder);
    }
    for (let file of node.files) {
        addSizesThroughPostOrderTraversal(file);
    }
    if (node.parentFolder) {
        node.parentFolder.size += node.size;
    }
}
function sumSizesUnder100000(node, sum) {
    if (node.size <= 100000) {
        sum += node.size;
    }
    for (let folder of node.folders) {
        sum += sumSizesUnder100000(folder, 0);
    }
    return sum;
}
function findSmallestRequiredForDelete(node, lowest, required) {
    if (node.size < lowest && node.size >= required) {
        lowest = node.size;
    }
    for (let folder of node.folders) {
        sumSizesUnder100000(folder, lowest);
    }
    return lowest;
}
const rootFolder = createTreeNodeStructure();
addSizesThroughPostOrderTraversal(rootFolder);
const sum = sumSizesUnder100000(rootFolder, 0);
const lowest = findSmallestRequiredForDelete(rootFolder, rootFolder.size, 30000000 - 70000000 + rootFolder.size);
console.log(rootFolder.size);
console.log(sum);
console.log(lowest);
//# sourceMappingURL=7.js.map