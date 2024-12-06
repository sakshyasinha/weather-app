function weatherShowFn(data) {
    $('#city-name').text(data.name);

    // Get local time based on the timezone offset (in seconds)
    const timezoneOffset = data.timezone; // e.g., 19800 for IST (+5:30)
    const utcTime = Date.now() + new Date().getTimezoneOffset() * 60000; // Current UTC time in milliseconds
    const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust UTC time with city's timezone offset

    // Format the time and date
    const formattedTime = localTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    $('#date').text(formattedTime);
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    $('#weather-info').fadeIn();
}
