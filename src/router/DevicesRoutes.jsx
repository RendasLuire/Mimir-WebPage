import { Route, Routes } from "react-router-dom";
import InventoryDevices from "../pages/device/InventoryDevices";
import DetailsDevices from "../pages/device/DetailsDevice";
import { DeviceProvider } from "../context/DeviceProvider";

const DevicesRoutes = () => {
  return (
    <DeviceProvider>
      <Routes>
        <Route index element={<InventoryDevices />} />
        <Route path="/" element={<InventoryDevices />} />
        <Route path="/details/:id" element={<DetailsDevices />} />
      </Routes>
    </DeviceProvider>
  );
};

export default DevicesRoutes;
