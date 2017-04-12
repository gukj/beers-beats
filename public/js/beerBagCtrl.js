beersBeatsApp.controller('beerBagCtrl', function($scope, model){

  var target = "";
  var source = "";
  $scope.beerBag = model.getSelectedBeersAndValue();

  $scope.onDrop = function(){
    console.log("dropped " + source + " on " + target);
    model.selectBeer(source);

  };

  $scope.dropValidate = function(t, s) {
    target = t;
    source = s;
    return (target !== source && target == 'beerBag');
  };

  $scope.removeBeer = function(beerID) {
    model.deselectBeer(beerID);
  }

  $scope.deleteBeer = function(beerID) {
    model.deleteBeer(beerID);
  }

  $scope.counting = function() {
    return model.countBeersinBag();
  }

  $scope.hideMe = function() {

    return model.countBeersinBag() < 0;

  }
 

});