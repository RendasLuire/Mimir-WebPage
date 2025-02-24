import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "../components/public/layout/PublicLayout";
import PrivateLayout from "../components/private/layout/PrivateLayout";
import { AuthProvider } from "../context/AuthProvider";
import Login from "../components/public/Login/Login";
import DevicesRoutes from "./DevicesRoutes";
const routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/inventory" element={<PrivateLayout />}>
            <Route path="/inventory/devices/*" element={<DevicesRoutes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default routing;
