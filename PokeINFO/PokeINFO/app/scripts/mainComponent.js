
var app = angular.module('pokeApp', [])

app.component('pokeApp', {
    templateUrl: 'app/views/pokemonView.html',
    
    controller: function ($scope, $http) {

        $http.get("https://pokeapi.co/api/v2/pokemon/")
            .then(function (response) { $scope.listOfPokemons = response.data; });
        $http.get("https://pokeapi.co/api/v2/type/")
            .then(function (response) { $scope.listOfTypes = response.data; });
        $scope.listOfPokemonObjects = [];

        $scope.searchForPokemon = function () {
            $scope.listOfPokemonObjects = [];
            for (var i = 0; i < 151; i++) {
                if ($scope.searchPokemon === $scope.listOfPokemons.results[i].name) {
                    $http.get("https://pokeapi.co/api/v2/pokemon/" + $scope.searchPokemon + "/")
                        .then(function (response) {
                            $scope.pokemonDetails = response.data;
                            $scope.listOfPokemonObjects.push(
                                {
                                    name: $scope.pokemonDetails.name,
                                    index: $scope.pokemonDetails.game_indices[1].game_index,
                                    image: $scope.pokemonDetails.sprites.front_default
                                });
                        });
                    break;  
                }
            }
            for (var i = 0; i < 20; i++) {
                if ($scope.searchPokemon === $scope.listOfTypes.results[i].name) {
                    $http.get("https://pokeapi.co/api/v2/type/" + (i+1) + "/")
                        .then(function (response) {
                            $scope.pokemonsOfType = response.data;

                            for (var j = 0; j <= $scope.pokemonsOfType.pokemon.length; j++) {
                                
                                $http.get($scope.pokemonsOfType.pokemon[j].pokemon.url)
                                    .then(function (response) {
                                        $scope.pokemonOfType = response.data;
                                        $scope.listOfPokemonObjects.push(
                                            {
                                                name: $scope.pokemonOfType.name,
                                                index: $scope.pokemonOfType.game_indices[1].game_index,
                                                image: $scope.pokemonOfType.sprites.front_default
                                            }
                                        );
                                    });
                                if (j > 10) { break;}
                                
                            }
                        });
                }
            }
        }
    }
});

