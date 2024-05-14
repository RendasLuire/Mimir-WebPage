import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";

const MovementsPerson = () => {
  const [movements, setMovements] = useState([]);
  const { personData } = usePerson();

  const getMovements = async () => {
    const token = localStorage.getItem("token");

    if (!token || !personData._id) {
      return false;
    }

    try {
      const request = await fetch(Global.url + "movements/" + personData._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (request.status == "200") {
        const { data } = response;

        const response = await request.json();

        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setMovements(data);
      } else {
        setMovements([]);
      }
    } catch (error) {
      console.error("Error fetching movements:", error.message);
      setMovements([]);
    }
  };

  useEffect(() => {
    getMovements();
  }, [personData]);

  return (
    <div className="container glass">
      {movements.length > 0 ? (
        <ul>
          {movements.map((item) => (
            <li key={item._id} className="card glass m-3">
              <div className="card-body">
                <h6 className="card-text">{item.description}</h6>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay movimientos disponibles.</p>
      )}
    </div>
  );
};

export default MovementsPerson;
