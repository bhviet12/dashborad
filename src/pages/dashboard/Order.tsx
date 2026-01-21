import { useState, useMemo, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import type { Order } from '../../types/order.type'
import OrderDetailsModal from '../../components/OrderDetailsModal'
import Pagination from '../../components/Pagination'
import ExportButton, { exportToCSV } from '../../components/ExportButton'
import { useToast } from '../../hooks/useToast'
import { ToastContainer } from '../../components/Toast'

// Mock data với đầy đủ thông tin
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    items: [
      { id: '1', productId: '1', productName: 'Wireless Headphones', quantity: 2, price: 199.99, total: 399.98 },
      { id: '2', productId: '2', productName: 'Smart Watch', quantity: 1, price: 299.99, total: 299.99 },
    ],
    totalPrice: 1250,
    status: 'paid',
    paymentMethod: 'credit_card',
    shippingAddress: '123 Main St, New York, NY 10001',
    createdAt: '2024-01-15',
  },
  {
    id: 'ORD-002',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    items: [
      { id: '3', productId: '3', productName: 'Laptop Stand', quantity: 1, price: 49.99, total: 49.99 },
    ],
    totalPrice: 890,
    status: 'pending',
    paymentMethod: 'paypal',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
    createdAt: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customerId: '3',
    customerName: 'Bob Johnson',
    customerEmail: 'bob.johnson@example.com',
    items: [
      { id: '4', productId: '1', productName: 'Wireless Headphones', quantity: 3, price: 199.99, total: 599.97 },
      { id: '5', productId: '2', productName: 'Smart Watch', quantity: 2, price: 299.99, total: 599.98 },
    ],
    totalPrice: 2100,
    status: 'shipped',
    paymentMethod: 'bank_transfer',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    createdAt: '2024-01-13',
  },
  {
    id: 'ORD-004',
    customerId: '4',
    customerName: 'Alice Williams',
    customerEmail: 'alice.williams@example.com',
    items: [
      { id: '6', productId: '3', productName: 'Laptop Stand', quantity: 1, price: 49.99, total: 49.99 },
    ],
    totalPrice: 450,
    status: 'cancelled',
    paymentMethod: 'credit_card',
    shippingAddress: '321 Elm St, Houston, TX 77001',
    createdAt: '2024-01-12',
  },
  {
    id: 'ORD-005',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    items: [
      { id: '7', productId: '2', productName: 'Smart Watch', quantity: 1, price: 299.99, total: 299.99 },
    ],
    totalPrice: 1750,
    status: 'delivered',
    paymentMethod: 'credit_card',
    shippingAddress: '123 Main St, New York, NY 10001',
    createdAt: '2024-01-11',
  },
  {
    id: 'ORD-006',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    items: [
      { id: '8', productId: '1', productName: 'Wireless Headphones', quantity: 4, price: 199.99, total: 799.96 },
    ],
    totalPrice: 3200,
    status: 'pending',
    paymentMethod: 'paypal',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
    createdAt: '2024-01-10',
  },
  {
    id: 'ORD-007',
    customerId: '3',
    customerName: 'Bob Johnson',
    customerEmail: 'bob.johnson@example.com',
    items: [
      { id: '9', productId: '3', productName: 'Laptop Stand', quantity: 2, price: 49.99, total: 99.98 },
    ],
    totalPrice: 980,
    status: 'paid',
    paymentMethod: 'cash',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    createdAt: '2024-01-09',
  },
  {
    id: 'ORD-008',
    customerId: '4',
    customerName: 'Alice Williams',
    customerEmail: 'alice.williams@example.com',
    items: [
      { id: '10', productId: '1', productName: 'Wireless Headphones', quantity: 1, price: 199.99, total: 199.99 },
    ],
    totalPrice: 650,
    status: 'pending',
    paymentMethod: 'credit_card',
    shippingAddress: '321 Elm St, Houston, TX 77001',
    createdAt: '2024-01-08',
  },
]

const ITEMS_PER_PAGE = 5

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toasts, removeToast, success } = useToast()

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, statusFilter])

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredOrders, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

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

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : order
    ))
    success(`Order ${orderId} status updated to ${newStatus}`)
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleExport = () => {
    const exportData = filteredOrders.map(order => ({
      'Order ID': order.id,
      'Customer': order.customerName,
      'Email': order.customerEmail,
      'Date': order.createdAt,
      'Amount': order.totalPrice,
      'Status': order.status,
      'Payment Method': order.paymentMethod,
    }))
    exportToCSV(exportData, 'orders')
    success('Orders exported successfully!')
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track all your orders</p>
        </div>
        <ExportButton onExport={handleExport} disabled={filteredOrders.length === 0} />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FilterListIcon className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as typeof statusFilter)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400 mb-2">No orders found</div>
                    <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredOrders.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredOrders.length}
          />
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedOrder(null)
        }}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}