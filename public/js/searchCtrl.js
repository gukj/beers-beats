beersBeatsApp.controller('searchCtrl', function($scope, model){


  $scope.search = function(name) {
  $scope.status = "Searching...";
  model.BeerByName.get({name:name},function(data){
    $scope.beers = data;
    $scope.status = "Showing " + data.length + " results";
    },function(data){
      $scope.status = "There was an error";
    });
  }

  $scope.searchRandom = function() {
  $scope.status = "Searching...";
  model.RandomBeer.get({},function(data){
    $scope.randomBeer = data;
    $scope.status = "";
    },function(data){
      $scope.status = "There was an error";
    });
  }

  $scope.addBeer = function(beerID) {
    model.selectBeer(beerID);
  }

});
