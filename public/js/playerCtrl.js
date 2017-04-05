beersBeatsApp.controller('playerCtrl', function($scope, model){
    // Copy of what the Spotify API returns when asking for a playlist
    // Mix of local songs and Spotify songs

    var beers = model.getSelectedBeers();
    if (beers.length <= 0){
        console.log("Empty list");
        //TODO: display something like " choose beer to get a playlist accordingly ->> button! "
    } else{
        //TODO: dynamically change depending on beerbag content
        console.log("hello");
        var tmp = model.generatePlaylist(beers).split(" ");
        id = tmp[0];
        username = tmp[1];
        console.log(id + " " + username);
        model.PlaylistByCreatorAndID.get({username:username,id:id}, function(data){
            console.log(data.playlist.tracks.items);
            $scope.spotifyPlaylistSongs = data.playlist.tracks.items;
        });
    }

    // Sort out stuff not needed
    //$scope.spotifyPlaylistSongs = $scope.playlistFromSpotify.tracks.items; //this is what i want to do with api

    // Return for ng-repeat
    $scope.getPlaylist = function() {
        return $scope.spotifyPlaylistSongs;
    }

    // Convert ms to MM:SS
    $scope.msToMinSec = function(ms) {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
});
