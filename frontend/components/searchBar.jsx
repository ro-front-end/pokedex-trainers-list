import { useEffect, useState } from "react";

function SearchBar({ search, setSearch }) {
  const [value, setValue] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(value);
    }, 800);

    return () => clearTimeout(timeout);
  }, [value, setSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-4 py-2 border bg-blue-300 text-blue-950 rounded-xl w-full sm:w-64"
      />
    </div>
  );
}

export default SearchBar;
