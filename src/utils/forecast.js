const request = require('request');

const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=77b24fcdd3c9fccd0fe089b15d284560&query=' + latitude + ',' + longitude +'&units=m';

// console.log(url);
  request({url: url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to weather service!', undefined);
      } else if (body.error) {
        callback('Unable to find location', undefined);
      } else {
        callback(undefined, {
          location:    body.location.name,
          Country:     body.location.country,
          description: body.current.weather_descriptions[0],
          feelslike:   body.current.feelslike,
          temperature: body.current.temperature,
          cloudcover:  body.current.cloudcover,
          wind_speed:  body.current.wind_speed,
          wind_dir:    body.current.wind_dir,
          weather_icons: body.current.weather_icons[0]
        });
      }
  });
};


module.exports = forecast;
