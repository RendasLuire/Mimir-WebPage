import { Route, Routes } from "react-router-dom";
import InventoryDevices from "../pages/InventoryDevices/InventoryDevices";

const DevicesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InventoryDevices />} />
    </Routes>
  );
};

export default DevicesRoutes;
