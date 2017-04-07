beersBeatsApp.controller('playerCtrl', function($scope, model){

    // Sort out stuff not needed
    //$scope.spotifyPlaylistSongs = $scope.playlistFromSpotify.tracks.items; //this is what i want to do with api

    // Return for ng-repeat
    $scope.getPlaylist = function() {
        var data = model.getCurrentPlaylist();
        if (data){
            $scope.spotifyPlaylistSongs = data.playlist.tracks.items;
        }else{
            $scope.spotifyPlaylistSongs = null; //TODO: Show something instead of just empty rows?
        
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
