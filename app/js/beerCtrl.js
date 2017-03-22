beersBeatsApp.controller('beerCtrl', function($scope, model){

  fungerar ej
    model.Beer.get({},function(data){
    console.log(data);
    $scope.beer = data;

    $scope.status = "Showing " + data + " results";
  		},function(data){
    		$scope.status = "There was an error";
  		});
});
