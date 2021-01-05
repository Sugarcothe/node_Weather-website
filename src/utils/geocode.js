const request = require('request')


const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VnYXJjb3RoZSIsImEiOiJja2l5ZmNmajA0MXpzMnZxam53eHlocW56In0.-FRX1uMg8GDq5Hy-TG9cgg';


  request ({url, json: true}, (error, {body}) => {
    if (error) {
      callback(`Unable to connect to location services`, undefined)
    } else if (body.features.length = 0){
      callback(`unable to find the loaction input search`)
    } else {
      callback(undefined, {
        latitude: body.location.lat, 
        longitude: body.location.lon,
        location: body.location.name
      })
    }
  })
}



module.export = geocode

// with the above code, we can call geocode many times to access different locations