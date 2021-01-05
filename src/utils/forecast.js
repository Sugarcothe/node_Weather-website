const request = require(`request`)

const forecast = (longitude, latitude, callback ) => {
  const url = 'http://api.weatherapi.com/v1/current.json?key=a432b50b0379433ca22194426202412&q=' + latitude + ',' + longitude
  

    request ({url, json: true}, (error, {body}) => {
      if (error) {
        callback(`Unable to connect to weather`, Undefined)
      } else if (Response.body.error) {
        callback(`Unable to connect to the cordinate inpute search`, undefined)
      } else {
        callback(Undefined, body.daily.data[0].summary + `it is currently` + body.current.condition.text + 'degree out. There is a ' + body.current.precip_mm + `% chance of rain.`)
      }
})
}

module.exports = forecast