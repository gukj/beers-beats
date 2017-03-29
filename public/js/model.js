//Get data from spoitfy and beer API respectively

beersBeatsApp.factory('model', function($resource, $cookieStore){

	var _this = this;

	var selectedBeers = [];

	/* API CALLS */

//get beer by name
//input name of beer
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
//input id of beer
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
	//input name of beer
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


	//@JULIAVONHEIJNE: TODO get image of a beer: Ska ligga hos controllern. Använd 
	//this.beerbyID to access the whole j-son object and then get 
	//the specific json object for image url.


	/* MODEL */

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


	return this;
});
