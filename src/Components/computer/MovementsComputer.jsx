import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";

const MovementsComputer = () => {
  const [movements, setMovements] = useState([]);
  const { computerInfo } = useComputer();

  const getMovements = async () => {
    const token = localStorage.getItem("token");

    if (!token || !computerInfo || !computerInfo._id) {
      return;
    }
    try {
      const response = await fetch(
        Global.url + "movements/listall/" + computerInfo._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movements");
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setMovements(data);
      } else {
        setMovements([]);
      }
    } catch (error) {
      console.error("Error fetching movements:", error);
      setMovements([]);
    }
  };

  useEffect(() => {
    getMovements();
  }, [computerInfo]);

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
