const path = require(`path`)
const forecast = require(`./utils/forecast`)
const geocode = require(`./utils/geocode`)
const express = require(`express`)
const hbs = require(`hbs`)




const app = express();

// define path for Express config
const publicPath = path.join(__dirname, `./public`)
const viewsPath = path.join(__dirname, `../templates/views`)
const partialsPath = path.join(__dirname, `../templates/partials`)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set(`views`, viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicPath))


//route files
app.get(``, (req, res) => {
  res.render(`index`, {
    title: "weather App",
    name: "Valentine",
  })
})

app.get(`/about`, (req, res) => {
  res.render(`about`,{
    title: `About`,
    name:   `Eze Valentine`,
  })
})

app.get(`/help`, (req, res)  => {
  res.render(`help`, {
    title: `Help`,
    message: "This is a help message, if i see it succesfully then i got this backend full time",
    name: "Eze Valentine",
  })
})



app.get (`/weather`, (req,res) => {
  if(!req.query.address) {
    return res.send({
      error: `You must provide a valid location`
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location = {}}) => {
    if(error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address

      })

      })
    })
  })
  



//   res.send({
//     forecast: `Sunny`,
//     location: `Enugu`,
//     address: req.query.address
//   })
// })


 

app.get(`/products`, (req,res) => {
  if (!req.query.search) {
    return res.send({
      error:`You must provide a search term`
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

// below is as well catch fucntiion for error in help page
app.get(`/help/*`, (req,res) => {
  res.render(`errors`, {
    name: `Eze Valentine`,
    title: `ERROR PAGE`,
    errorMessage: `Help article not found`

  })
})

//THIS PARTICULAR ERROR PAGE, MUST COME LAST!
app.get(`*`, (req, res) => {
  res.render(`errors`, {
    name: `Eze Valentine`,
    title: `ERROR PAGE`,
    errorMessage: 'Page Not Found'
  })
})


app.listen(3000, () => {
  console.log(`server is up on port 3000.`)
})