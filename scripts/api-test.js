// testing parameters
const fakeUrl = true; // true: use an empty string in place of the api url
const useTestData = true; // true: use testResults when using fakeUrl
const responseOk = true; // true: simulate 'ok' from api when using test data
const mode = [fakeUrl, useTestData, responseOk];

// result to use in while testing (to avoid excess API calls)
const testResult = {
    ok: mode[2],
    text: () => { return 'This is a test' },
    json: () => { return { "TEST RESULTS": "does not contain live info", "weather": [{ "description": "overcast clouds", "icon": "04n" }], "main": { "temp": 48.45 } } }
};

// error message contents: 
//   [0]: takes error message, logs to console;
//   [1]: displays in currentTemp;
//   [2]: displays in figcaption;
//   [3]: icon to display (clear sky/red cirdle)
const errorMessage = [
    (e) => `--- There was an unforseen error loading weather data ---\n"${e}"\n--- Please send this message to the site administrator ---`,
    '<br>There was an issue with displaying the weather.',
    'Please contact the site administrator.',
    '01d'
];

// URL to get icons from.
const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

// element to place description in. uses first figcaption on page if no element is found via ID
const figcaption = document.getElementById('weather-description') || document.querySelector('figcaption');
const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');

// pulls lat/lon from currentTemp element. uses Trier Germany if data not present
const url = (mode[0]) ? '' : `https://api.openweathermap.org/data/2.5/weather?lat=${currentTemp.dataset.lat || '49.76'}&lon=${currentTemp.dataset.lon || '6.65'}&units=imperial&appid=90aa228bca858a03c28a006d0b09a93e`;

async function apiFetch(test = false) {
    try {
        const response = (test) ? testResult : await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(`${data.main.temp}&deg;F`, data.weather[0].description, data.weather[0].icon)
        }

        else { throw Error(await response.text()); }
    }

    catch (error) {
        console.error(errorMessage[0](error));
        displayResults(errorMessage[1], errorMessage[2], errorMessage[3])
    }
}

function displayResults(temp, description, icon) {
    currentTemp.innerHTML = `${temp}`;
    figcaption.textContent = description;
    weatherIcon.setAttribute('src', iconUrl(icon));
    weatherIcon.setAttribute('alt', description);
}

apiFetch(mode[1]);