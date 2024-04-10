import { Route, Routes } from "react-router-dom";
import InventoryComputers from "../pages/computer/InventoryComputers";
import DetailsComputer from "../pages/computer/DetailsComputer";
import { ComputerProvider } from "../context/ComputerProvider";

const ComputersRoutes = () => {
  return (
    <ComputerProvider>
      <Routes>
        <Route index element={<InventoryComputers />} />
        <Route path="/" element={<InventoryComputers />} />
        <Route path="/details/:id" element={<DetailsComputer />} />
      </Routes>
    </ComputerProvider>
  );
};

export default ComputersRoutes;
