//server.js main file


//set up
var express=require('express');
var app=express();
var mongoose=require('mongoose');       //mongoose is for mongodb
var morgan=require('morgan');           //log request to the console
var bodyParser=require('body-parser');  //pull information from the HTML post
var methodOverride=require('method-override');  //simulate PUT and DELETE

//configuration

mongoose.connect('mongodb://admin:admin@ds029824.mlab.com:29824/todolist');  //mlab connection parameter

app.use(express.static(__dirname+'/public'));    //set the static file location to /public in the main project
app.use(morgan('dev'));                          // log every request to the console.
app.use(bodyParser.urlencoded({'extended':'true'})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json());							//parse application/json
app.use(bodyParser.json({type:'application/vnd.api+json'})); //parse application/vnd.api+json as json
app.use(methodOverride());

//define model
var Todo=mongoose.model('Todo',{
	text:String
});

//routes
//api

//get all todos
app.get('/api/todos',function(req,res){

	//use mongoose to get all the todos from the database
	Todo.find(function(err,todos){
		//if err is there send the error nothing will execute after the res.send(err)
		if (err) {res.send(err)};

		res.json(todos);  //return all the todos in json format
	});
});

//create all the todos and send back all the todos to the database
app.post('/api/todos',function(req,res){

	//create a todo,information comes from AJAX request from Angular

	Todo.create({
		text:req.body.text,
		done:false
	},function(err,todo){
		if(err)
		{
			res.send(err);
		}

		//get and return all the todos after you create another
		Todo.find(function(err,todos){
			if(err){
				res.send(err);
			}

			res.json(todos);
		});
	});
});

//delete the todo
app.delete('/api/todos/:todo_id',function(req,res){
	Todo.remove({
		_id:req.params.todo_id
	},function(err,todo){
		if(err){
			res.send(err);
		}

//get and return all the todos after you delete one
      
      Todo.find(function(err,todos){
      	if(err){  res.send(err);}
      	res.json(todos);
      });
	});
});


//application i.e. html page

app.get('*',function(req,res){
	res.sendfile('./public/index.html');    //load the single view file (angular will handle the page changes on the front)
});

//listen to port 5000
	app.listen(process.env.PORT || 5000)
console.log("Application listening on Port 5000");