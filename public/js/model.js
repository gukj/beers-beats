//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore, $routeParams){

/* STATIC VAR DECLERATIONS */

//saves the token for specific session. When token runs out, you have to login again.
	if ($routeParams.access_token){
		var access_token = $routeParams.access_token;
		//console.log($routeParams.access_token);
	}else{
		//some function that shows that the user is unauthorized?
		//ful popupwindow som varnar om att session is ended
		console.log("unauthorized user, session has ended");
	}

	var _this = this;

	this.selectedBeers = {};

	//can randomizas mer
	this.playlistIDs = ['6S9xIadSkBAUP5wpOaArZc', // British Origin Ales
										'2xqLn5C8UBdG63mmy4i8QQ', // Irish Origin Ales
										'2OfjDjNGlp8Z9uh2yNCzkb', // North American Origin Ales
										'0gIlrzIjnplGVqfIgpf2gH', // German Origin Ales
										'24b3plyJb0ytgVrLj9tgyt', // Belgian And French Origin Ales
										'4hOKQuZbraPDIfaGbM3lKI', // International Ale Styles
										'2s90Epp4VfI6yEfOLnAYRZ', // European-germanic Lager
										'6YhlAoszFStMn95e3tQ6Po', // North American Lager
										'1uBI8icgYcUED3T1W1X6dB', // Other Lager
										'73boXMJz9iBoXxQVFZ94r5', // International Style
										'0VOBa4Bq4kMWBQzG9h6xhU', // Hybrid/mixed Beer
										'71Kj902riugEIPNRVsYZ4c', // Mead, Cider, & Perry
										'33yjWFG5onxZu3HdIzO1Zu', //Other Origin
										'5bMgwxIN2fNPSn3jjvRfE8' // Malternative Beverages
										];

	this.playlistCreators = ['jonatanvif', 	// British Origin Ales
										'1127605864', 			// Irish Origin Ales
										'architectsukband', 	// North American Origin Ales
										'1116790879', 			  // German Origin Ales
										'21gb7d2s5vhcbaroos64ybmlq', // Belgian And French Origin Ales
										'spotify', 				// International Ale Styles
										'1176140580', 			  // European-germanic Lager
										'1230087443', // North American Lager
										'topsify', // Other Lager
										'spotify', // International Style
										'22et2if7b2a5famxbcw5pfwfy', // Hybrid/mixed Beer
										'sonymusicnl', // Mead, Cider, & Perry
										'spotify_uk_', //Other Origin
										'spotify' // Malternative Beverages];
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
					tmp.data[i]['labels'] = {	large : 'http://pngimg.com/uploads/beer/beer_PNG2388.png',
																	medium : 'http://revistarumo.com.br/upload/site_explore/001%20(167).jpg',
																	icon : 'http://jekyllandhydeserie.com/jekyll/wp-content/uploads/2011/10/beer-icon.png'};
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


	//---SPOTIFY API

	//console.log($routeParams.access_token);
	//get playlist given an id
	//INPUT: username of creator
	//		 id of playlist
	//RETURNS: whole playlist object
	this.PlaylistByCreatorAndID = $resource('https://api.spotify.com/v1/users/:username/playlists/:id',{},{
		get: {
			headers: {'Authorization': 'Bearer ' + access_token },
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {
					playlist: tmp
				}
			}
		}
	});

	//INPUT: name of playlist
	this.PlaylistsByName = $resource('https://api.spotify.com/v1/search?q=:name&type=playlist',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {
					playlists: tmp.playlists.items[0].id,
				}
			}
		}
	});

	//INPUT
	this.AlbumsByName = $resource('https://api.spotify.com/v1/search?q=name:abacab&type=album',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {
					tmp,
				}
			}
		}
	});

	//INPUT
	this.ArtistsByName = $resource('https://api.spotify.com/v1/search?q=tania%20bowra&type=artist',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {
					artist : tmp.artists.items,
				}
			}
		}
	});

	//INPUT
	this.TracksByName = $resource('https://api.spotify.com/v1/search?q=name:abacab&type=track',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {
					tmp,
				}
			}
		}
	});


	this.userProfile = $resource('https://api.spotify.com/v1/me',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return tmp;
			}
		}
	});


	/* MODEL FUNCTIONS */

	//given a beer, get its country and return playlist

	//given a playlist, get its country and return list of beers

	//get playlist given country

	//get country given playlist

	//add beer object to BAG/favourites

	this.getuserProfile = function() {
		_this.userProfile.get({},function(data){
			return data;
		});
	}

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

		for (var i = 1; i < this.selectedBeers.length; i++) {
    		categories[this.selectedBeers[i].categoryId] = categories[this.selectedBeers[i].categoryId] + 1;
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
		console.log(this.playlistIDs[selectedID-1]);
		console.log(this.playlistCreators[selectedID-1]);
		return this.playlistIDs[selectedID-1] + " " + this.playlistCreators[selectedID-1]; //måste returna playlist creator
	}


	return this;
});
