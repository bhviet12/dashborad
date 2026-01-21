export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive'
  createdAt: string
  lastOrderDate?: string
}

export interface CustomerActivity {
  id: string
  customerId: string
  type: 'order' | 'login' | 'profile_update'
  description: string
  createdAt: string
}