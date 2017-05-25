var beersBeatsApp = angular.module( 'beersBeats', [ 'ngRoute', 'ngResource', 'ngCookies', 'ngDragDrop'] );

beersBeatsApp.config( [ '$routeProvider',
    function( $routeProvider ) {
        $routeProvider.
        when( '/', { // INITAL PAGE LOAD ONLY
            templateUrl: 'partials/landingView.html',
            controller: 'landingCtrl'
        } ).
        when( '/home', {
            templateUrl: 'partials/searchView.html',
            controller: 'searchCtrl'
        } ).

        when( '/home?access_token', {

            templateUrl: 'partials/profileView.html',
            controller: 'profileCtrl'
        } ).
        when( '/spotifyMiniPlayer', {

            templateUrl: 'partials/spotifyMiniPlayer.html',
            controller: 'spotifyPlaylistCtrl'
        } ).
        when( '/search', {
            templateUrl: 'partials/searchView.html',
            controller: 'searchCtrl'
        } ).
        when( '/profile', {
            templateUrl: 'partials/profileView.html',
            controller: 'profileCtrl'
        } ).
        when( '/beer/', {
            templateUrl: 'partials/beerView.html',
            controller: 'beerCtrl'
        } ).
        when( '/playlist', {
            templateUrl: 'partials/spotifyPlaylistView.html',
            controller: 'spotifyPlaylistCtrl'
        } ).
       when( '/selectedBeer/:beerId', {
            templateUrl: 'partials/selectedBeerView.html',
            controller: 'selectedBeerCtrl'
        } ).
        when( '/about', {
             templateUrl: 'partials/aboutView.html',
             controller: 'homeCtrl'
         } ).
        otherwise( {
            redirectTo: '/home'
        } );
    }
] );
