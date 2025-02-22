import { Route, Routes } from "react-router-dom";
import InventoryPrinters from "../pages/printers/InventoryPrinters/InventoryPrinters";
import DetailPrinter from "../pages/printers/DetailPrinter/DetailPrinter";
import { DeviceProvider } from "../context/DeviceProvider";

const PrintersRouters = () => {
  return (
    <DeviceProvider>
      <Routes>
        <Route index element={<InventoryPrinters />} />
        <Route path="/" element={<InventoryPrinters />} />
        <Route path="/v2/details/:id" element={<DetailPrinter />} />
      </Routes>
    </DeviceProvider>
  );
};

export default PrintersRouters;
