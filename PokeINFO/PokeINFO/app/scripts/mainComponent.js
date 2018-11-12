var app = angular.module('pokeApp', ['ngRoute'])

app.component('pokeApp', {
    templateUrl: 'app/views/pokemonView.html',

    controller: function ($scope, $http) {
        $scope.fullHintList = [];
        $scope.currentHintList = [];
        $scope.hideHints = true;

        var POKEMONS_IN_1_GENERATION = 151;

        $http.get("https://pokeapi.co/api/v2/pokemon/")
            .then(function (response) {
                $scope.listOfPokemons = response.data;
                $scope.listOfPokemons.results
                    .slice(0, POKEMONS_IN_1_GENERATION + 1)
                    .map(function (value1) {
                        return value1.name.toString();
                    })
                    .forEach(function (value) {
                        $scope.fullHintList.push(value);
                    });
            }); //lista pokemonów
        $http.get("https://pokeapi.co/api/v2/type/")
            .then(function (response) {
                $scope.listOfTypes = response.data;
                $scope.listOfTypes.results
                    .map(function (value1) {
                        return value1.name.toString();
                    })
                    .forEach(function (value) {
                        $scope.fullHintList.push(value);
                    })
            }); //lista typów pokemonów (np. fire, water itd.)
        $scope.listOfPokemonObjects = []; //tutaj będą umieszczane obiekty pokemonów do wyświetlenia

        $scope.updateCurrentHintList = function (searchString) {
            var text = searchString.toString().trim();
            if (text.length <2){
                $scope.hideHints = true;
                return;
            }
            $scope.hideHints = false;
            $scope.currentHintList = $scope.fullHintList
                .filter(function (hint) {
                    return (hint.indexOf(text) === 0);
                });
            console.log($scope.currentHintList);
        };
        $scope.selectHint = function (hint) {
            $scope.searchInput = hint;
            $scope.hideHints = true;
            $scope.searchForPokemon();
        };

        $scope.searchForPokemon = function () {
            $scope.listOfPokemonObjects = [];
            var listOfPokemonsNames = $scope.listOfPokemons.results
                .map(function (value) {
                    return value.name
                });
            var listOfPokemonsNames1Gen = listOfPokemonsNames
                .slice(0, POKEMONS_IN_1_GENERATION + 1);
            var listOfTypesNames = $scope.listOfTypes.results
                .map(function (value) {
                    return value.name
                });
            var searchPokemon = $scope.searchInput.toLowerCase();

            if (listOfPokemonsNames.includes(searchPokemon)) { //jeżeli znaleźliśmy pokemona
                $http.get("https://pokeapi.co/api/v2/pokemon/" + searchPokemon + "/")
                    .then(function (response) {
                        $scope.pokemonDetails = response.data;
                        $scope.listOfTypesTemp = [];
                        //tworzymy dwupoziomową strukturę danych

                        //tworzymy liste typów pokemona, np {name: fire, name: flying}
                        $scope.pokemonDetails.types
                            .map(function (value) {
                                return value.type.name
                            })
                            .forEach(function (value) {
                                $scope.listOfTypesTemp.push({name: value});
                            });

                        //dodajemy pokemona do listy i przerywamy działanie funkcji (już znaleźliśmy pokemona)
                        $scope.listOfPokemonObjects.push(
                            {
                                name: $scope.pokemonDetails.name,
                                index: $scope.pokemonDetails.game_indices[1].game_index,
                                image: $scope.pokemonDetails.sprites.front_default,
                                types: $scope.listOfTypesTemp
                            });
                    });
            }
            else if (listOfTypesNames.includes(searchPokemon)) {
                $http.get("https://pokeapi.co/api/v2/type/" + searchPokemon + "/")
                    .then(function (response) {
                        $scope.pokemonsOfType = response.data;
                        $scope.pokemonsOfType.pokemon
                            .map(function (value) {
                                return value.pokemon;
                            })
                            .filter(function (pokemon) {
                                return listOfPokemonsNames1Gen.includes(pokemon.name)
                            })
                            .forEach(function (pokemon) {
                                $http.get(pokemon.url)
                                    .then(function (response) {
                                        $scope.pokemonOfType = response.data;
                                        $scope.listOfTypesTemp = [];
                                        $scope.pokemonOfType.types
                                            .map(function (value) {
                                                return value.type.name
                                            })
                                            .forEach(function (value) {
                                                $scope.listOfTypesTemp.push({name: value});
                                            });
                                        $scope.listOfPokemonObjects.push(
                                            {
                                                name: $scope.pokemonOfType.name,
                                                index: $scope.pokemonOfType.game_indices[1].game_index,
                                                image: $scope.pokemonOfType.sprites.front_default,
                                                types: $scope.listOfTypesTemp
                                            }
                                        );
                                    });
                            });
                    });
            }
        };
        

    }

});

app.component('pokeDetail', {
    templateUrl: 'app/views/pokemonDetail.html',

    controller: function ($scope, $http) {
        $http.get("https://pokeapi.co/api/v2/pokemon/1/")
            .then(function (response) {
                
            });
        
        

    }
})



app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/app/views/start.html'
        })
        .when('/appStart', {
            template: '<poke-app></poke-app>'

        })
    
        .when('/pokemonDetail/:pokeId', {
            template: '<poke-detail></poke-detail>'
        })
       
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
}])

