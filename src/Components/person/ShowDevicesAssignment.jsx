import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";
import CardDevice from "../device/CardDevice";
import { CircularProgress } from "@mui/material";

const ShowDevicesAssignment = () => {
  const [devices, setDevices] = useState([]);
  const { personInfo } = usePerson();
  const [loading, setLoading] = useState(true);

  const getDevices = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !personInfo._id) {
        return false;
      }

      const request = await fetch(
        Global.url + "persons/assigned/" + personInfo._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      const { devices } = response.data;

      setDevices(devices);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevices();
  }, [devices]);

  return (
    <div className="container glass mt-3">
      <div className="container glass mt-3 mb-3">
        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {devices.length > 1 ? (
              devices.map((item) => (
                <div key={item._id} className="col">
                  <CardDevice device={item} />
                </div>
              ))
            ) : (
              <div className="d-flex text-center">
                <p>No abemus devices</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDevicesAssignment;
