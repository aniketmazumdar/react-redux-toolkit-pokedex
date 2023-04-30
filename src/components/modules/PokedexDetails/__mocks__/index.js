// PokedexDetails
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

export const mockSpeciesData = {
    "egg_groups": [
        {
            "name": "monster",
            "url": "https://pokeapi.co/api/v2/egg-group/1/"
        },
        {
            "name": "dragon",
            "url": "https://pokeapi.co/api/v2/egg-group/14/"
        }
    ],
    "evolution_chain": {
        "url": "https://pokeapi.co/api/v2/evolution-chain/2/"
    },
    "flavor_text_entries": [
        {
            "flavor_text": "Spits fire that\nis hot enough to\nmelt boulders.\fKnown to cause\nforest fires\nunintentionally.",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "version": {
                "name": "red",
                "url": "https://pokeapi.co/api/v2/version/1/"
            }
        },
    ],
};

export const mockPokemonDescData = "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.";

export const mockEggGroupsData = "Monster, Dragon";

export const mockTypeApiData = {
    "damage_relations": {
        "double_damage_from": [
            {
                "name": "fighting",
                "url": "https://pokeapi.co/api/v2/type/2/"
            },
            {
                "name": "ground",
                "url": "https://pokeapi.co/api/v2/type/5/"
            },
            {
                "name": "steel",
                "url": "https://pokeapi.co/api/v2/type/9/"
            },
            {
                "name": "water",
                "url": "https://pokeapi.co/api/v2/type/11/"
            },
            {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            }
        ],
    },
}

export const mockWeakAgainstsData = ["Fighting", "Ground", "Steel", "Water", "Grass"];

export const mockEvolutionChainApiData = {
    "chain": {
        "evolution_details": [],
        "evolves_to": [
            {
                "evolves_to": [
                    {
                        "species": {
                            "name": "charizard",
                            "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
                        }
                    }
                ],
                "species": {
                    "name": "charmeleon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
                }
            }
        ],
        "species": {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
        }
    },
}

export const mockEvolutionChainsData = {
    "firstEvolutionBasicDetails": {
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
    "secondEvolutionBasicDetails": {
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
    "thirdEvolutionBasicDetails": {
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
}
