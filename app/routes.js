//load all the routes

var Todo=require('./models/todo');

//expose the routes to our app with module.exports
module.exports=function(app){

//api
//get all the todos

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

};