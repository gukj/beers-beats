beersBeatsApp.controller('beerBagCtrl', function($scope, model){

  var target = "";
  var source = "";

  var _this = this;
  $scope.empty = true;

  $scope.beerBag = model.getSelectedBeersAndValue();

  /* -- Drag-n-drop --*/
  $scope.onDrop = function(){
    if(model.isAuthenticated()){
      model.selectBeer(source);
    } else {
      _this.openError();
    }


  };

  //Opens error message on screen
  _this.openError = function(){
    angular.element('#errorModal').modal('show');
  }


  $scope.dropValidate = function(t, s) {
    target = t;
    source = s;
    return (target !== source && target == 'beerBag');
  };
  /* -- END Drag-n-drop -- */

  //Remove a beer from beerBag
  $scope.removeBeer = function(beerID) {
    model.deselectBeer(beerID);
  }


  //Removes ALL beer with id = beerID from beerBag
  $scope.deleteBeer = function(beerID) {
    model.deleteBeer(beerID);
  }

  //Returns a number of total beer amount
  $scope.counting = function() {
    if (model.countBeersinBag() == 0){
        $scope.empty = true;
      if(model.gettingBeers){
        $scope.beerBag = model.getSelectedBeersAndValue();
      }else{
      }
    }else{
      $scope.empty = false;
    }
    return model.countBeersinBag();
  }
  $scope.isLoggedIn = function(){
    if (model.isAuthenticated() == true){
      return true;
    }else{
      return false;

    }
  }

});
