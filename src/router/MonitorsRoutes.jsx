import { Route, Routes } from "react-router-dom";
import InventoryMonitors from "../pages/monitors/InventoryMonitors";

const MonitorsRoutes = () => {
  return (
    <Routes>
      <Route index element={<InventoryMonitors />} />
      <Route path="/" element={<InventoryMonitors />} />
    </Routes>
  );
};

export default MonitorsRoutes;
