import React from "react";
import { Route, Routes } from "react-router-dom";
import settingsPage from "../pages/settingsUser/settingsPage";

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route index element={<h1>hola</h1>} />
      <Route path="/" element={<h1>hola</h1>} />
      <Route path="/algo" element={<settingsPage />} />
    </Routes>
  );
};

export default SettingsRoutes;
