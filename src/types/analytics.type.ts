export interface KPIMetric {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down'
  icon?: string
}

export interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

export interface SalesData {
  date: string
  sales: number
  orders: number
  revenue: number
}

export interface ProductPerformance {
  productId: string
  productName: string
  sales: number
  revenue: number
  quantity: number
}