import { Route, Routes } from "react-router-dom";
import InventoryPrinters from "../pages/printers/InventoryPrinters/InventoryPrinters";

const PrintersRouters = () => {
  return (
    <Routes>
      <Route index element={<InventoryPrinters />} />
      <Route path="/" element={<InventoryPrinters />} />
    </Routes>
  );
};

export default PrintersRouters;
