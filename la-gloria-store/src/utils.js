function min(a, b) {
    return a < b ? a : b;
}

export async function performGet({url, attempts = 4}) {
    let response = undefined;

    const requestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Referer": "https://algorithm-aces.vercel.app/",
        }
    };



    for (let i = 0; i < min(attempts, 10); i++) {
        // wait 200 milliseconds before each attempt
        await new Promise((resolve) => setTimeout(resolve, 200));

        try {
            response = await fetch(url, requestInit);

            if (response.ok) {
                return response;
            } else {
                console.error(`Attempt ${i + 1}: Server responded with status ${response.status}`);
            }
        } catch (e) {
            console.error(`Attempt ${i + 1}: Error fetching with {GET} method`, e.message);
        }
    }

    if (response) {
        console.error("Error fetching with {GET} method: ", response.statusText);
        return response.statusText;
    } else {
        console.error("Failed to fetch after multiple attempts.");
        return "Fetch failed after multiple attempts.";
    }
}
