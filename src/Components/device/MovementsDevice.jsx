import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useDevice from "../../hooks/useDevice";
import { CircularProgress } from "@mui/material";

const MovementsDevice = () => {
  const [movements, setMovements] = useState([]);
  const { deviceData } = useDevice();
  const [login, setLogin] = useState(true);

  const getMovements = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData || !deviceData._id) {
        return;
      }
      const request = await fetch(Global.url + "movements/" + deviceData._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      const { data } = response;

      if (data && Array.isArray(data)) {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setMovements(data);
        setLogin(false);
      } else {
        setMovements([]);
        setLogin(false);
      }
    } catch (error) {
      setMovements([]);
      setLogin(false);
    }
  };

  useEffect(() => {
    getMovements();
  }, [deviceData]);

  return (
    <div className="container glass">
      {login ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {movements.length > 0 ? (
            <ol>
              <div className="container">
                {movements.map((item) => (
                  <div className="card glass m-3" key={item._id}>
                    <div className="card-body">
                      <h6 className="card-text">{item.description}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </ol>
          ) : (
            <div className="d-flex justify-content-center m-3">
              <label className="label">No hay movimientos que mostrar.</label>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovementsDevice;
