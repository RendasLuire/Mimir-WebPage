import { Route, Routes } from "react-router-dom";
import InventoryAnnexeds from "../pages/annexed/InventoryAnnexeds";
import DetailsAnnexed from "../pages/annexed/DetailsAnnexed";
import { AnnexedProvider } from "../context/AnnexedProvider";

const AnnexedRoutes = () => {
  return (
    <AnnexedProvider>
      <Routes>
        <Route index element={<InventoryAnnexeds />} />
        <Route path="/" element={<InventoryAnnexeds />} />
        <Route path="/details/:id" element={<DetailsAnnexed />} />
      </Routes>
    </AnnexedProvider>
  );
};

export default AnnexedRoutes;
