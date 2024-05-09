import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [deviceData, setDeviceData] = useState({});
  const [update, setUpdate] = useState(false);

  const updateData = async () => {
    if (!deviceData._id) {
      return false;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(Global.url + "device/" + deviceData._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      const { data } = response;

      setDeviceData(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    updateData();
    setUpdate(false);
  }, [deviceData, update]);

  return (
    <DeviceContext.Provider value={{ deviceData, setDeviceData, setUpdate }}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceContext;
