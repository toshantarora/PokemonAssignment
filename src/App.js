/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";

import {
  ChevronDownIcon,
  SortAscendingIcon,
} from "@heroicons/react/solid";
import SearchBar from "./components/SearchBar";
import { pokedexService } from "./services/PokedexService";
import Loader from "./components/Loader";
import PokemonCard from "./components/PokemonCard";

import Pagination from "./components/Pagination";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const search = window?.location?.search;
  const paramsURL = new URLSearchParams(search);
  const limitParam = parseInt(paramsURL.get("limit"), 20);
  const pageParam = parseInt(paramsURL.get("page"), 10);
  const [responseFromAPI, setResponseFromAPI] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(limitParam || 20);
  const [pageNo, setPageNo] = useState(pageParam || 1);
  const [searchPokemon, setSeacrhPokemon] = useState('');

 
  const fetchPokedexList = async () => {
    try {
      setIsLoading(true);
      const response = await pokedexService.getPokedexList();
      if (response?.results) {
        setResponseFromAPI(response?.results);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
 
  const onHandleChange = (event) => {
		setSeacrhPokemon(event?.target?.value ? event.target.value : null);
	};
  useEffect(() => {
    fetchPokedexList();
  }, []);


  console.log(responseFromAPI);
  return (
    <div className="App">
      <div className="h-full flex">
        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
              <div className="flex-1 flex justify-between px-4 sm:px-6">
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <SearchBar 
                    onHandleChange={onHandleChange }
                    searchPokemon={searchPokemon }
                    />
                  </div>
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="w-full mt-2 bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <SortAscendingIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Type
                      <ChevronDownIcon
                        className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Name
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Date modified
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Date created
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {error && <p>{error}</p>}

                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">
                    Pokedex App
                  </h1>
                </div>

                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                  {isLoading || !responseFromAPI ? <Loader/> : null}
                  {typeof responseFromAPI === "object" &&
                    responseFromAPI instanceof Array &&
                    responseFromAPI.map((pokemon, index) => (
                      <PokemonCard ikey={index} {...pokemon} id={index + 1} />
                    ))}
                </div>
                <Pagination/>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
