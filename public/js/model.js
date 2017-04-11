//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore, $routeParams){

  // COOKIE CHECKS
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }
    var localBeerBag = localStorage.getObj('localBeerBag');
    if (localBeerBag === null) {
        localBeerBag = [];
        localStorage.setObj('localBeerBag', localBeerBag);
    }
	// END: COOKIE CHECKS

/* STATIC VAR DECLERATIONS */

//Saves token for specific session. When token runs out, you have to login again to continuous use.
	if ($routeParams.access_token){
		var access_token = $routeParams.access_token;
	}else{
		//TODO: infobox that user is unauthorized
		console.log("Unauthorized user, session has ended");
	}

	var _this = this;

	this.selectedBeers = {}; //current selected beers

	this.selectedPlaylist = {}; //locally stored playlists for fast access

	this.pID = ''; //id of current "to display" playlist

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

	this.playlistCreators = ['jonatanvif', 						// British Origin Ales
										'1127605864', 			// Irish Origin Ales
										'architectsukband', 	// North American Origin Ales
										'1116790879', 			  // German Origin Ales
										'21gb7d2s5vhcbaroos64ybmlq', // Belgian And French Origin Ales
										'spotify', 				// International Ale Styles
										'1176140580', 			// European-germanic Lager
										'1230087443', 			// North American Lager
										'topsify', // Other Lager
										'spotify', // International Style
										'22et2if7b2a5famxbcw5pfwfy', // Hybrid/mixed Beer
										'sonymusicnl', // Mead, Cider, & Perry
										'spotify_uk_', //Other Origin
										'spotify' // Malternative Beverages];
										];

	/* API CALLS */

//get beer object by name
//INPUT: name of beer
	this.BeerByName = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/search?q=:name&type=beer&key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			method: 'GET',
			isArray: true,
			transformResponse: function(data){
			var tmp =  angular.fromJson(data);
			for (var i = 0; i < tmp.data.length; i++ ) {
				if (tmp.data[i].labels == null){
					tmp.data[i]['labels'] = {	large : '../img/logo.svg',
												medium : 'http://revistarumo.com.br/upload/site_explore/001%20(167).jpg',
												icon : 'http://jekyllandhydeserie.com/jekyll/wp-content/uploads/2011/10/beer-icon.png'};
			  }
			}
			return tmp.data;
	  }
	}
  });

