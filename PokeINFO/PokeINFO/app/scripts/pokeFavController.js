var app = angular.module('pokeApp')

app.component('pokeFav', {
    templateUrl: 'app/views/pokemonFavView.html',
    controller: function ($scope, $http) {
        var localFavPokemonsURL = "http://localhost:3000/pokemons/"

        var update = function () {
            $http.get(localFavPokemonsURL)
                .then(function (response) {
                    $scope.listOfPokemonObjects = response.data;
                    console.log($scope.listOfPokemonObjects)
                });
        }

        update();
        $scope.removeFromFavs = function (index) {
            console.log(index)
            $http.delete(localFavPokemonsURL + index)
                .then(function () {
                    update()
                });
        };
    }
}

);