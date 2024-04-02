import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/user/Login";
import PublicLayout from "../Components/layout/public/PublicLayout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/inventory"></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
