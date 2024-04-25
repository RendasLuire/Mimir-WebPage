import { createContext, useState } from "react";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState({});

  return (
    <DeviceContext.Provider value={{ deviceInfo, setDeviceInfo }}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceContext;
