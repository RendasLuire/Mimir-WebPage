import { Route, Routes } from "react-router-dom";
import InventoryDevices from "../pages/InventoryDevices/InventoryDevices";
import { DeviceProvider } from "../context/DeviceProvider";
import DetailsDevice from "../pages/DetailsDevice/DetailsDevice";

const DevicesRoutes = () => {
  return (
    <DeviceProvider>
      <Routes>
        <Route path="/" element={<InventoryDevices />} />
        <Route path="/:id" element={<DetailsDevice />} />
      </Routes>
    </DeviceProvider>
  );
};

export default DevicesRoutes;
