import { useCallback, useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardPersons from "../../Components/person/CardPersons";
import SearchPerson from "../../Components/person/SearchPerson";
import ButtonAddPerson from "../../Components/person/ButtonAddPerson";
import { CircularProgress } from "@mui/material";

const ListAllPersons = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(users);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(Global.url + "persons/listall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!request.ok) {
        throw new Error("Error al obtener los datos del servidor.");
      }

      const response = await request.json();

      const { persons } = response.data;

      setUsers(persons);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateFilter = useCallback((search) => {
    setFilter(search);
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container glass mt-3">
      <div className="d-flex justify-content-center mt-3 mb-3 glass">
        <div className="col-6">
          <SearchPerson setFilter={updateFilter} persons={users} />
        </div>
        <div className="m-3">
          <ButtonAddPerson />
        </div>
      </div>
      <div className="constainer glass mt-3 mb-3">
        <h1>Usuarios</h1>
        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row row-cols-1 row-clos-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filter.map((item) => (
              <div className="col" key={item._id}>
                <CardPersons user={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAllPersons;
