import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API } from "../utils/Urls.js";

const DeviceContext = createContext();

const DeviceProvider = ({ children }) => {
  const [deviceData, setDeviceData] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
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

      const request = await fetch(`${API.devices}/showOne/${deviceData._id}`, {
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
      setError(error);
      return false;
    }
  };

  useEffect(() => {
    loadData();
    setUpdate(false);
  }, [deviceData._id, deviceData.serialNumber, update]);

  return (
    <DeviceContext.Provider
      value={{ deviceData, setDeviceData, setUpdate, loading, error }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
DeviceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DeviceProvider, DeviceContext };
