import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Overview from '../pages/dashboard/Overview'
import Orders from '../pages/dashboard/Order'
import Products from '../pages/dashboard/Products'
import Customers from '../pages/dashboard/Customers'
import Analytics from '../pages/dashboard/Analytics'
import Settings from '../pages/dashboard/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}