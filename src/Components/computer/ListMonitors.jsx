import { useEffect, useState } from "react";
import useComputer from "../../hooks/useComputer";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ListMonitors = () => {
  const [listMonitors, setListMonitors] = useState([]);
  const { computerInfo, setComputerInfo } = useComputer();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const getMonitors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(Global.url + "computers/filter/monitor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      const { computers } = response.data;

      const filteredMonitors = computers.filter(
        (monitor) =>
          monitor.status == "activo" && monitor.user.id == "Sin asignar"
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
      const { user } = computerInfo;

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

      console.log(JSON.stringify(messageUpdateComputer));

      const requestComputer = await fetch(
        Global.url + "computers/update/" + computerInfo._id,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdateComputer),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log(JSON.stringify(messageUpdateMonitor));

      const requestMonitor = await fetch(
        Global.url + "computers/update/" + item._id,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdateMonitor),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      await requestComputer.json();
      const response = await requestMonitor.json();

      console.log(response);

      const updatedComputerInfo = {
        ...computerInfo,
        monitor: { id: item._id, serialNumber: item.serialNumber },
      };

      setComputerInfo(updatedComputerInfo);
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