console.log("hello from app.js");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var path = require('path');
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/pets";
var MongoDB = mongoose.connect(mongoURI).connection;
var Pet = require ('../models/petCreate');

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connected');
});

// --------------------------------------------------------

// Home
app.get('/',function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ));
});

// --------------------------------------------------------

app.post('/add', function( req, res ){
var newAnimal = new Pet ({
  pet_name: req.body.name,
  pet_type: req.body.type,
  pet_age: req.body.age,
  pet_image: req.body.image
  });
  newAnimal.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('pet saved');
      res.sendStatus(200);
    }
  });
});

// --------------------------------------------------------
// App.get to display on DOM
app.get('/getPets', function( req, res){
  console.log("in app.get");
  Pet.find().then(function(data){ // Finding all the pets in DB
    res.send(data);
  }); // End of find function
}); // End of app.get

// Spinning up the server
app.listen( 3000, 'localhost', function( req, res ){
  console.log( "lisening on port 3000" );
});

// --------------------------------------------------------
// Setting up static folder
app.use( express.static( 'public' ) );
