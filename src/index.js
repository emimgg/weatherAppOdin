
const API_KEY = '28U5TMM4A9FWVJBRBR4JCD326';
const API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/asuncion?unitGroup=metric&key=28U5TMM4A9FWVJBRBR4JCD326&contentType=json';
const locations = [];
const appContainer = document.getElementById('app');


const getWeather = async (location, unit) => {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${API_KEY}&contentType=json`);
        const data = await response.json();
        renderWeatherApp(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        renderError("Location not found or network error.");
    }
};

const handleWeatherData = (data) => {
    const location = new Location(data.resolvedAddress, data.description, data.currentConditions, data.days);
    locations.push(location);
    console.log(`Location added: ${location.name}`);
    console.log(locations);
};

class Location {
    constructor(name, description, currentWeather, days) {
        this.name = name;
        this.description = description;
        this.currentWeather = currentWeather;
        this.days = days;
    }
}

const createWeatherHeader = (location, description) => {
    const header = document.createElement('header');
    header.classList.add('weather-header');

    const title = document.createElement('h1');
    title.innerText = `Weather in ${location}`;
    
    const desc = document.createElement('p');
    desc.innerText = description;

    header.appendChild(title);
    header.appendChild(desc);
    return header;
};

const createCurrentWeather = (location) => {
    const section = document.createElement('section');
    section.classList.add('current-weather');

    const temp = document.createElement('h2');
    temp.innerText = `Current Temperature: ${location.currentWeather.temp}°C`;

    const conditions = document.createElement('p');
    conditions.innerText = `Conditions: ${location.currentWeather.conditions}`;

    section.appendChild(temp);
    section.appendChild(conditions);
    return section;
};

const createForecast = (days) => {
    const section = document.createElement('section');
    section.classList.add('forecast');

    const forecastTitle = document.createElement('h2');
    forecastTitle.innerText = "7-Day Forecast";

    const forecastList = document.createElement('div');
    forecastList.classList.add('forecast-list');

    days.slice(0, 7).forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');

        const date = document.createElement('h3');
        date.innerText = new Date(day.datetime).toLocaleDateString();

        const tempHigh = document.createElement('p');
        tempHigh.innerText = `High: ${day.tempmax}°C`;

        const tempLow = document.createElement('p');
        tempLow.innerText = `Low: ${day.tempmin}°C`;

        const conditions = document.createElement('p');
        conditions.innerText = `Conditions: ${day.conditions}`;

        dayCard.appendChild(date);
        dayCard.appendChild(tempHigh);
        dayCard.appendChild(tempLow);
        dayCard.appendChild(conditions);
        forecastList.appendChild(dayCard);
    });

    section.appendChild(forecastTitle);
    section.appendChild(forecastList);
    return section;
};

const renderWeatherApp = (data) => {
    appContainer.innerHTML = '';

    const location = new Location(data.resolvedAddress, data.description, data.currentConditions, data.days);

    const header = createWeatherHeader(location.name, location.description);
    const currentWeather = createCurrentWeather(location);
    const forecast = createForecast(location.days);

    appContainer.appendChild(header);
    appContainer.appendChild(currentWeather);
    appContainer.appendChild(forecast);
};

const renderError = (message) => {
    appContainer.innerHTML = '';
    const errorSection = document.createElement('section');
    errorSection.classList.add('error-message');
    
    const errorMsg = document.createElement('p');
    errorMsg.innerText = message;
    
    errorSection.appendChild(errorMsg);
    appContainer.appendChild(errorSection);
};


getWeather('asuncion', 'metric');
