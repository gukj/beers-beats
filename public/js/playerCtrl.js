beersBeatsApp.controller('playerCtrl', function($scope, model, $sce){

    //Returns current generated playist for ng-repeat
    $scope.isLoggedIn = function(){
      if (model.isAuthenticated() == true){
        return true;
      }else{
        return false;

      }
    }

    $scope.getPlaylist = function() {
        var data = model.getCurrentPlaylist();
        var auth = model.isAuthenticated();
        if (data && auth === true){
            $scope.spotifyPlaylistSongs = data.playlist.tracks.items;
        }else{
            $scope.spotifyPlaylistSongs = null;

        }
        return $scope.spotifyPlaylistSongs;
    }

    // Convert ms to MM:SS
    $scope.msToMinSec = function(ms) {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    $scope.openPreview = function(url, name) {
      window.open(url,"Preview of " + name,width=500,height=300)
    }



});
