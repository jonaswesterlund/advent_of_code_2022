import { readFile } from "./helpers.js";

const strategy = readFile("2_rps");

enum Choice {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}
const choices = {
  A: Choice.ROCK,
  B: Choice.PAPER,
  C: Choice.SCISSORS,
  X: Choice.ROCK,
  Y: Choice.PAPER,
  Z: Choice.SCISSORS,
};
const choiceMap = new Map<string, Choice>(Object.entries(choices));

const winsAgainst = new Map<Choice, Choice>();
winsAgainst.set(Choice.ROCK, Choice.SCISSORS);
winsAgainst.set(Choice.PAPER, Choice.ROCK);
winsAgainst.set(Choice.SCISSORS, Choice.PAPER);

const losesAgainst = new Map<Choice, Choice>();
losesAgainst.set(Choice.ROCK, Choice.PAPER);
losesAgainst.set(Choice.PAPER, Choice.SCISSORS);
losesAgainst.set(Choice.SCISSORS, Choice.ROCK);

let points = 0;
for (let round of strategy.split("\r\n")) {
  const choices = round.split(" ");
  const elfChoice = choiceMap.get(choices[0]);
  //const myChoice = choiceMap.get(choices[1]);
  const myChoice = resultToChoice(choices[1], elfChoice);
  switch (myChoice) {
    case Choice.ROCK: {
      points += 1;
      break;
    }
    case Choice.PAPER: {
      points += 2;
      break;
    }
    case Choice.SCISSORS: {
      points += 3;
      break;
    }
  }
  if (winsAgainst.get(myChoice) === elfChoice) {
    points += 6;
  } else if (myChoice === elfChoice) {
    points += 3;
  } else {
    points += 0;
  }
}

function resultToChoice(result: string, elfChoice: Choice): Choice {
    if(result === 'X') {
        return winsAgainst.get(elfChoice)
    } else if(result === 'Y') {
        return elfChoice;
    } else {
        return losesAgainst.get(elfChoice);
    }
}
console.log(points);
