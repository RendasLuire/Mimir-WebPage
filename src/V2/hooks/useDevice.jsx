import { useContext } from "react";
import { DeviceContext } from "../context/DeviceProvider";

const useDevice = () => {
  return useContext(DeviceContext);
};

export default useDevice;
