beersBeatsApp.controller('spotifyPlaylistCtrl', function($scope, model, $sce){

  var creator = model.getCreatorID();

  var pID = model.getPlaylistID();

  var spotifyURL = '<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3A' + creator + '%3Aplaylist%3A' + pID + '&theme=white" width="1000" height="550" frameborder="0" allowtransparency="true"></iframe>';
  $scope.spotifyModule = $sce.trustAsHtml(spotifyURL);

});
