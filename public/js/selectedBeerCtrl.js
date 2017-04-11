beersBeatsApp.controller('selectedBeerCtrl', function($scope, model, $routeParams){

	var id = $routeParams.beerId;

	model.BeerByID.get({id:id},function(data){
		console.log(data.id)
		$scope.beer = data
		if (data.isOrganic == 'Y'){
			//$scope.isOrganic = '<img img class="card-img-top img-thumbnail" ng-src="http://www.naturalcrunchy.at/wp-content/uploads/2015/01/icon_en_bio.png" src="http://www.naturalcrunchy.at/wp-content/uploads/2015/01/icon_en_bio.png"/>' //function for
			$scope.isOrganic = "https://yt3.ggpht.com/-3R9per0uGmc/AAAAAAAAAAI/AAAAAAAAAAA/kIMAoxVEko4/s100-c-k-no-mo-rj-c0xffffff/photo.jpg"
		} else{
			$scope.isOrganic = "http://www.ezeeguides.com/Anon/UserAsset/GetImage/167ee5b0-5483-443f-b9f9-27cbf50c65c5"		}
	});

	$scope.add = function(id){
		model.selectBeer(id);
	}

});
