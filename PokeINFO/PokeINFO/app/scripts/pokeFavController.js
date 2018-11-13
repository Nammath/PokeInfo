var app = angular.module('pokeApp')

app.controller('pokeFavController',
    function ($scope, $http) {
        $scope.name = "bulbasaur";
        $scope.types = [];

        $scope.listOfPokemonObjects = []

        $scope.removeFromFavs = function (index) {
        };
    },
    bindings{
    }
)