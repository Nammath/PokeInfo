var app = angular.module('pokeApp')

app.controller('pokemonDetailController', function ($scope, $http, $routeParams) {
        
        $scope.pokeId = $routeParams.pokeId;
        
        var pokemonId = $scope.pokeId;
        
        $http.get("https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/")
            .then(function (response) {
                var data = response.data;
                $scope.pokemonName = data.name.toString();
                $scope.abilities = [];
                $scope.moves = [];
                $scope.imageUrl = data.sprites.front_default.toString();
                $scope.types = [];
                $scope.weight = data.weight.toString();
                $scope.height = data.height.toString();

                data.types
                    .forEach(function (type) {
                        $scope.types.push(type.type.name)
                    });

                console.log(data.abilities);
                data.abilities
                    .forEach(function (ability) {
                        $http.get(ability.ability.url)
                            .then(function (response) {
                                var abilityDetails = response.data;
                                console.log(abilityDetails);
                                $scope.abilities.push({
                                    name: ability.ability.name,
                                    effects: abilityDetails.effect_entries
                                        .map(function (effect) {
                                            return effect.short_effect;
                                        }),
                                });
                            })
                    });

                data.moves
                    .forEach(function (move) {
                        $http.get(move.move.url)
                            .then(function (response) {
                                var moveDetails = response.data
                                $scope.moves.push({
                                    name: move.move.name,
                                    accuracy: moveDetails.accuracy,
                                    effects: moveDetails.effect_entries
                                        .map(function (effect) {
                                            return effect.short_effect;
                                        }),
                                    damageClass: moveDetails.damage_class.name
                                });
                            })
                    })
                
            })
    })
    

