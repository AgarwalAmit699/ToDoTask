var scotchTodo=angular.module('scotchTodo',[]);

function mainController($scope,$http){
	$scope.formData={};

	//while landing to the page, get all the todos and show all of them
	$http.get('/api/todos')
	     .success(function(data){
	     	$scope.todos=data;
	     	console.log(data);
	     })
	     .error(function(data){
	     	console.log('Error: '+data);
	     });

	 //while submitting the add form, send the text to the node API
	 $scope.createTodo=function(){
	 	$http.post('/api/todos',$scope.formData)
	 	     .success(function(data){
	 	     	$scope.formData={};  //clear the form so that the user will  be available to new one
	 	     	$scope.todos=data;
	 	     	console.log(data);
	 	     })
	 	     .error(function(data){
	 	     	console.log('Error: '+data);
	 	     });
	 };

	 //deleting a todo after checking it
	 $scope.deleteTodo=function(id){
	 	$http.delete('/api/todos/'+id)
	 	     .success(function(data){
	 	     	$scope.todos=data;
	 	     	console.log(data);
	 	     })
	 	     .error(function(data){
	 	     	console.log('Error: '+data);
	 	     });
	 };


}