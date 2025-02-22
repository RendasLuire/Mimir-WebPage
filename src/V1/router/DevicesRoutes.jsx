import { Route, Routes } from "react-router-dom";
import InventoryDevices2 from "../pages/device/InventoryDevices/InventoryDevices";
import DetailsDevices2 from "../pages/device/DetailDevice/DetailsDevice";
import { DeviceProvider } from "../context/DeviceProvider";

const DevicesRoutes = () => {
  return (
    <DeviceProvider>
      <Routes>
        <Route path="/" element={<InventoryDevices2 />} />
        <Route path="/v2/" element={<InventoryDevices2 />} />
        <Route path="/v2/details/:id" element={<DetailsDevices2 />} />
      </Routes>
    </DeviceProvider>
  );
};

export default DevicesRoutes;
