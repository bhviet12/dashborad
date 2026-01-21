export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  totalPrice: number
  status: 'pending' | 'paid' | 'cancelled' | 'shipped' | 'delivered'
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash'
  shippingAddress: string
  createdAt: string
  updatedAt?: string
}
