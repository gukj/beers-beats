var beersBeatsApp = angular.module( 'beersBeats', [ 'ngRoute', 'ngResource', 'ngCookies' ] );

beersBeatsApp.config( [ '$routeProvider',
    function( $routeProvider ) {
        $routeProvider.
        when( '/home', {
            templateUrl: 'partials/home.html'
        } ).
        when( '/search', {
            templateUrl: 'partials/searchView.html'
        } ).
        when( '/beer', {
            templateUrl: 'partials/beerView.html'
        } ).
        otherwise( {
            redirectTo: '/home'
        } );
    }
] );
