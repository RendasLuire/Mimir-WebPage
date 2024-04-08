import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/user/Login";
import PublicLayout from "../Components/layout/public/PublicLayout";
import ListAllComputers from "../Components/computer/ListAllComputers";
import PrivateLayout from "../Components/layout/private/PrivateLayout";
import { AuthProvider } from "../context/AuthProvider";
import ListAllPersons from "../Components/person/ListAllPersons";

const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/inventory/" element={<PrivateLayout />}>
            <Route index element={<ListAllComputers />} />
            <Route path="/inventory/computer" element={<ListAllComputers />} />
            <Route path="/inventory/users" element={<ListAllPersons />} />
          </Route>

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
