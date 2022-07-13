import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

const SearchBar = (props) => {
  return (
    <>
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            value={props?.searchPokemon}
            id="search"
            onChange={() =>props.onHandleChange()}
            onKeyPress={(event) => {
                if (event.key === 'Enter' || event.code === 13) {
                    // setPage(1);
                    props.Search();
                }
            }}
            name="search"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
