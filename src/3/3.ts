import { readFile } from "../helpers.js";

const input: string = readFile("3_rucksack");

let prioritySum = 0;
for (let rucksack of input.split("\n")) {
  const totalItems = rucksack.length;
  const firstHalf = Array.from(rucksack.slice(0, totalItems / 2));
  const secondHalf = Array.from(rucksack.slice(totalItems / 2, totalItems));
  const commonItems = firstHalf.filter((c) => secondHalf.includes(c));
  if (commonItems.length === 0) {
    throw Error("this is a problem");
  }
  const commonItem = commonItems[0];
  const charAsciiDecimal = commonItem.charCodeAt(0);
  const priority =
    charAsciiDecimal >= 97 ? charAsciiDecimal - 96 : charAsciiDecimal - 38;
  prioritySum += priority;
}

console.log(prioritySum);

prioritySum = 0;
const inputArray = input.split("\n");
for (let i = 0; i < inputArray.length; i += 3) {
  const [elf1, elf2, elf3] = inputArray.slice(i, i + 3);
  const commonItems = Array.from(elf1).filter(
    (c) => Array.from(elf2).includes(c) && Array.from(elf3).includes(c)
  );
  if (commonItems.length === 0) {
    throw Error("this is a problem");
  }
  const commonItem = commonItems[0];
  const charAsciiDecimal = commonItem.charCodeAt(0);
  const priority =
    charAsciiDecimal >= 97 ? charAsciiDecimal - 96 : charAsciiDecimal - 38;
  prioritySum += priority;
}

console.log(prioritySum);
