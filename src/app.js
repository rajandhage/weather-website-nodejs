const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views location
app.set('view engine', 'hbs') //bydefault hbs looks for templates in 'views' folder, but we can customize it as belows
app.set('views', viewsPath);
//setup pariatls path
hbs.registerPartials(partialsPath);



//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather',
        name : 'Rajan Dhage'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About',
        name : 'Rajan Dhage'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText : 'Helpful Text :)',
        title : "Help",
        name : 'Rajan Dhage'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    
    console.log(req.query);
    res.send({
        products : []
    })
})

//to set route for unmatched help routes
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title : 404,
        name : 'Rajan Dhage',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title : 404,
        name : 'Rajan Dhage',
        errorMessage : 'page not found'
    })
})
app.listen(port, ()=>console.log('server is running on ' + port))