import { useContext } from "react";
import DeviceContex from "../context/DeviceProvider";

const useDevice = () => {
  return useContext(DeviceContex);
};

export default useDevice;
