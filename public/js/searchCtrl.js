beersBeatsApp.controller('searchCtrl', function($scope, model){

  $scope.search = function(name) {

    if(name == 'rnd'){
      $scope.status = "Looking for the perfect random beer...";
      model.RandomBeer.get({},function(data){
        $scope.beers = {data};
        $scope.status = "";
        },function(data){
          $scope.status = "There was an error";
      });
    } else {
      $scope.status = "Searching for some nice beers...";
      model.BeerByName.get({name:name},function(data){
        $scope.beers = data;
        $scope.status = "Showing " + data.length + " results";
        },function(data){
          $scope.status = "There was an error";
      });
    }
  }


  $scope.addBeer = function(beerID) {
    model.selectBeer(beerID);
  }

});
