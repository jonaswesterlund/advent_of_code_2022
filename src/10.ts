import { readFile } from './helpers.js';

const input = readFile("10");

let commands = []
for(let line of input.split("\n")) {
  if(line.includes("noop")) {
    commands.push({ command: "noop" });
  } else {
    const [command, value] = line.split(" ");
    commands.push({ command: command, value: Number(value) });
  }
}

function registerAfterNCommands(commands: any[], n: number) {
  let cycleNumber = 1;
  let commandNumber = 0;
  const cycles = [];
  while(cycleNumber < n-1) {
    cycles.push(commands[commandNumber]);
    if(commands[commandNumber].command === "addx") {
      cycleNumber += 2;
    } else {
      cycleNumber++;
    }
    commandNumber++;
  }
  return cycles.reduce((register, { value }) => register += value || 0 , 1)
}

let signalStrength = 0;
for(let i = 20; i < 221; i+=40) {
  const register = registerAfterNCommands(commands, i);
  signalStrength += register*i;
  console.log(signalStrength, register, i )
}

console.log(signalStrength)
