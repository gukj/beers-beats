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

});
