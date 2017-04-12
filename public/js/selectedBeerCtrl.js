beersBeatsApp.controller('selectedBeerCtrl', function($scope, model, $routeParams){

	var id = $routeParams.beerId;

	model.BeerByID.get({id:id},function(data){
		$scope.beer = data
		$scope.status = "";
	},function(data){
		$scope.status = "There was an error, please try again.";
		_this.openError();
	});

	$scope.add = function(id){
		model.selectBeer(id);
	}

	//Opens error message on screen
  	_this.openError = function(){
    	angular.element('#errorModal').modal('show');
  }

});
