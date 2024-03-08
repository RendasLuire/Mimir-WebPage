import { Route, Routes, Navigate } from "react-router-dom"
import NavBar from "./Components/NavBar"
import HomePage from "./pages/HomePage"
import UsersPage from "./pages/UsersPage"
import ComputersPage from "./pages/ComputersPage"
import MonitorsPage from "./pages/MonitorsPage"
import PrintersPage from "./pages/PrintersPage"
import AnnexedsPage from "./pages/AnnexedsPage"
import SettingsPage from "./pages/SettingsPage"

const MimirApp = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage /> } />
          <Route path="/computers" element={<ComputersPage />} />
          <Route path="/monitors" element={<MonitorsPage />} />
          <Route path="/printers" element={<PrintersPage /> } />
          <Route path="/annexeds" element={<AnnexedsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<Navigate to={"/"}/>} />
        </Routes>
      </div>
    </>
  )
}

export default MimirApp
