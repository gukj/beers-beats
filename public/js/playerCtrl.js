beersBeatsApp.controller('playerCtrl', function($scope, model){

    //Returns current generated playist for ng-repeat
    $scope.getPlaylist = function() {
        var data = model.getCurrentPlaylist();
        if (data){
            $scope.spotifyPlaylistSongs = data.playlist.tracks.items;
        }else{
            //TODO: Show something instead of just empty rows?
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
});
