const path = require(`path`)
const express = require(`express`)
const hbs = require(`hbs`)
const geocode = require(`./utils/geocode`)


 const app = express()


 // DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');const partialPath = path.join(__dirname, '../templates/partials')


// Setup Handlebars engine and views locations
app.set(`view engine`, `hbs`)
app.set('views', viewsPath)
hbs.registerPartials(partialPath )

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get(``, (req,res) => {
  res.render(`index`, {
    title: 'Weather App',
    name: ' Valentine Eze'
  });
})

app.get(`/about`, (req, res) => {
  res.render(`about`, {
    title: 'About',
    name: 'Eze Valentine'
  })
})

app.get(`/help`, (req, res) => {
  res.render('help', {
    message: 'this is a help message',
    title: 'Help',
    name: 'Eze Valentine'
  })
})




app.get(`/weather`, (req,res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please inpute an address'
    })
  } 
  geocode(req.query.address, (Weather ={}) => {
      return res.send({Weather})
  })
})




app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    product: []
  })
})





app.get('/help/*', (req, res) => {
  res.render('error',{
    title: '404',
    message: 'Help article not found',
    name: 'sugarCothe'
  })
})

app.get(`*`, (req,res) => {
  res.render('error',{
    title: '404', 
    message: 'This search cannot be found',
    name: 'SugarCothe'

  })
})


// LISTENING TO THE FILE IN THE BROWSER 
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});