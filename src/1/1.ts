import { readFile } from "../helpers.js";

function totalCaloriesByElves(): number[] {
  let currentCalories = 0;
  let totalCaloriesByElves = [];
  for (let line of readFile("1_calories").split("\r\n")) {
    if (line.length === 0) {
      totalCaloriesByElves.push(currentCalories);
      currentCalories = 0;
    } else {
      currentCalories += Number.parseInt(line);
    }
  }
  return totalCaloriesByElves;
}

const sortedCalories = totalCaloriesByElves().sort().reverse();

console.log(sortedCalories[0]);
console.log(sortedCalories[0] + sortedCalories[1] + sortedCalories[2]);
