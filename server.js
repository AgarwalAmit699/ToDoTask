//server.js main file


//set up
var express=require('express');
var app=express();
var mongoose=require('mongoose');       //mongoose is for mongodb
var database=require('./config/database');  //load the database config
var morgan=require('morgan');           //log request to the console
var bodyParser=require('body-parser');  //pull information from the HTML post
var methodOverride=require('method-override');  //simulate PUT and DELETE


//load the configuration
mongoose.connect(database.url);   //connect the mongodb database on modulus.io


app.use(express.static(__dirname+'/public'));    //set the static file location to /public in the main project
app.use(morgan('dev'));                          // log every request to the console.
app.use(bodyParser.urlencoded({'extended':'true'})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json());							//parse application/json
app.use(bodyParser.json({type:'application/vnd.api+json'})); //parse application/vnd.api+json as json
app.use(methodOverride());

//load the routes
require('./app/routes')(app);


//listen to port 5000
app.listen(process.env.PORT || 5000)
console.log("Application listening on Port 5000");