
export const mockAllPokemonsData = [
    {
        "id": 4,
        "formattedId": "004",
        "name": "charmander",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
        "types": [
            "Fire"
        ],
        "gender": [
            "Female",
            "Male"
        ],
        "height": 6,
        "weight": 85,
        "abilities": [
            {
                "ability": {
                    "name": "blaze",
                    "url": "https://pokeapi.co/api/v2/ability/66/"
                },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": {
                    "name": "solar-power",
                    "url": "https://pokeapi.co/api/v2/ability/94/"
                },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "stats": {
            "hp": 39,
            "attack": 52,
            "defense": 43,
            "special-attack": 60,
            "special-defense": 50,
            "speed": 65
        }
    },
    {
        "id": 5,
        "formattedId": "005",
        "name": "charmeleon",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg",
        "types": [
            "Fire"
        ],
        "gender": [
            "Female",
            "Male"
        ],
        "height": 11,
        "weight": 190,
        "abilities": [
            {
                "ability": {
                    "name": "blaze",
                    "url": "https://pokeapi.co/api/v2/ability/66/"
                },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": {
                    "name": "solar-power",
                    "url": "https://pokeapi.co/api/v2/ability/94/"
                },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "stats": {
            "hp": 58,
            "attack": 64,
            "defense": 58,
            "special-attack": 80,
            "special-defense": 65,
            "speed": 80
        }
    },
    {
        "id": 6,
        "formattedId": "006",
        "name": "charizard",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
        "types": [
            "Fire",
            "Flying"
        ],
        "gender": [
            "Female",
            "Male"
        ],
        "height": 17,
        "weight": 905,
        "abilities": [
            {
                "ability": {
                    "name": "blaze",
                    "url": "https://pokeapi.co/api/v2/ability/66/"
                },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": {
                    "name": "solar-power",
                    "url": "https://pokeapi.co/api/v2/ability/94/"
                },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "stats": {
            "hp": 78,
            "attack": 84,
            "defense": 78,
            "special-attack": 109,
            "special-defense": 85,
            "speed": 100
        }
    }
];

export const mockFilteredPokemonsData = [
    {
        "id": 4,
        "formattedId": "004",
        "name": "charmander",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
        "types": [
            "Fire"
        ],
        "gender": [
            "Female",
            "Male"
        ],
        "height": 6,
        "weight": 85,
        "abilities": [
            {
                "ability": {
                    "name": "blaze",
                    "url": "https://pokeapi.co/api/v2/ability/66/"
                },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": {
                    "name": "solar-power",
                    "url": "https://pokeapi.co/api/v2/ability/94/"
                },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "stats": {
            "hp": 39,
            "attack": 52,
            "defense": 43,
            "special-attack": 60,
            "special-defense": 50,
            "speed": 65
        }
    },
];

export const mockGenderPokemonMapData = {
    "bulbasaur": [
        "Female",
        "Male"
    ],
    "charmander": [
        "Female",
        "Male"
    ],
    "squirtle": [
        "Female",
        "Male"
    ],
    "caterpie": [
        "Female",
        "Male"
    ]
}

export const mockPokemonTypesData = [
    {
        "slot": 1,
        "type": {
            "name": "water",
            "url": "https://pokeapi.co/api/v2/type/11/"
        }
    },
    {
        "slot": 2,
        "type": {
            "name": "ice",
            "url": "https://pokeapi.co/api/v2/type/15/"
        }
    }
]

export const mockPokemonDetailsData = {
    "types": [
        {
            "slot": 1,
            "type": {
                "name": "psychic",
                "url": "https://pokeapi.co/api/v2/type/14/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "fairy",
                "url": "https://pokeapi.co/api/v2/type/18/"
            }
        }
    ],
    "sprites": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",
        "other": {
            "dream_world": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/38.svg",
                "front_female": null
            },
        },
    },
    "stats": [
        {
            "base_stat": 73,
            "effort": 0,
            "stat": {
                "name": "hp",
                "url": "https://pokeapi.co/api/v2/stat/1/"
            }
        },
        {
            "base_stat": 76,
            "effort": 0,
            "stat": {
                "name": "attack",
                "url": "https://pokeapi.co/api/v2/stat/2/"
            }
        },
        {
            "base_stat": 75,
            "effort": 0,
            "stat": {
                "name": "defense",
                "url": "https://pokeapi.co/api/v2/stat/3/"
            }
        },
        {
            "base_stat": 81,
            "effort": 0,
            "stat": {
                "name": "special-attack",
                "url": "https://pokeapi.co/api/v2/stat/4/"
            }
        },
        {
            "base_stat": 100,
            "effort": 1,
            "stat": {
                "name": "special-defense",
                "url": "https://pokeapi.co/api/v2/stat/5/"
            }
        },
        {
            "base_stat": 100,
            "effort": 1,
            "stat": {
                "name": "speed",
                "url": "https://pokeapi.co/api/v2/stat/6/"
            }
        }
    ]
}

export const mockContextData = {
    allPokemons: mockAllPokemonsData,
    filteredPokemons: mockFilteredPokemonsData,
    genderPokemonMap: {}, 
    pokemonListLimit: 30, 
    pokemonListOffset: 30
};
