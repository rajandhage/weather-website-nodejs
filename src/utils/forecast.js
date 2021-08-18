const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${put_access_key_of_weatherstack_here}&query=${latitude},${longitude}&units=f`
    request({url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(response.body.error){
            callback('Unable to find location', undefined);
        }else{
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`);
        }
    })
}

module.exports = forecast
