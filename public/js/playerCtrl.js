beersBeatsApp.controller('playerCtrl', function($scope, model, $sce){

    //Returns current generated playist for ng-repeat
    $scope.getPlaylist = function() {
        var data = model.getCurrentPlaylist();
        var auth = model.isAuthenticated();
        if (data && auth === true){
            $scope.spotifyPlaylistSongs = data.playlist.tracks.items;
            $scope.checkLoggedIn = "";
        }else{
            $scope.spotifyPlaylistSongs = null;
            var message = "<div>Go and <a href='/login'>login to Spotify</a> to be able to use preview mode! Not interested in preview? Just hit the button bellow</div>";
            console.log(message);
            $scope.checkLoggedIn = $sce.trustAsHtml(message);

        }
        return $scope.spotifyPlaylistSongs;
    }

    // Convert ms to MM:SS
    $scope.msToMinSec = function(ms) {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
});
