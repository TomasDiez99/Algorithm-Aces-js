// load urls json
const urls = require("./urls.json");

export function forApi(relative) {
    return urls.api + relative;
}