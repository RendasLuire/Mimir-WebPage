import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useAnnexed from "../../hooks/useAnnexed";

const DevicesInfo = () => {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState({});
  const { annexedData } = useAnnexed();

  const getDevices = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        Global.url + "annexeds/group/" + annexedData._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();

      if (request.ok) {
        setDevices(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevices();
  }, [annexedData]);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center m-3">
          <CircularProgress />
        </div>
      ) : devices ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tipo de dispositivo</th>
                <th>Numeros de serie</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((item) => (
                <tr key={item.typeDevice}>
                  <td>{item.typeDevice}</td>
                  <td>{item.serialNumbers.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <label>No hay datos</label>
      )}
    </div>
  );
};

export default DevicesInfo;
