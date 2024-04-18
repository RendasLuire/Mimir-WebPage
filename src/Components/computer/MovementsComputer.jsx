import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";
import { CircularProgress } from "@mui/material";

const MovementsComputer = () => {
  const [movements, setMovements] = useState([]);
  const { computerInfo } = useComputer();
  const [login, setLogin] = useState(true);

  const getMovements = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !computerInfo || !computerInfo._id) {
        return;
      }
      const request = await fetch(
        Global.url + "movements/listall/" + computerInfo._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();

      const { movements } = response.data;

      if (movements && Array.isArray(movements)) {
        movements.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setMovements(movements);
        setLogin(false);
      } else {
        setMovements([]);
      }
    } catch (error) {
      setMovements([]);
      setLogin(false);
    }
  };

  useEffect(() => {
    getMovements();
  }, [computerInfo]);

  return (
    <div className="container glass">
      {login ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <ol>
            {movements ? (
              <div className="container">
                {movements.map((item) => (
                  <div className="card glass m-3" key={item._id}>
                    <div className="card-body">
                      <h6 className="card-text">{item.description}</h6>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h3>No hay Informacion</h3>
            )}
          </ol>
        </>
      )}
    </div>
  );
};

export default MovementsComputer;
