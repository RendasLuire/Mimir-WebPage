import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";

const MovementsPerson = () => {
  const [movements, setMovements] = useState([]);
  const { personInfo } = usePerson();

  const getMovements = async () => {
    const token = localStorage.getItem("token");

    if (!token || !personInfo) {
      return;
    }

    try {
      const request = await fetch(Global.url + "movements/" + personInfo._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      const { data } = response;

      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setMovements(data);
    } catch (error) {
      console.error("Error fetching movements:", error.message);
      setMovements([]);
    }
  };

  useEffect(() => {
    getMovements();
  }, [personInfo]);

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
