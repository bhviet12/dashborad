export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image?: string
  sku: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface ProductCategory {
  id: string
  name: string
  productCount: number
}