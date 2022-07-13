import React, { useState, useEffect } from "react";
import { pokedexService } from "../services/PokedexService";
import Loader from "./Loader";

const PokemonDescription = (props) => {
  
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    const result = await pokedexService.getPokedexStats(props.pokemonDes);
    if (result) {
      setPokemonData(result);
      setError(null);
    } else {
      setError(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [props.pokemonDes]);

  if (isLoading || !pokemonData) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {typeof pokemonData === "object" ? (
        <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
          <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData?.id}.svg`}
              alt={pokemonData?.name}
              className="object-center object-cover"
            />
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
              {props.pokemonDes}
            </h2>

            <section aria-labelledby="information-heading" className="mt-2">
              <h3 id="information-heading" className="sr-only">
                Product information
              </h3>

              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Stats
                </h3>
                <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2">
                  {pokemonData &&
                    pokemonData?.stats.map((item) => (
                      <div
                        key={item.name}
                        className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                      >
                        <dt className="mt-1 text-xl text-gray-900 truncate">
                          {item?.stat?.name}
                        </dt>
                        <dd className="text-sm font-medium text-gray-500 truncate">
                          {item?.base_stat}
                        </dd>
                        <dd className="text-sm font-medium  text-gray-500">
                          {item?.effort}
                        </dd>
                      </div>
                    ))}
                </dl>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};

export default PokemonDescription;
