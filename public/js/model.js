//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore){

/* STATIC VAR DECLERATIONS */

	var _this = this;

	this.selectedBeers = {};

	var playlistIDs = ['0tkRbaSwTy9lwAw66vCCIq', // British Origin Ales
										'2xqLn5C8UBdG63mmy4i8QQ', // Irish Origin Ales
										'2OfjDjNGlp8Z9uh2yNCzkb', // North American Origin Ales
										'1G4xK6ksyXGLqkf4QSSQCL', // German Origin Ales
										'1Bx9uZMuiLZ6ZT8N1fmEjp', // Belgian And French Origin Ales
										'37i9dQZEVXbMDoHDwVN2tF', // International Ale Styles
										'1uCcS1S6u16qk8JXKgfIqS', // European-germanic Lager
										'2fDLCkAiNIeQzXbdG86g9r', // North American Lager
										'3oaoPa6YMNdfx4yc05aVmt', // Other Lager
										'0jXuFjs93Tavfsy19s1lk6', // International Style
										'37i9dQZF1DX0sQWfevMRw3', // Hybrid/mixed Beer
										'6qIrNhoRraUIWhsktGP5bj', // Mead, Cider, & Perry
										'72OAW0y5ntDYCURQlCwKHl', //Other Origin
										'7ilySkaswwP6MeaboU010g' // Malternative Beverages

										];

	/* API CALLS */

//get beer by name
//INPUT: name of beer

	this.BeerByName = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81133d383189d0cda162226936b0bc2e',{},{
    get: {
			method: 'GET',
			isArray: true,
			transformResponse: function(data){
			var tmp =  angular.fromJson(data);
			for (var i = 0; i < tmp.data.length; i++ ) {
				if (tmp.data[i].labels == null){
					tmp.data[i]['labels'] = {large : 'http://pngimg.com/uploads/beer/beer_PNG2388.png'};
			  }
			}
			return tmp.data;
	  }
	}
  });

//get beer by id

//INPUT: id of beer

	this.BeerByID = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/beer/:id/?key=81133d383189d0cda162226936b0bc2e',{},{
    get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				console.log(tmp);
				if (tmp.data.labels == null){
					console.log("hej");
					tmp.data['labels'] = {	large : 'http://pngimg.com/uploads/beer/beer_PNG2388.png',
											medium : 'http://revistarumo.com.br/upload/site_explore/001%20(167).jpg',
											icon : 'http://jekyllandhydeserie.com/jekyll/wp-content/uploads/2011/10/beer-icon.png'};
			  	}

				return tmp.data;
			}
    }
  });

	//get random beer
	this.RandomBeer = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/beer/random/?key=81133d383189d0cda162226936b0bc2e',{},{
    get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				if (tmp.data.labels == null){
						tmp.data['labels'] = {large : 'http://pngimg.com/uploads/beer/beer_PNG2388.png'};
					}
				return tmp.data;
			}
    }
  });

	//get beers given a country (category)

	//get country (category) given a beer

	//INPUT: name of beer

	this.BeerCategory = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81133d383189d0cda162226936b0bc2e',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {
					category: tmp.data[0].style.categoryId,
				}
			}
		}
	});



	//get playlist given an id
	//INPUT: id of playlist
	this.PlaylistByID = $resource('https://crossorigin.me/https://api.spotify.com/v1/search/q=name::name&type=track',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {
					category: tmp,
				}
			}
		}
	});

	//@JULIAVONHEIJNE: TODO get image of a beer: Ska ligga hos controllern. Använd
	//this.beerbyID to access the whole j-son object and then get
	//the specific json object for image url.


	/* MODEL FUNCTIONS */

	//given a beer, get its country and return playlist

	//given a playlist, get its country and return list of beers

	//get playlist given country

	//get country given playlist

	//add beer object to BAG/favourites
	/*this.selectBeer = function(beer){
		var id = beer;
		this.BeerByID.get({id:id},function(data){
			_this.selectedBeers.push(data)
		});
	}*/


	this.selectBeer = function(beer){
		var id = beer;
		this.BeerByID.get({id:id},function(data){
			if (id in _this.selectedBeers) {
				_this.selectedBeers[id].value = _this.selectedBeers[id].value + 1;
			}else {
				_this.selectedBeers[id] = { value: 1, beer: data};
				
			}

		});
	}

	//remove beers to BAG/favourites
	this.deselectBeer = function(beerID){

		_this.selectedBeers[beerID].value = _this.selectedBeers[beerID].value - 1;
		if (_this.selectedBeers[beerID].value < 1) {
			delete _this.selectedBeers[beerID];
		}


	}

	//return all selected beer objects
	this.getSelectedBeers = function(){
		var beers = [];
		for (key in this.selectedBeers){
			beers.push(this.selectedBeers[key].beer);
		}
		return beers;
	}

	this.getSelectedBeersAndValue = function(){
		return this.selectedBeers;
	}

	//add playlists to favourites

	//add beer-playlist combo to playlist

	this.generatePlaylist = function(){
		var categories = {
			'1' : 0,
			'2' : 0,
			'3' : 0,
			'4' : 0,
			'5' : 0,
			'6' : 0,
			'7' : 0,
			'8' : 0,
			'9' : 0,
			'10' : 0,
			'11' : 0,
			'12' : 0,
			'13' : 0,
			'14' : 0
		};

		for (var i = 1; i < selectedBeers.length; i++) {
    		categories[selectedBeers[i].categoryId] = categories[selectedBeers[i].categoryId] + 1;
		}

		console.log(categories);
		var highestValue = -1;
		var selectedID = '';
		for (var i = 1; i < categories.length; i++) {
			if(categories[i] > highestValue){
				selectedID = i;
				highestValue = categories[i];
			}
		}
		return playlistIDs[selectedID-1];
	}


	return this;
});
