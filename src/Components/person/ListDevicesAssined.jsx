import { useEffect, useState } from "react";
import usePerson from "../../hooks/usePerson";
import Global from "../../helpers/Global";
import CardDevice from "../device/CardDevice";

const ListDevicesAssined = () => {
  const [devices, setDevices] = useState([]);
  const { personData } = usePerson();

  const getDevices = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !personData._id) {
        return false;
      }

      const request = await fetch(
        `${Global.url}persons/assigned/${personData._id}`,
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
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getDevices();
  }, [personData]);

  return (
    <div className="card glass h-100 w-100 align-items-center justify-content-center position-relative text-decoration-none">
      <div className="card-header">Equipos asignados</div>
      <div className="card-body w-100 d-flex flex-column">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4 mx-3">
          {devices.map((item) => (
            <div key={item._id} className="col">
              <CardDevice device={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListDevicesAssined;
