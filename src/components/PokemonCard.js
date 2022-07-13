import React, {useState} from "react";
import ModalContainer from "./ModalContainer";
import PokemonDescription from "./PokemonDescription";

const PokemonCard = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pokemonDes, setPokemonDes] = useState({});
    // const [pokemonData, setPokemonData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const openModal = (id, name) => {
        console.log(id, name)
        setPokemonDes(name);
        setIsModalOpen(true);

    }
    
    const closeModal =() => {
        setIsModalOpen(false);
    }
  console.log(props);
  return (
    <>
      <div
        key={props.key}
        className="flex flex-col rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-contain"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${props.id}.svg`}
            alt=""
          />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-row justify-between">
          <div className="flex-1 ">
            <div className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                {props.name}
              </p>
              <p className="mt-3 text-base text-gray-500">{props.id}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <span className="sr-only">{props.name}</span>
            </div>
            <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
              <button
                type="button"
                onClick={() => openModal(props.id, props.name)}
                className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
     <ModalContainer
     open={isModalOpen}
     setOpen={setIsModalOpen}
     closeModal={closeModal}
     >
       <PokemonDescription pokemonDes={pokemonDes}/>
     </ModalContainer>
    </>
  );
};

export default PokemonCard;
