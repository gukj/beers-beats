beersBeatsApp.controller('searchCtrl', function($scope, model){

  var _this = this;

  $scope.search = function(name) {

    if(name == 'rnd'){
      $scope.status = "Looking for the perfect random beer...";
      _this.openModal();
      model.RandomBeer.get({},function(data){
        $scope.beers = {data};
        $scope.status = "";
        _this.closeModal();
        },function(data){
          $scope.status = "There was an error";
      });
    } else {
      $scope.status = "Searching for some nice beers...";
      _this.openModal();
      model.BeerByName.get({name:name},function(data){
        $scope.beers = data;
        $scope.status = "Showing " + data.length + " results";
        _this.closeModal();
        },function(data){
          $scope.status = "There was an error";
      });
    }
  }

  $scope.addBeer = function(beerID) {
    model.selectBeer(beerID);
  }


  this.openModal = function(message){
    $scope.checked=true;
  }

  this.closeModal = function() {
    angular.element('.modal').triggerHandler('click');
    //$scope.checked=false;
};

  $scope.cancelAPICall = function(){
    console.log("...");
  }



});
