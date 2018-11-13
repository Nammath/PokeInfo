var app = angular.module('pokeApp')

app.controller('pokeFav', {
    templateUrl: 'app/views/pokemonFavView.html',
    controller: function ($scope, $http) {
        var localFavPokemonsURL = "http://localhost:3000/pokemons/"

        $http.get(localFavPokemonsURL)
            .then(function (response) {
                console.log(response);
            });

        $scope.removeFromFavs = function (index) {
            $http.delete(localFavPokemonsURL + localFavPokemonsURL);
        };
    }
}

);