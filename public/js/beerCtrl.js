beersBeatsApp.controller('beerCtrl', function($scope, model){

	//MOCK OBJECTS
	var beer = model.RandomBeer.get();
	model.selectBeer(beer);

	beer = model.RandomBeer.get();
	model.selectBeer(beer);

	beer = model.RandomBeer.get();
	model.selectBeer(beer);


	$scope.beers = function(){
		//return model.getSelectedBeers();
		var b = model.getSelectedBeers();
		console.log(b);
		return b;
	}

	$scope.remove = function(id){
		model.deselectBeer(id);
	}
});
