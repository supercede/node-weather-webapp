import path from "path";
import express from "express";
import hbs from 'hbs';
import geocode from './utils/geocode';
import forecast from './utils/forecast';


//Define absolute paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

const app = express();


//Setting up handlebars and customizing views path for express 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res)=>{
  res.render('index', {title: 'Weather', name: 'Supercede'});
})

app.get('/about', (req, res) =>{
  res.render('about', {title: 'About', name: 'Destiny'});
})

app.get('/help', (req, res) => {
  res.render('help', {title: 'Help',
    help: 'Need help? Ask Jesus! This page is unhelpful',
    name: 'Sam'
  });
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Please provide an address'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error){
      console.log('failled')
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, report) => {
      if(error){
        console.log('failled')
        return res.send({ error });
      }

      res.send({
        location,
        forecast: report,
        address: req.query.address
      })
    })
  })
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    name: 'Sam',
    error: 'Help Page not Found',
    title: '404: Bad Request'
  });
})

app.get('*', (req, res) => {
  res.render('error', {
    name: 'Destiny',
    error: 'Page not Found',
    title: '404: Bad Request'
  });
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
