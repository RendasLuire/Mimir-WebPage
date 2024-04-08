import { useEffect, useState } from "react";
import Global from "../../helpers/Global";

const MovementsPerson = ({ id }) => {
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

    data.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

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

export default MovementsPerson;
