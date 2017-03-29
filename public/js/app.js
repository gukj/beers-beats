var beersBeatsApp = angular.module( 'beersBeats', [ 'ngRoute', 'ngResource', 'ngCookies' ] );

beersBeatsApp.config( [ '$routeProvider',
    function( $routeProvider ) {
        $routeProvider.
        when( '/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        } ).
        when( '/search', {
            templateUrl: 'partials/searchView.html',
            controller: 'searchCtrl'
        } ).
        when( '/beer', {
            templateUrl: 'partials/beerView.html',
            controller: 'beerCtrl'
        } ).
        when( '/playlists', {
            templateUrl: 'partials/playlistsView.html',
            controller: 'playlistsCtrl'
        } ).
        otherwise( {
            redirectTo: '/home'
        } );
    }
] );
