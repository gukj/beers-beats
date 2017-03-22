//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore){

	/* API CALLS */

	//get beer
	//this.Beer = $resource('http://api.brewerydb.com/v2/beer/:id/?key=81f290d3c2a50e872349732640d52269',{},{

	/*this.Beer = $resource('https://karlroos-systemet.p.mashape.com/country',{},{
    get: {
			headers: {
					'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
			},
      success: function(data) {
        cb(data);
      }
    }
  });*/

	//get beers given a country

	//get country given a beer

	//get playlist given country

	//get country given playlist


	/* MODEL */

	//given a beer, get its country and retun playlist

	//given a playlist, get its country and return list of beers

	//add beers to BAG/favourites

	//add playlists to favourites

	//add beer-playlist combo to playlist


	return this;
});
