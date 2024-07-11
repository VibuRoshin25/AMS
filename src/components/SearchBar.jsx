const SearchBar = ({ selectedName, onSelectName }) => {
  return (
    <form className="w-1/2">
      <div className="relative ">
        <input
          type="search"
          id="user-search"
          value={selectedName}
          onChange={onSelectName}
          className="block h-9 w-full p-5 pl-10 font-normal text-sm rounded-lg focus:outline-none focus:outline-offset-0 text-center shadow-md focus:shadow-xl search-cancel:appearance-none"
          placeholder="Search Users"
          required
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full text-white focus:outline-none font-normal rounded-r-lg text-sm px-4 py-2"
        >
          <svg
            className="w-5 h-5 text-sky-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
