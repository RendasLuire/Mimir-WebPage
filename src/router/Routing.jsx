import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/user/Login";
import { AuthProvider } from "../context/AuthProvider";
import PublicLayout from "../Components/layout/public/PublicLayout";
import PrivateLayout from "../Components/layout/private/PrivateLayout";
import ComputersRoutes from "./ComputersRoutes";
import UsersRoutes from "./UsersRoutes";

const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/inventory" element={<PrivateLayout />}>
            <Route
              path="/inventory/computers/*"
              element={<ComputersRoutes />}
            />
            <Route path="/inventory/users/*" element={<UsersRoutes />} />
          </Route>
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
