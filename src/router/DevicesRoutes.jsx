import { Route, Routes } from "react-router-dom";
import InventoryDevices from "../pages/device/InventoryDevice/InventoryDevices";
import DetailsDevices from "../pages/device/DetailsDevice";
import DetailsDevices2 from "../pages/device/DetailDevice/DetailsDevice";
import { DeviceProvider } from "../context/DeviceProvider";

const DevicesRoutes = () => {
  return (
    <DeviceProvider>
      <Routes>
        <Route index element={<InventoryDevices />} />
        <Route path="/" element={<InventoryDevices />} />
        <Route path="/details/:id" element={<DetailsDevices />} />
        <Route path="/details/v2/:id" element={<DetailsDevices2 />} />
      </Routes>
    </DeviceProvider>
  );
};

export default DevicesRoutes;
