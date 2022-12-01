import { readFileSync } from "fs";
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const readFile = function (fileName) {
    return readFileSync(path.join(__dirname, `inputs/${fileName}.txt`), "utf-8");
};
//# sourceMappingURL=helpers.js.map