beersBeatsApp.controller('beerBagCtrl', function($scope, model){
  
  $scope.beerBag = model.getSelectedBeers();

  $scope.onDrop = function(target, source){
    console.log("dropped " + source + " on " + target);
    model.selectBeer(source);

  };

  $scope.dropValidate = function(target, source) {
    return (target !== source && target == 'beerBag');
  };

});