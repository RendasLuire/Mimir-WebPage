import { useEffect, useState, useCallback } from "react";

const SearchComputer = ({ setFilter, computers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateFilter = useCallback(
    (data) => {
      setFilter(data);
    },
    [setFilter]
  );

  useEffect(() => {
    if (!searchTerm) {
      updateFilter(computers);
      return;
    }

    const filteredComputers = computers.filter((computer) =>
      Object.values(computer).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    updateFilter(filteredComputers);
  }, [searchTerm, computers, updateFilter]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        className="form-control m-3"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
      />
    </div>
  );
};

export default SearchComputer;
