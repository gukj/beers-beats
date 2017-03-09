var beersBeatsApp = angular.module( 'beersBeats', [ 'ngRoute', 'ngResource', 'ngCookies' ] );

beersBeatsApp.config( [ '$routeProvider',
    function( $routeProvider ) {
        $routeProvider.
        when( '/home', {
            templateUrl: 'partials/home.html'
        } ).
        otherwise( {
            redirectTo: '/home'
        } );
    }
] );
