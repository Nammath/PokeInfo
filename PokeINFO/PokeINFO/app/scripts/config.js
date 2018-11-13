var app = angular.module('pokeApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/app/views/start.html'
            })
            .when('/appStart', {
                template: '<poke-search></poke-search>'
            })

            .when('/pokemonDetail/:pokeId', {
                templateUrl: '/app/views/pokemonDetail.html',
                controller: 'pokemonDetailController'

            })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        })
    }]);

