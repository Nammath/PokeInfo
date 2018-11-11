
var app = angular.module('pokeApp', [])

app.component('pokeApp', {
    templateUrl: 'app/views/pokemonView.html',
    
    controller: function ($scope, $http) {

        $http.get("https://pokeapi.co/api/v2/pokemon/")
            .then(function (response) { $scope.listOfPokemons = response.data; }); //lista pokemonów
        $http.get("https://pokeapi.co/api/v2/type/")
            .then(function (response) { $scope.listOfTypes = response.data; }); //lista typów pokemonów (np. fire, water itd.)
        $scope.listOfPokemonObjects = []; //tutaj będą umieszczane obiekty pokemonów do wyświetlenia 

        $scope.searchForPokemon = function () {
            $scope.listOfPokemonObjects = [];
            for (var i = 0; i < 151; i++) { //wyszukujemy, czy podany pokemon znajduje się na liście pokemonów, szukamy do 151 elementu, ponieważ tyle pokemonów liczyła pierwsza generacja
                if ($scope.searchPokemon === $scope.listOfPokemons.results[i].name) { //jeżeli znaleźliśmy pokemona
                    $http.get("https://pokeapi.co/api/v2/pokemon/" + $scope.searchPokemon + "/")
                        .then(function (response) {
                            $scope.pokemonDetails = response.data;
                            $scope.listOfTypesTemp = [];
                            //tworzymy dwupoziomową strukturę danych
                            for (var j = 0; j < $scope.pokemonDetails.types.length; j++) {
                                //tworzymy liste typów pokemona, np {name: fire, name: flying}
                                $scope.listOfTypesTemp.push({ name: $scope.pokemonDetails.types[j].type.name }); 
                            }
                            //dodajemy pokemona do listy i przerywamy działanie funkcji (już znaleźliśmy pokemona)
                            $scope.listOfPokemonObjects.push( 
                                {
                                    name: $scope.pokemonDetails.name,
                                    index: $scope.pokemonDetails.game_indices[1].game_index,
                                    image: $scope.pokemonDetails.sprites.front_default,
                                    types: $scope.listOfTypesTemp
                                });
                        });
                    break;  
                }
            }
            for (var i = 0; i < 20; i++) {  //wyszukujemy, czy podany przez użytkownika ciąg znaków jest typem (w pokemonach jest 20 typów)
                if ($scope.searchPokemon === $scope.listOfTypes.results[i].name) { //jeśli tak to pobieramy listę pokemonów danego typu
                    $http.get("https://pokeapi.co/api/v2/type/" + (i+1) + "/")
                        .then(function (response) {
                            $scope.pokemonsOfType = response.data;
                            
                            for (var j = 0; j <= $scope.pokemonsOfType.pokemon.length; j++) { 
                                //przechodzimy przez listę pokemonów danego typu
                                var isPokemonFirstGen = false;
                                //sprawdzamy, czy pokemon należy do pierwszej generacji
                                for (var k = 0; k < 151; k++) {
                                    if ($scope.pokemonsOfType.pokemon[j].pokemon.name == $scope.listOfPokemons.results[k].name) {
                                        isPokemonFirstGen = true;
                                        break;
                                    }
                                }
                                if (isPokemonFirstGen == true) {
                                    //jeśli należy, to postępujemy analogicznie do przypadku z wyszukiwaniem pokemona po nazwie, tworzymy obiekt i dodajemy do listy
                                    $http.get($scope.pokemonsOfType.pokemon[j].pokemon.url)
                                        .then(function (response) {
                                            $scope.pokemonOfType = response.data;
                                            $scope.listOfTypesTemp = [];
                                            for (var n = 0; n < $scope.pokemonOfType.types.length; n++) {
                                                $scope.listOfTypesTemp.push({ name: $scope.pokemonOfType.types[n].type.name });
                                            }
                                            $scope.listOfPokemonObjects.push(
                                                {
                                                    name: $scope.pokemonOfType.name,
                                                    index: $scope.pokemonOfType.game_indices[1].game_index,
                                                    image: $scope.pokemonOfType.sprites.front_default,
                                                    types: $scope.listOfTypesTemp
                                                }
                                            );
                                        });
                                }      
                            }
                        });
                }
            }
        }
        $scope.openDetailPage = function ($event) {
            
            var x = $event.target;
            
            console.log(x);
        }
        
    }
});

