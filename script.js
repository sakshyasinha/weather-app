 const url = 'https://api.openweathermap.org/data/2.5/weather';
        const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

        $(document).ready(function () {
            weatherFn('Delhi');
        });

        async function weatherFn(cName) {
            const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
            try {
                const res = await fetch(temp);
                const data = await res.json();
                if (res.ok) {
                    weatherShowFn(data);
                } else {
                    alert('City not found. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        function weatherShowFn(data) {
            $('#city-name').text(data.name);

            // Get local time based on the timezone offset
            const timezoneOffset = data.timezone; // in seconds
            const localTime = new Date(Date.now() + timezoneOffset * 1000);
            const formattedTime = localTime.toLocaleString('en-US', {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            $('#date').text(formattedTime);
            $('#temperature').html(`${data.main.temp}°C`);
            $('#description').text(data.weather[0].description);
            $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
            $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            $('#weather-info').fadeIn();
        }
