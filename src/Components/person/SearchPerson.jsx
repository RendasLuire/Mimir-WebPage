import { useCallback, useEffect, useState } from "react";

const SearchPerson = ({ setFilter, persons }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const updateFilter = useCallback(
    (data) => {
      setFilter(data);
    },
    [setFilter]
  );

  useEffect(() => {
    if (!searchTerm) {
      updateFilter(persons);
      return;
    }

    const filteredPersons = persons.filter((person) =>
      Object.values(person).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    updateFilter(filteredPersons);
  }, [searchTerm, persons, updateFilter]);

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

export default SearchPerson;
