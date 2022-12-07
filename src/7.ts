import { readFile } from "./helpers.js";

class FileTreeNode {
    name: string;
    size?: number;
    files?: FileTreeNode[];
    folders?: FileTreeNode[];
    parentFolder?: FileTreeNode;

    constructor(name: string, size: number) {
        name = name;
        size = size;
    }
}

const input = readFile("7_test");

let currentFileTreeNode = new FileTreeNode("/", undefined);
for(let line of input.split("\r\n")) {
    if(line === "$ cd /" || line.includes("ls")) {
        continue;
    }
    const splitLine = line.split(" ");
    if(line.includes("cd")) {
        const newFileTreeNode = new FileTreeNode(splitLine[splitLine.length-1], undefined);
        currentFileTreeNode.folders.push(newFileTreeNode);
        newFileTreeNode.parentFolder = currentFileTreeNode;
    }
}

