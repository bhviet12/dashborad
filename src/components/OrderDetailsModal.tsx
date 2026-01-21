import CloseIcon from '@mui/icons-material/Close'
import type { Order } from '../types/order.type'

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (orderId: string, newStatus: Order['status']) => void
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
}: OrderDetailsModalProps) {
  if (!isOpen || !order) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.1
  const shipping = 10
  const total = subtotal + tax + shipping

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
            <p className="text-sm text-gray-500 mt-1">Order ID: {order.id}</p>
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
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Name:</span> {order.customerName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {order.customerEmail}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Order Status</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {onStatusChange ? (
                  <select
                    value={order.status}
                    onChange={(e) => {
                      onStatusChange(order.id, e.target.value as Order['status'])
                      onClose()
                    }}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg border-0 ${getStatusColor(order.status)} cursor-pointer w-full`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={`px-3 py-2 text-sm font-semibold rounded-full inline-block ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-800">{order.shippingAddress}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h3>
              <p className="text-sm text-gray-800 capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Order Date</h3>
              <p className="text-sm text-gray-800">{new Date(order.createdAt).toLocaleString()}</p>
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