import { Route, Routes } from "react-router-dom";
import InventoryPersons from "../pages/person/InventoryPersons";
import DetailsPerson from "../pages/person/DetailsPerson";
import { PersonProvider } from "../context/PersonProvider";

const UsersRoutes = () => {
  return (
    <PersonProvider>
      <Routes>
        <Route index element={<InventoryPersons />} />
        <Route path="/" element={<InventoryPersons />} />
        <Route path="/details/:id" element={<DetailsPerson />} />
      </Routes>
    </PersonProvider>
  );
};

export default UsersRoutes;
