var app = angular.module('pokeApp')

app.component('poke-detail', {
    templateUrl: 'app/views/pokemonDetail.html',

    controller: function ($scope, $http) {
        $http.get("https://pokeapi.co/api/v2/pokemon/1/")
            .then(function (response) {
            });
    }
})