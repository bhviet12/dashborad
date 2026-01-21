import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import type { Order } from '../../types/order.type'

// Mock data - replace with API calls
const mockSalesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
]

const mockRecentOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    items: [{ id: '1', productId: '1', productName: 'Wireless Headphones', quantity: 2, price: 199.99, total: 399.98 }],
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
    items: [{ id: '2', productId: '2', productName: 'Smart Watch', quantity: 1, price: 299.99, total: 299.99 }],
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
    items: [{ id: '3', productId: '1', productName: 'Wireless Headphones', quantity: 3, price: 199.99, total: 599.97 }],
    totalPrice: 2100,
    status: 'paid',
    paymentMethod: 'bank_transfer',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    createdAt: '2024-01-13',
  },
  {
    id: 'ORD-004',
    customerId: '4',
    customerName: 'Alice Williams',
    customerEmail: 'alice.williams@example.com',
    items: [{ id: '4', productId: '3', productName: 'Laptop Stand', quantity: 1, price: 49.99, total: 49.99 }],
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
    items: [{ id: '5', productId: '2', productName: 'Smart Watch', quantity: 1, price: 299.99, total: 299.99 }],
    totalPrice: 1750,
    status: 'paid',
    paymentMethod: 'credit_card',
    shippingAddress: '123 Main St, New York, NY 10001',
    createdAt: '2024-01-11',
  },
]

export default function Overview() {
  const [kpis] = useState([
    { label: 'Total Revenue', value: '$45,231', change: 12.5, trend: 'up' as const, icon: AttachMoneyIcon },
    { label: 'Total Orders', value: '1,234', change: 8.2, trend: 'up' as const, icon: ShoppingCartIcon },
    { label: 'Total Customers', value: '856', change: -2.1, trend: 'down' as const, icon: PeopleIcon },
    { label: 'Growth Rate', value: '23.5%', change: 5.4, trend: 'up' as const, icon: TrendingUpIcon },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trend === 'up' ? '↑' : '↓'} {Math.abs(kpi.change)}%
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Icon className={`text-2xl ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalPrice.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}