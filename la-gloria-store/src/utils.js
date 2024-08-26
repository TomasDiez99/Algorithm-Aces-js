function min(a, b) {
    return a < b ? a : b;
}

export async function performGet({url, attempts = 4}) {

    let response = undefined;

    let requestInit = {}
    requestInit.method = "GET";
    requestInit.headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "https://algorithm-aces.vercel.app/",
    };


    for (let i = 0; i < min(attempts, 10); i++) {

        // wait 1 second
        await new Promise((resolve) => setTimeout(resolve, 200));
        try {

            response = await fetch(url, requestInit);
            if (response.ok) {
                return response;
            }
        } catch (e) {
            console.error(" Error fetching with {Get} method: on attempt ", i + 1, response.statusText, response);
        }
    }

    if (response) {
        console.error(" Error fetching with {Get} method: ", response.statusText, response);
        return response.statusText;
    }


}