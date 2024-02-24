
function getWeather() {
    const apiKey = '6aff83c7ee33b892bf089d5b1b948743'; // Replace with your actual API key
    const city = document.getElementById('city').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please enter a valid city.');
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response to the console

            const weatherIcon = document.getElementById('weather-icon');
            const temperature = document.getElementById('temperature');
            const description = document.getElementById('description');

            // Set weather icon
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `path/to/icons/${iconCode}.png`; // Adjust the path accordingly
            weatherIcon.alt = data.weather[0].description;

            // Set temperature and description
            temperature.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
            description.textContent = `Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);

            // Display error message
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
        });
}




