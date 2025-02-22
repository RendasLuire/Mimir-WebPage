import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";
import CardDevice from "../device/CardDevice";
import { CircularProgress } from "@mui/material";

const ShowDevicesAssignment = () => {
  const [devices, setDevices] = useState([]);
  const { personData } = usePerson();
  const [loading, setLoading] = useState(true);

  const getDevices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token || !personData._id) {
        setLoading(false);
        return false;
      }

      const request = await fetch(
        Global.url + "persons/assigned/" + personData._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      const { data } = response;

      setDevices(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevices();
  }, [personData]);

  return (
    <div className="container glass mt-3">
      {devices.length > 0 ? (
        <div className="container mt-3 mb-3">
          {loading ? (
            <div className="d-flex justify-content-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {devices.map((item) => (
                <div key={item._id} className="col">
                  <CardDevice device={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center m-3">
          <label className="label">No hay dispositivos asignados.</label>
        </div>
      )}
    </div>
  );
};

export default ShowDevicesAssignment;
