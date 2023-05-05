import "./index.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PokedexDetailsBasicInfo,
  PokedexDetailsCharacteristics,
  PokedexDetailsStrategies,
  PokedexDetailsEvolutionChain,
  PokedexDetailsButtonGroup,
} from "../../";
import { getPokemonBasicDetailsInfo } from "../../../redux/slice/pokemonSlice";


export const PokedexDetails = ({ pokemonId = null, closeModalEvent = null, changePokemonEvent = null }) => {
  const globalState = useSelector(state => state);
  const { is_pokemon_basic_details_processing} = globalState;
  const dispatch = useDispatch();

  const [pokemonDetails, setPokemonDetails] = useState({
    id: '',
    formattedId: '',
    name: '',
    img: '',
    gender: '',
    types: [],
    stats: {},
    pokemonDesc: "",
    height: "",
    weight: "",
    eggGroups: "",
    abilities: "",
    weakAgainsts: [],
    firstEvolutionBasicDetails: {},
    secondEvolutionBasicDetails: {},
    thirdEvolutionBasicDetails: {},
    prevPokemonName: "",
    nextPokemonName: "",
  });


  const fetchPokemonDetails = async () => {
    const {
      id,
      formattedId,
      name,
      img,
      gender,
      types,
      stats,
      pokemonDesc,
      height,
      weight,
      eggGroups,
      abilities,
      weakAgainsts,
      firstEvolutionBasicDetails,
      secondEvolutionBasicDetails,
      thirdEvolutionBasicDetails,
      prevPokemonName,
      nextPokemonName,
    } = await dispatch(getPokemonBasicDetailsInfo(pokemonId)).then(res => res?.payload);

    await setPokemonDetails({
      id,
      formattedId,
      name,
      img,
      gender,
      types,
      stats,
      pokemonDesc,
      height,
      weight,
      eggGroups,
      abilities,
      weakAgainsts,
      firstEvolutionBasicDetails,
      secondEvolutionBasicDetails,
      thirdEvolutionBasicDetails,
      prevPokemonName,
      nextPokemonName,
    });
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonId]);


  return (
    <div className="pokemon-details">
      {pokemonDetails?.pokemonDesc ? (
        <>
          <PokedexDetailsBasicInfo
            compData={{
              id: pokemonDetails?.id,
              formattedId: pokemonDetails?.formattedId,
              name: pokemonDetails?.name,
              img: pokemonDetails?.img,
              types: pokemonDetails?.types,
              pokemonDesc: pokemonDetails?.pokemonDesc,
            }}
            isLoading={is_pokemon_basic_details_processing}
            closeModalEvent={closeModalEvent}
            changePokemonEvent={changePokemonEvent}
          />

          <PokedexDetailsCharacteristics
            compData={{
              height: pokemonDetails?.height,
              weight: pokemonDetails?.weight,
              gender: pokemonDetails?.gender,
              eggGroups: pokemonDetails?.eggGroups,
              abilities: pokemonDetails?.abilities,
              types: pokemonDetails?.types,
              weakAgainsts: pokemonDetails?.weakAgainsts,
            }}
            isLoading={is_pokemon_basic_details_processing}
          />

          <PokedexDetailsStrategies stats={pokemonDetails?.stats} isLoading={is_pokemon_basic_details_processing} />

          <PokedexDetailsEvolutionChain
            compData={{
              firstPokemonBasicDetails: pokemonDetails?.firstEvolutionBasicDetails,
              secondPokemonBasicDetails: pokemonDetails?.secondEvolutionBasicDetails,
              thirdPokemonBasicDetails: pokemonDetails?.thirdEvolutionBasicDetails,
            }}
            isLoading={is_pokemon_basic_details_processing}
          />

          <PokedexDetailsButtonGroup
            compData={{
              prevPokemonName: pokemonDetails?.prevPokemonName,
              nextPokemonName: pokemonDetails?.nextPokemonName,
            }}
            isLoading={is_pokemon_basic_details_processing}
            changePokemonEvent={changePokemonEvent}
          />
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};
