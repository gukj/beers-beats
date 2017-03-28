beersBeatsApp.controller('beerCtrl', function($scope, model){
	$scope.beers = [];

	/*function(){
		//return model.getSelectedBeers();
		var b = model.getSelectedBeers();
		console.log(b);
		return b;
	}*/


	$scope.mockBeerFromPostman = {
	    "id": "8KtwAN",
	    "name": "Rosalita",
	    "nameDisplay": "Rosalita",
	    "abv": "4.5",
	    "ibu": "28",
	    "styleId": 75,
	    "isOrganic": "N",
	    "status": "verified",
	    "statusDisplay": "Verified",
	    "createDate": "2014-04-01 18:00:48",
	    "updateDate": "2015-06-12 14:54:07",
	    "style": {
	      "id": 75,
	      "categoryId": 7,
	      "category": {
	        "id": 7,
	        "name": "European-germanic Lager",
	        "createDate": "2012-03-21 20:06:46"
	      },
	      "name": "German-Style Pilsener",
	      "shortName": "German Pilsener",
	      "description": "A classic German Pilsener is very light straw or golden in color and well hopped. Perception of hop bitterness is medium to high. Noble-type hop aroma and flavor are moderate and quite obvious. It is a well-attenuated, medium-light bodied beer, but a malty residual sweetness can be perceived in aroma and flavor. Very low levels of sweet corn-like dimethylsulfide (DMS) character are below most beer drinkers' taste thresholds and are usually not detectable except to the trained or sensitive palate. Other fermentation or hop related sulfur compounds, when perceived at low levels, may be characteristic of this style. Fruity esters and diacetyl should not be perceived. There should be no chill haze. Its head should be dense and rich.",
	      "ibuMin": "25",
	      "ibuMax": "40",
	      "abvMin": "4",
	      "abvMax": "5",
	      "srmMin": "3",
	      "srmMax": "4",
	      "ogMin": "1.044",
	      "fgMin": "1.006",
	      "fgMax": "1.012",
	      "createDate": "2012-03-21 20:06:46",
	      "updateDate": "2015-04-07 15:35:59"
	    }
	  };

	  $scope.beers.push($scope.mockBeerFromPostman);
	  $scope.beers.push($scope.mockBeerFromPostman);


	//TODO get images
});
