beersBeatsApp.controller('beerCtrl', function($scope, model){

	$scope.beers = function(){
		return model.getSelectedBeers();
	}

	$scope.toggleText = function(id){
		console.log('toggle id', id);
		model.toggleBeerText(id);
	}

	$scope.remove = function(id){
		console.log('model id', id);
		model.deselectBeer(id);
	}
});

