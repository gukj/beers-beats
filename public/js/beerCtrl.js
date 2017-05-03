beersBeatsApp.controller('beerCtrl', function($scope, model,  $sce){

  	var pID = model.getPlaylistID();

  	if (pID == undefined){ //If we do not have any beers selected in beerBag
    	var message = "Hey, your Beerbag is empty! You can't listen to music without ze beer!" + '<br><br> <a href="#!/search/" class="btn btn-sm btn-primary">Go and get zum beers!</a>';
    	$scope.status = $sce.trustAsHtml(message);
  	}
  	else {
  		$scope.status = ""
  	}

	$scope.beers = function(){
		return model.getSelectedBeers();
	}

	//Show more or less info-text for a beer
	$scope.toggleText = function(id){
		model.toggleBeerText(id);
	}

	//Remove a beer from beerBag
	$scope.remove = function(id){
		model.deselectBeer(id);
	}
});

