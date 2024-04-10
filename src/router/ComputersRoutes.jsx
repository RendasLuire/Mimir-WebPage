import { Route, Routes } from "react-router-dom";
import InventoryComputers from "../pages/computer/InventoryComputers";
import DetailsComputer from "../pages/computer/DetailsComputer";

const ComputersRoutes = () => {
  return (
    <Routes>
      <Route index element={<InventoryComputers />} />
      <Route path="/" element={<InventoryComputers />} />
      <Route path="/details/:id" element={<DetailsComputer />} />
    </Routes>
  );
};

export default ComputersRoutes;
