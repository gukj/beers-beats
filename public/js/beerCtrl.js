beersBeatsApp.controller('beerCtrl', function($scope, model){

	//var beers = [];

	$scope.beers = function(){
		//return model.getSelectedBeers();
		var b = model.getSelectedBeers();

		beers = [];
		for(var i=0; i<b.length;i++){
			b[i]['hidden'] = true;
			b[i]['maxTextLength'] = 400;
			b[i]['infoText'] = "... View more";
			beers.push(b[i]);
		}
		console.log(beers);

		return beers;
	}

	$scope.toggleText = function(id){
		console.log('toggle');
		console.log($scope.beers); //en funktion

		var beersList = $scope.beers();
		//lösa tankar
		for(var i=0; i< beers.length; i++){
			console.log(beers[i].id);
			console.log(beers[i]['hidden']);
			console.log(beers[i].hidden);
			if(beers[i].id === id){
				if(beers[i]['hidden'] === true){
					beers[i]['hidden'] = false;
					beers[i]['maxTextLength'] = 1000;
					beers[i]['infoText'] = "Show less";
				} else {
					beers[i]['hidden'] = true;
					beers[i]['maxTextLength'] = 400;
					beers[i]['infoText'] = "... View more";
				}
			}
			//set $scope.beers to beersList
		}
	}



	$scope.remove = function(id){
		model.deselectBeer(id);
	}
});
