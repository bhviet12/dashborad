import { Link, useLocation } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SettingsIcon from '@mui/icons-material/Settings'

const menuItems = [
  { path: '/', label: 'Overview', icon: DashboardIcon },
  { path: '/orders', label: 'Orders', icon: ShoppingCartIcon },
  { path: '/products', label: 'Products', icon: InventoryIcon },
  { path: '/customers', label: 'Customers', icon: PeopleIcon },
  { path: '/analytics', label: 'Analytics', icon: AnalyticsIcon },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="bg-white border-r border-gray-200 h-screen w-64 fixed left-0 top-0 pt-16 shadow-sm z-40 hidden lg:block">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}