import { Route, Routes } from "react-router-dom";
import InventoryPersons from "../pages/person/InventoryPersons";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route index element={<InventoryPersons />} />
      <Route path="/inventory/users" element={<InventoryPersons />} />
    </Routes>
  );
};

export default UsersRoutes;
