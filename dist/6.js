import { readFile } from "./helpers.js";
const input = readFile("6");
function getIndexWhereSubtringContainsDifferentCharacters(length) {
    for (let i = 0; i < input.length; i++) {
        if (i < length) {
            continue;
        }
        const substring = input.slice(i - length, i);
        const characters = new Set(substring);
        if (characters.size === length) {
            return i;
        }
    }
}
console.log(getIndexWhereSubtringContainsDifferentCharacters(4));
console.log(getIndexWhereSubtringContainsDifferentCharacters(14));
//# sourceMappingURL=6.js.map