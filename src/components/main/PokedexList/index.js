import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardBox, Modal, PageLoader, PokedexDetails } from "../../";
import { getSiblingPokemonBasicDetails } from "../../../utils";
import { getPokemonList } from "../../../redux/slice/pokemonSlice";


export const PokedexList = () => {
  const globalState = useSelector(state => state);
  const { filteredPokemons, allPokemons, pokemonListOffset, is_pokemon_list_processing } = globalState;
  const dispatch = useDispatch();

  const [isMountModal, setIsMountModal] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const toggleModal = (flag = false, pokemonId = null) => {
    setIsMountModal(flag);
    setSelectedPokemonId(pokemonId);
  };

  const changePokemon = (flag = null) => {
    const siblingPokemon = getSiblingPokemonBasicDetails(
      allPokemons,
      selectedPokemonId,
      flag
    );
    setSelectedPokemonId(siblingPokemon?.id);
  };

  const handleScrollEvent = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 1
    ) {
      if (!is_pokemon_list_processing) {
        dispatch(getPokemonList())
      }
    }
  };

  useEffect(() => {
    dispatch(getPokemonList());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [pokemonListOffset, is_pokemon_list_processing]);

  return (
    <>
      <div className="pokedex-list-wrap">
        <h4>
          Showing {filteredPokemons?.length} of {allPokemons?.length} results
        </h4>

        {filteredPokemons?.length > 0 ? (
          <>
            <div className="pokedex-list" data-testid="test-pokedex-list">
              {filteredPokemons?.map((item, indx) => {
                return (
                  <CardBox
                    key={indx}
                    size={"md"}
                    withCaption={true}
                    compData={{
                      id: item?.id,
                      formattedId: item?.formattedId,
                      name: item?.name,
                      img: item?.img,
                      types: item?.types,
                    }}
                    handleClickEvent={toggleModal}
                    {...{ "data-testid": "test-cardbox-" + indx }}
                  />
                );
              })}
            </div>

            {is_pokemon_list_processing && <PageLoader color="grey" text="Loading more items..." />}
          </>
        ) : (
          <h4>No result item found!!</h4>
        )}
      </div>

      {isMountModal && (
        <Modal
          size="md"
          childcomp={
            <PokedexDetails
              closeModalEvent={toggleModal}
              changePokemonEvent={changePokemon}
              pokemonId={selectedPokemonId}
            />
          }
        />
      )}
    </>
  );
};
