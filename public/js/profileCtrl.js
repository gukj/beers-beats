beersBeatsApp.controller('profileCtrl', function($scope, model){

  this.getProfile = model.userProfile.get({},function(data){
    $scope.profile = data;
    console.log(data);
  });

  this.getProfile;

});
