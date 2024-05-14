import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [deviceData, setDeviceData] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateData = async () => {
    if (!deviceData._id) {
      setLoading(false);
      return false;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    updateData();
    setUpdate(false);
  }, [deviceData._id, update]);

  return (
    <DeviceContext.Provider
      value={{ deviceData, setDeviceData, setUpdate, loading }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceContext;
