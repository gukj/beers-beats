beersBeatsApp.controller('homeCtrl', function($scope, model){

	var name = "Carlsberg";
	model.BeerByName.get({name:name}, function(data){
		$scope.beer = data
	});

});
