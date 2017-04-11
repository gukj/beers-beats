beersBeatsApp.controller('selectedBeerCtrl', function($scope, model, $routeParams){

	var id = $routeParams.beerId;

	model.BeerByID.get({id:id},function(data){
		$scope.beer = data
	});

	$scope.add = function(id){
		model.selectBeer(id);
	}

});