//get beer object by id
//INPUT: id of beer
	this.BeerByID = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/beer/:id/?key=81f290d3c2a50e872349732640d52269',{},{
	    get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);

				try{
					  if (tmp.data.labels == null){
					  tmp.data['labels'] = {	large : '../img/logo.svg',
											medium : 'http://revistarumo.com.br/upload/site_explore/001%20(167).jpg',
											icon : 'http://jekyllandhydeserie.com/jekyll/wp-content/uploads/2011/10/beer-icon.png'};
			        }
				if (tmp.data.isOrganic == 'Y'){
					  tmp.data.isOrganic = {Organic : 'This is an organic beer',
																Url : "https://yt3.ggpht.com/-3R9per0uGmc/AAAAAAAAAAI/AAAAAAAAAAA/kIMAoxVEko4/s100-c-k-no-mo-rj-c0xffffff/photo.jpg"};
				} else {
					tmp.data.isOrganic = {Organic : 'This is not an organic beer',
																Url : "http://www.ezeeguides.com/Anon/UserAsset/GetImage/167ee5b0-5483-443f-b9f9-27cbf50c65c5"};
				}
				if (tmp.data.style == undefined){
					tmp.data['style'] = {'description' : "No information to show...",
					category : {'name' : "This beer has no category"}};
				}
				return tmp.data;
				}catch(err){
					console.log('There was an request error, please try again');
				}
    	}
    }
  });

	//get random beer
	this.RandomBeer = $resource('https://crossorigin.me/http://api.brewerydb.com/v2/beer/random/?key=81f290d3c2a50e872349732640d52269',{},{
    get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				try{
					if (tmp.data.labels == null){
						tmp.data['labels'] = {	large : '../img/logo.svg',
												medium : 'http://revistarumo.com.br/upload/site_explore/001%20(167).jpg',
												icon : 'http://jekyllandhydeserie.com/jekyll/wp-content/uploads/2011/10/beer-icon.png'};
				  	}
					return tmp.data;
				}catch(err){
				console.log('There was an request error, please try again');
			}
    }
}
  });

	//get beer categoryId from a certain beer by name
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
			headers: {'Authorization': 'Bearer ' + access_token },
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				//if there is no profile pic to show
				if (!tmp.images){
					tmp.images.push({ url: '../img/logo.svg'});
				}
				return tmp;
			}
		}
	});


	/* MODEL FUNCTIONS BEER */

	//TODO: add beer object to favourites

	//TODO: add playlists to favourites

	//TODO: add beer-playlist combo to favourites

	this.selectBeer = function(beer, fromCookie) {
        // Add beer to localStorage
        var thisFromCookie = (typeof fromCookie === 'undefined') ? false : fromCookie;
        if (!thisFromCookie) {
            localBeerBag.push(beer);
            localStorage.setObj('localBeerBag', localBeerBag);
			console.log(localBeerBag);
        }
        // END: Add beer to localStorage
        var id = beer;
        this.BeerByID.get({
            id: id
        }, function(data) {
            if (id in _this.selectedBeers) {
                _this.selectedBeers[id].value = _this.selectedBeers[id].value + 1;
            } else {
                _this.selectedBeers[id] = {
                    value: 1,
                    beer: data
                };

                //prep for toggle of text
                if (_this.selectedBeers[id]['beer']['style'] != undefined) {
                    _this.selectedBeers[id]['beer']['textExists'] = true;
                    _this.selectedBeers[id]['beer']['hidden'] = true;
                    _this.selectedBeers[id]['beer']['maxTextLength'] = 410;
                    _this.selectedBeers[id]['beer']['infoText'] = "... View more";
                } else {
                    _this.selectedBeers[id]['beer']['textExists'] = false;
                    _this.selectedBeers[id]['beer']['hidden'] = true;
                    _this.selectedBeers[id]['beer']['maxTextLength'] = 0;
                    _this.selectedBeers[id]['beer']['infoText'] = "";
                }

            }
            _this.generatePlaylist();
        });

    }

	//Removes one beer from beerbag
	//INPUT: beerid
	this.deselectBeer = function(beerID){
		//console.log('id', beerID);

    // Remove beer from localStorage
    var localBeerBagIndex = localBeerBag.indexOf(beerID);
    if (localBeerBagIndex > -1) {
        localBeerBag.splice(localBeerBagIndex, 1);
    }
    localStorage.setObj('localBeerBag', localBeerBag)
    // END: Remove beer from localStorage

    //If we have several of one beer, we must decrement the amount
    _this.selectedBeers[beerID].value = _this.selectedBeers[beerID].value - 1;

    //If there was only one beer of this type, we remove it from the beer bag
    if (_this.selectedBeers[beerID].value < 1) {

          //Remove the playlist generated by this beer
          _this.deselectPlaylist(beerID);

          //Remove the beer
          delete _this.selectedBeers[beerID]; //this returns true
        }

        //reset the correct beer id property of the remaining beers
        for (key in _this.selectedBeers) {
            _this.selectedBeers[key]['beer']['id'] = key;
        }
        _this.generatePlaylist();
    }

	//Return all selected beer objects
	this.getSelectedBeers = function(){
		var beers = [];
		for (key in _this.selectedBeers){
			beers.push(_this.selectedBeers[key].beer);
		}
		return beers;
	}

	//Toggles the text display of a beer object
	this.toggleBeerText = function(beerID){
		//find object in this.selectedBeers
		//console.log('toggle object', _this.selectedBeers[beerID])
		if ( _this.selectedBeers[beerID]['beer']['textExists'] == true) {
			//console.log('first if');

			//change attributes
			if(_this.selectedBeers[beerID]['beer']['hidden'] == true){
				//console.log('if');
				_this.selectedBeers[beerID]['beer']['hidden'] = false;
				_this.selectedBeers[beerID]['beer']['maxTextLength'] = 1000;
				_this.selectedBeers[beerID]['beer']['infoText'] = "Show less";
			} else {
				//console.log('else');
				_this.selectedBeers[beerID]['beer']['hidden'] = true;
				_this.selectedBeers[beerID]['beer']['maxTextLength'] = 410;
				_this.selectedBeers[beerID]['beer']['infoText'] = "... View more";
			}
		}
		//console.log('after toggle', _this.selectedBeers[beerID]);
	}

	this.getSelectedBeersAndValue = function(){
		return this.selectedBeers;
	}

	/* MODEL FUNCTIONS PLAYLISTS */

	//returns the list "PlaylistIds" to prepare api call for generatePlaylist
	this.getPlaylistIds = function(){
		return this.playlistIDs;
	}

	//returns the list "PlaylistCreators" to prepare api call for generatePLaylist
	this.getPlaylistCreators = function(){
		return this.playlistCreators;
	}

	//Algorithm that counts category occurances of the beers in beerbags and maps it to playlists
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

		beerList = this.getSelectedBeersAndValue();

		if (this.isNotEmpty(_this.selectedBeers)){
			for (key in beerList) {
				try{
					categories[beerList[key].beer.style.categoryId] = categories[beerList[key].beer.style.categoryId] + beerList[key].value;
				}catch(err){
					//console.log('exception: ',err);
					//Handles the case where style.categoriId is not available for specific beer
					categories[14] = categories[14] + beerList[key].value;
				}
			}

			var highestValue = -1;
			var selectedID = 0;

			for (var key in categories) { //algorithm to see what category has the highest ocourance in beerbag
				if(categories[key] > highestValue){
					selectedID = key;
					highestValue = categories[key];
				}
			}
			//console.log("HighestValue " + highestValue);
			//console.log("Selected id: " + selectedID);

			var playlist = this.getPlaylistIds();
			var creators = this.getPlaylistCreators();

			var p = playlist[selectedID-1];
			var c = creators[selectedID-1];

			this.selectPlaylist(p,c);

		} else{
			//console.log("generatePlaylist: BeerList is empty, refreshing playlist");
			_this.pID = '';
		}
	}

	//Adds a playlist to list selectedPlaylist
	//Input: playlist id, creator id
	this.selectPlaylist = function(playlistID, creator){
		//console.log(" playlist id: " + playlistID);
		//console.log(" _this.pid: " + _this.pID);
		var p = playlistID
		var username = creator;

		if (playlistID === _this.pID ) {
			//already selected
			//console.log("Playlist already selected");
		}else {
			this.PlaylistByCreatorAndID.get({username:username, id:p},function(data){
				_this.selectedPlaylist[p] = {creator: username, playlist: data}; //save playlist data in dictionary
				_this.pID = p; //selected playlist ID
				//console.log("selected pID: " + p);
			});
		}
	}

	//Returns the current playlist data
	this.getCurrentPlaylist = function(){
		var key = _this.pID;
		if (key in _this.selectedPlaylist){
			return _this.selectedPlaylist[key].playlist;
		} else{
			return null;
		}
	}

	//Removes playlist from list selectedPlaylist
	//Input: beer id
	this.deselectPlaylist = function(beer){

		var beerList = this.getSelectedBeers();
		for (var i = 0; i < beerList.length; i++){
			if (beerList[i].id = beer && beerList[i].style != undefined){
				var selectedID = beerList[i].style.categoryId;
			}
		}

		var playlist = this.getPlaylistIds();
		var playlistID = playlist[selectedID-1];
		delete _this.selectedPlaylist[playlistID];
	}

	//For checking if object is empty, used in generatePlaylist
	this.isNotEmpty = function(ob){
		for(var i in ob){
			return true;}
		return false;
	}

  // Set beers from cookie
    if (localBeerBag !== null) {
        for (var i = 0; i < localBeerBag.length; i++) {
            _this.selectBeer(localBeerBag[i], true);
        }
    }
	// END: Set beers from cookie

return this;

});
