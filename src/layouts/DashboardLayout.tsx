import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
            <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-bold text-gray-800">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <CloseIcon />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {[
                    { path: '/', label: 'Overview' },
                    { path: '/orders', label: 'Orders' },
                    { path: '/products', label: 'Products' },
                    { path: '/customers', label: 'Customers' },
                    { path: '/analytics', label: 'Analytics' },
                    { path: '/settings', label: 'Settings' },
                  ].map((item) => (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        )}
        <main className="flex-1 lg:ml-64 pt-16 p-4 lg:p-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden fixed top-20 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <MenuIcon />
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  )
}