const express = require('express')
const bodyParser = require('body-parser')
const request = require('request');
const cors = require('cors');
const cron = require('node-cron')


// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// app.use(bodyParser.json())

const app = express();
app.use(cors())
const apiKey = '9fbc2404f5ad3f9c12f712b9627574d8';

let weatherData = {};

// Refresh data every 5 minutes
cron.schedule('*/5 * * * *', () => {
    Object.keys(weatherData).forEach(city => {
        // Fetch data for each city
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        request(url, (err, response, body) => {
            if (!err) {
                weatherData[city] = JSON.parse(body);
            }
        });
    });
});

app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    if (weatherData[city]) {
        res.send({
            city: weatherData[city].name,
            temperature: weatherData[city].main.temp.toFixed(),
            description: weatherData[city].weather[0].description,
            latitude: weatherData[city].coord.lat,
            longitude: weatherData[city].coord.lon
        });
    } else {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        request(url, (err, response, body) => {
            if (err) {
                res.send({ error: 'Something went wrong' });
            } else {
                weatherData[city] = JSON.parse(body);
                res.send({
                    city: weatherData[city].name,
                    temperature: weatherData[city].main.temp.toFixed(),
                    description: weatherData[city].weather[0].description,
                    latitude: weatherData[city].coord.lat,
                    longitude: weatherData[city].coord.lon
                });
            }
        });
    }
});


app.listen(9999, () => {
    console.log('Server started on port 9999');
});