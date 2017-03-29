beersBeatsApp.controller('selectedBeerCtrl', function($scope, model, $routeParams){

	var id = $routeParams.beerId;

	model.BeerByID.get({id:id},function(data){
		console.log(data.id)
		$scope.beer = data
		if (data.isOrganic == 'Y'){
			//$scope.isOrganic = '<img img class="card-img-top img-thumbnail" ng-src="http://www.naturalcrunchy.at/wp-content/uploads/2015/01/icon_en_bio.png" src="http://www.naturalcrunchy.at/wp-content/uploads/2015/01/icon_en_bio.png"/>' //function for 
			$scope.isOrganic = "http://www.naturalcrunchy.at/wp-content/uploads/2015/01/icon_en_bio.png"
		} else{
			$scope.isOrganic = "http://www.naturalcrunchy.at/wp-content/uploads/2015/01/icon_en_bio.png"		}
	});

	$scope.add = function(id){
		model.selectBeer(id);
	}

});
