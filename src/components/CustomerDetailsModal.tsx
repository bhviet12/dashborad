import CloseIcon from '@mui/icons-material/Close'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import type { Customer } from '../types/customer.type'

interface CustomerDetailsModalProps {
  customer: Customer | null
  isOpen: boolean
  onClose: () => void
}

export default function CustomerDetailsModal({
  customer,
  isOpen,
  onClose,
}: CustomerDetailsModalProps) {
  if (!isOpen || !customer) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
            <p className="text-sm text-gray-500 mt-1">Customer ID: {customer.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{customer.name}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <EmailIcon className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{customer.email}</p>
                </div>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-3">
                  <PhoneIcon className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{customer.phone}</p>
                  </div>
                </div>
              )}
              {customer.address && (
                <div className="flex items-center gap-3">
                  <LocationOnIcon className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm text-gray-900">{customer.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{customer.totalOrders}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-gray-800">${customer.totalSpent.toLocaleString()}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {customer.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Member Since</span>
              <span className="text-sm text-gray-900">{new Date(customer.createdAt).toLocaleDateString()}</span>
            </div>
            {customer.lastOrderDate && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Order</span>
                <span className="text-sm text-gray-900">{new Date(customer.lastOrderDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Average Order Value</span>
              <span className="text-sm text-gray-900">
                ${(customer.totalSpent / customer.totalOrders).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}