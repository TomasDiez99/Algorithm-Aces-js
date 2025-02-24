/**
 * Utility function to create a delay.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} - A promise that resolves after the specified delay.
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Performs a GET request with retry logic.
 *
 * This function attempts to fetch data from the specified URL. It retries the request
 * up to the specified number of attempts in case of failure. A delay is introduced
 * between attempts to avoid overwhelming the server.
 *
 * @param {Object} options - Configuration options for the request.
 * @param {string} options.url - The URL to fetch data from.
 * @param {number} [options.attempts=4] - The number of retry attempts. Default is 4.
 * @returns {Promise<Response|string>} - The response object if successful, otherwise an error message.
 */
export async function fetchMultiAttempt({url, attempts = 40}) {
    const requestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Referer": "https://algorithm-aces.vercel.app/",
        }
    };

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const response = await fetch(url, requestInit);

            if (response.ok) {
                return response;
            } else {
                console.error(`Attempt ${attempt}: Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error(`Attempt ${attempt}: Error fetching with GET method - ${error.message}`);
        }

        // Wait before the next attempt
        await delay(200);
    }

    console.error("Failed to fetch after multiple attempts.");
    return "Fetch failed after multiple attempts.";
}


/**
 * Handle error responses by opening the error content in a new window.
 *
 * @param {Response} response - The fetch response.
 */
export const handleErrorResponse = async (response) => {
    let text = await response.text();
    console.error(text);
};

export const redirectIfOffline = (navigate, onlineRoute, offlineRoute = "/errorPWA") => {
    if (!navigator.onLine) {
        navigate(offlineRoute);
    } else {
        navigate(onlineRoute);
    }
};