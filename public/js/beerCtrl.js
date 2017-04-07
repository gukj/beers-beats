beersBeatsApp.controller('beerCtrl', function($scope, model){

	//var beers = [];

	$scope.tmp = null;

	$scope.beers = function(list){


		if(list == null){
			// men vad hänfder när selectedbeers uppdateras från enn annan vy?
			// då kaosar det
			var b = model.getSelectedBeers();

			beers = [];
			for(var i=0; i<b.length;i++){

				if( b[i]['style'] != undefined){
					b[i]['textExists'] = true;
					b[i]['hidden'] = true;
					b[i]['maxTextLength'] = 410;
					b[i]['infoText'] = "... View more";
				} else {
					b[i]['textExists'] = false;
					b[i]['hidden'] = true;
					b[i]['maxTextLength'] = 0;
					b[i]['infoText'] = "";
				}
				beers.push(b[i]);
			}
			console.log(beers);
			return beers;
		} else {
			return list;
		}
	}

	$scope.toggleText = function(id){
		console.log('toggle');
		//console.log($scope.beers); //en funktion

		//get beers from model
		var beersList = $scope.beers($scope.tmp);
		
		//toggle attributes
		for(var i=0; i< beers.length; i++){
			console.log(beers[i].id);
			console.log(beers[i]['hidden']);
			console.log(beers[i].hidden);
			if(beers[i].id === id && beers[i]['textExists'] === true){
				if(beers[i]['hidden'] === true){
					beers[i]['hidden'] = false;
					beers[i]['maxTextLength'] = 1000;
					beers[i]['infoText'] = "Show less";
				} else {
					beers[i]['hidden'] = true;
					beers[i]['maxTextLength'] = 410;
					beers[i]['infoText'] = "... View more";
				}
			}

			//set $scope.beers to beersList
			$scope.tmp = beers;
		}
	}


	$scope.remove = function(id){

		//Det här med att ändra attribut etc ska ju göras i model!!!

		//TODO
		//flytta över till nya branchen
		//ändra i model
		//Splice the beers list
		if($scope.tmp != null){
			console.log('item to remove', id);
			console.log('list before',list);
			var list = $scope.tmp;
			var index;
			for(var i=0; i<list.length; i++){
				if(list[i].id === id){
					index = i;
				}
			}
			list.splice(index, 1);
			console.log('list after',list);
			$scope.tmp = list;
		}
		
		model.deselectBeer(id);
	}
});
