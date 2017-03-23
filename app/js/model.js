//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore){

	var _this = this;

	/* API CALLS */

	//get beer by name
	// input name of bee
	/* In ctrl:
	var name = blabla;
	model.BeerByName.get({name:name},function(data){
	$scope.beer = data.data;
	$scope.status = "Showing " + data + " results";
		},function(data){
			$scope.status = "There was an error";
	});
	*/


	this.BeerByName = $resource('http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			headers: {},
      success: function(data) {
        cb(data);
      }
    }
  });

	// get beer by ID
	//input id
	/* In ctrl:
	var name = blabla;
	model.BeerByID.get({name:name},function(data){
	$scope.beer = data.data;
	$scope.status = "Showing " + data + " results";
		},function(data){
			$scope.status = "There was an error";
	});
	*/


	this.BeerByID = $resource('http://api.brewerydb.com/v2/beer/:id/?key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			headers: {},
      success: function(data) {
        cb(data);
      },
      error: function(data) {
				cb('error');
    }
    }
  });

	//get random beer

	/* In ctrl:
	var name = blabla;
	model.RandomBeer.get({name:name},function(data){
	$scope.beer = data.data;
	$scope.status = "Showing " + data + " results";
		},function(data){
			$scope.status = "There was an error";
	});
	*/


	this.RandomBeer = $resource('http://api.brewerydb.com/v2/beer/random/?key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			headers: {},
      success: function(data) {
        cb(data.data);
      },
      error: function(data) {
				cb('error');
    }
    }
  });

	//get beers given a country (category)

	//get country (category) given a beer
	//input name of beer

	/* In ctrl:
	var name = blabla;
	model.BeerCategory.get({name:name},function(data){
	$scope.beer = data.data[0].style.categoryId;
	$scope.status = "Showing " + data + " results";
		},function(data){
			$scope.status = "There was an error";
	});
	*/
	this.BeerCategory = $resource('http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81f290d3c2a50e872349732640d52269',{},{
		get: {
			headers: {},
			success: function(data) {
				cb(data.data[0].style.categoryId)
			},
			error: function(data) {
				cb('error');
		}
		}
	});


	//get playlist given country

	//get country given playlist


	/* MODEL */

	//given a beer, get its country and return playlist

	//given a playlist, get its country and return list of beers

	//add beers to BAG/favourites

	//add playlists to favourites

	//add beer-playlist combo to playlist


	return this;
});
