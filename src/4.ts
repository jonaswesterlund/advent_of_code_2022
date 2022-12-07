import { readFile } from "./helpers.js";

const input = readFile("4_cleaning");

let overlaps = 0;
for (let sectionPair of input.split("\n")) {
  const sections = sectionPair.split(",");
  const section1 = sections[0].split("-");
  const section2 = sections[1].split("-");
  const section1Start = Number(section1[0]);
  const section1End = Number(section1[1]);
  const section2Start = Number(section2[0]);
  const section2End = Number(section2[1]);

  if (
    (section1Start >= section2Start && section1End <= section2End) ||
    (section2Start >= section1Start && section2End <= section1End)
  ) {
    overlaps++;
  }
}
console.log(overlaps);

overlaps = 0;
for (let sectionPair of input.split("\n")) {
  const sections = sectionPair.split(",");
  const section1 = sections[0].split("-");
  const section2 = sections[1].split("-");
  const section1Start = Number(section1[0]);
  const section1End = Number(section1[1]);
  const section2Start = Number(section2[0]);
  const section2End = Number(section2[1]);

  if (
    (section1End >= section2Start && section1End <= section2End) ||
    (section2End >= section1Start && section2End <= section1End)
  ) {
    overlaps++;
  }
}
console.log(overlaps);
