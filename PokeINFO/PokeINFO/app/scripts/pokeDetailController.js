var app = angular.module('pokeApp')

app.component('pokeDetail', {
    templateUrl: 'app/views/pokemonDetail.html',

    controller: function ($scope, $http) {
        $http.get("https://pokeapi.co/api/v2/pokemon/1/")
            .then(function (response) {
                var data = response.data;
                $scope.pokemonName = data.name.toString();
                $scope.abilities = [];
                $scope.moves = [];
                $scope.imageUrl = data.sprites.front_default.toString();
                $scope.types = [];
                $scope.weight = data.weight.toString();
                $scope.height = data.height.toString();

                console.log($scope.pokemonName)
                //data.types
                //    .foreach(function (type) {
                //        $scope.types.push(type.name.toString())
                //    });
                response.data.abilities
                    .foreach(function (ability) {
                        $http.get(ability.url)
                            .then(function (response) {
                                var abilityDetails = response.data;
                                $scope.pokemonDetails.abilities.push({
                                    name: ability.name.toString(),
                                    desciption: abilityDetails.effect_entries.effect.toString()
                                });
                            })
                    });
                data.moves
                    .foreach(function (move) {
                        $http.get(move.url)
                            .then(function (response) {
                                var data = response.data
                                $scope.pokemonDetails.abilities.push({
                                    name: ability.name.toString(),
                                    desciption: data.effect_entries.effect.toString(),
                                    damageClass: data.damage_class.name.toString()
                                });
                            })
                    })
                console.log($scope.types)
            })
    }
})