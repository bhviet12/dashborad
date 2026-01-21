import { Link } from "react-router-dom"
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import logo from '../assets/vite.svg'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-decoration-none">
            <img src={logo} alt="Logo" className="h-10" />
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <NotificationsIcon />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <AccountCircleIcon />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header