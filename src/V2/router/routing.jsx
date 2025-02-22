import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "../components/public/layout/PublicLayout";
const routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routing;
