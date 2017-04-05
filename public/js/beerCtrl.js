beersBeatsApp.controller('beerCtrl', function($scope, model){

	//MOCK OBJECTS
	/*
	var beer = model.RandomBeer.get();
	model.selectBeer(beer);

	beer = model.RandomBeer.get();
	model.selectBeer(beer);

	beer = model.RandomBeer.get();
	model.selectBeer(beer);*/

	$scope.beers = function(){
		//return model.getSelectedBeers();
		var beers = model.getSelectedBeers();
        if (beers.length > 0) {
			return beers;
		}
	}

	$scope.remove = function(id){
		model.deselectBeer(id);
	}


});
