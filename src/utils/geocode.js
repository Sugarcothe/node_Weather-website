const request =  require(`request`)



const geocode = (address, callback) => {
  const url = 'http://api.weatherapi.com/v1/current.json?key=a432b50b0379433ca22194426202412&q='+ encodeURIComponent(address)

  request ({url, json:true}, (error, {body}) => {
    if (error) {
      callback(`Unable to connect to Weather services`, undefined)
    } else if (body.error) {
      callback(`Unable to find weather location, Try another search`, undefined)
    } else {
      callback('Welcome to '+ body.location.name + ', '+ body.location.region + ', ' + body.location.country  + ' weather report!. The local Date and time is ' + body.location.localtime + '. Currently the weather condition is ' + body.current.temp_c + '% degrees celcius. The weather condition is ' + body.current.condition.text + ' today!')
    }
  })
}




module.exports = geocode