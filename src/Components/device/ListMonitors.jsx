import { useEffect, useState } from "react";
import useDevice from "../../hooks/useDevice";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ListMonitors = () => {
  const [listMonitors, setListMonitors] = useState([]);
  const { deviceInfo, setDeviceInfo } = useDevice();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const getMonitors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(Global.url + "device?type=Monitor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      const { data } = response;

      const filteredMonitors = data.filter(
        (monitor) =>
          monitor.status == "Activo" && monitor.user.id == "Sin asignar"
      );

      setListMonitors(filteredMonitors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSelectClick = async (item) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const { user } = deviceInfo;

      if (!token) {
        return false;
      }

      const messageUpdateComputer = {
        monitor: {
          id: item._id,
          serialNumber: item.serialNumber,
        },
        userTI: auth._id,
      };

      const messageUpdateMonitor = {
        user: {
          id: user.id,
          name: user.name,
        },
        userTI: auth._id,
      };

      const requestComputer = await fetch(
        Global.url + "device/" + deviceInfo._id,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdateComputer),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const requestMonitor = await fetch(Global.url + "device/" + item._id, {
        method: "PATCH",
        body: JSON.stringify(messageUpdateMonitor),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      await requestComputer.json();
      await requestMonitor.json();

      const updatedComputerInfo = {
        ...deviceInfo,
        monitor: { id: item._id, serialNumber: item.serialNumber },
      };

      setDeviceInfo(updatedComputerInfo);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMonitors();
  }, []);

  return (
    <div className="m-3">
      {loading ? (
        <CircularProgress />
      ) : (
        <table className="table table-striped glass">
          <thead>
            <tr>
              <th className="col">Numero de Serie</th>
              <th className="col">Marca</th>
              <th className="col">Modelo</th>
            </tr>
          </thead>
          <tbody>
            {listMonitors.length > 0 ? (
              listMonitors.map((item) => (
                <tr
                  className="glass"
                  key={item._id}
                  onClick={() => handleSelectClick(item)}
                >
                  <td>{item.serialNumber}</td>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No hay monitores</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListMonitors;
