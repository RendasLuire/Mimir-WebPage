import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "../components/public/layout/PublicLayout";
import { AuthProvider } from "../context/AuthProvider";
import Login from "../components/public/Login/Login";
const routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default routing;
