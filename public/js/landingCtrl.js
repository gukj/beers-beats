beersBeatsApp.controller('landingCtrl', function($scope, model){

    $scope.isLoggedIn = function(){
      if (model.isAuthenticated() == true){
        return true;
      }else{
        return false;
      }
    }
});
