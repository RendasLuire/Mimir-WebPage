import { useEffect, useState } from "react";
import Global from "../../helpers/Global";

const MovementsComputer = ({ id }) => {
  const [movements, setMovements] = useState([]);

  const getMovements = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const request = await fetch(Global.url + "movements/listall/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    setMovements(data);
  };

  useEffect(() => {
    getMovements();
  }, []);

  return (
    <div className="container glass">
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
    </div>
  );
};

export default MovementsComputer;
