// load urls json
const urls = require("./urls.json");

export function forApi(relative) {

    return urls.api + relative;
}

export function getApiBaseUrl() {
    //si termina en barra sacala
    if (urls.api.endsWith("/")) {
        return urls.api.slice(0, -1);
    }
    return urls.api;
}