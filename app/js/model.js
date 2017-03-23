//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore){

	/* API CALLS */

	//get beer by name
	// input name of beer
	this.BeerByName = $resource('http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81f290d3c2a50e872349732640d52269',{},{
    get: {
      success: function(data) {
        cb(data.data);
      },
      error: function(data) {
    }
    }
  });

	// get beer by ID
	//input id
	this.BeerByID = $resource('http://api.brewerydb.com/v2/beer/:id/?key=81f290d3c2a50e872349732640d52269',{},{
    get: {
      success: function(data) {
        cb(data.data);
      },
      error: function(data) {
    }
    }
  });

	//get random beer
	this.RandomBeer = $resource('http://api.brewerydb.com/v2/beer/random/?key=81f290d3c2a50e872349732640d52269',{},{
    get: {
      success: function(data) {
        cb(data.data);
      },
      error: function(data) {
    }
    }
  });

	//get beers given a country (category)

	//get country (category) given a beer
	//input name of beer
	this.BeerCategory = $resource('http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81f290d3c2a50e872349732640d52269',{},{
		get: {
			success: function(data) {
				cb(data.data[0].style.categoryId)
			},
			error: function(data) {
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
