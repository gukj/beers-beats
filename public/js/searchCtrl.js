beersBeatsApp.controller('searchCtrl', function($scope, model){

  var _this = this;
  _this.cModal = false;


  //Gets the data from API request
  $scope.search = function(name) {
    $scope.results = "";
    _this.cModal = false;
    //If you search for a random beer, the name == rnd from scope
    if(name == 'rnd'){
      $scope.status = "Searching for the perfect random beer...";
      _this.openModal();
      model.RandomBeer.get({},function(data){
        if (_this.cModal == false){
          $scope.beers = {data};
          _this.closeModal();
        }
        },function(data){
          $scope.status = "There was an error";
      });
    } else {
      $scope.status = "Searching for some nice beers...";
      _this.openModal();
      model.BeerByName.get({name:name},function(data){
        if (_this.cModal == false) {
          $scope.beers = data;
          $scope.results = "Showing " + data.length + " results";
          _this.closeModal();
        }
        },function(data){
          $scope.status = "There was an error";
      });
    }
  }

  //Adds beer to beer bag in model
  $scope.addBeer = function(beerID) {
    model.selectBeer(beerID);
  }

  //Spans the modal
  this.openModal = function(message){
    $scope.checked=true;
  }

  //Closes the modal
  this.closeModal = function() {
    angular.element('.modal').triggerHandler('click');
    //$scope.checked=false;
  }

  //Sets CModal to true, which stops the data from the API request not being printed out
  $scope.cancelAPICall = function(){
    _this.cModal = true;
  }



});
