//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore){

/* STATIC VAR DECLERATIONS */

	var _this = this;

	var selectedBeers = [];

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
	this.BeerByName = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			method: 'GET',
			isArray: true,
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				console.log(tmp.data);
				return tmp.data ;
			}
	  }
  });

//get beer by id
//INPUT: id of beer
	this.BeerByID = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/beer/:id/?key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return tmp.data ;
			}
    }
  });

	//get random beer
	this.RandomBeer = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/beer/random/?key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				console.log(tmp);
				return tmp.data;
			}
    }
  });

	//get beers given a country (category)

	//get country (category) given a beer
	//INPUT: name of beer
	this.BeerCategory = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81f290d3c2a50e872349732640d52269',{},{
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
	this.selectBeer = function(beer){
		selectedBeers.push(beer);
	}

	//remove beers to BAG/favourites
	this.deselectBeer = function(beerID){
		for (var i=0; i<selectedBeers.length; i++){
			if(selectedBeers[i].id === beerID){
				selectedBeers.splice(i,1);
				return;
			}
		}
	}

	//return all selected beer objects
	this.getSelectedBeers = function(){
		return selectedBeers;
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
