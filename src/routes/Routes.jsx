import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

// Public Pages
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Register from '../pages/Register'

// APP Pages
import DashboardPembeli from '../pages/DashboardPembeli'
import DashboardPedagang from '../pages/DashboardPedagang'
import DashboardAdmin from '../pages/DashboardAdmin'

const MainLayout = () => (
    <MainLayout>
        <Outlet />
    </MainLayout>
)

const AppLayout = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path="/Pembeli" element={<DashboardPembeli />} />
            <Route path="/Penjual" element={<DashboardPedagang />} />
            <Route path="/Admin" element={<DashboardAdmin />} />
        </Route>
    </Routes>
)

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
    </Routes>
  )
}

export default AppRoutes