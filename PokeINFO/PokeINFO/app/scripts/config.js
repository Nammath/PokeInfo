var app = angular
    .module('pokeApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/app/views/start.html'
            })
            .when('/appStart', {
                template: '<poke-search></poke-search>'
            })

            .when('/pokemonDetail', {
                template: '<poke-detail></poke-detail>'
            })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])