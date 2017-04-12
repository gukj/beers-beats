beersBeatsApp.controller('spotifyPlaylistCtrl', function($scope, model, $sce){

  var creator = model.getCreatorID();
  var pID = model.getPlaylistID();

  if (pID == undefined){
    $scope.spotifyModule = "";
    var message = "Your beer bag is empty! You can't listen to music without beers!" + '<br> <a href="#!/search/" class="btn btn-sm btn-primary">Go and fins some beers!</a>';
    $scope.status = $sce.trustAsHtml(message);
  //  _this.openError();
  } else {
    $scope.status = 'Here is your generated beerified playlist, only for you! Enjoy!';
    var spotifyURL = '<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3A' + creator + '%3Aplaylist%3A' + pID + '&theme=white" width="1000" height="550" frameborder="0" allowtransparency="true"></iframe>';
    $scope.spotifyModule = $sce.trustAsHtml(spotifyURL);
  }





});
