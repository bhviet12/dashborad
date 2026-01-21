# Ecommerce Dashboard

A comprehensive, modern ecommerce admin dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### 📊 Overview Dashboard
- **KPI Cards**: Total Revenue, Orders, Customers, Growth Rate với trend indicators
- **Interactive Charts**: 
  - Sales Overview (Line Chart)
  - Revenue by Month (Bar Chart)
- **Recent Orders Table**: Hiển thị các đơn hàng gần đây với status indicators

### 📦 Orders Management
- **Complete Order List**: Table với đầy đủ thông tin đơn hàng
- **Advanced Search**: Tìm kiếm theo Order ID, Customer Name, hoặc Email
- **Status Filtering**: Lọc theo status (Pending, Paid, Shipped, Delivered, Cancelled)
- **Order Details Modal**: 
  - Chi tiết đầy đủ về đơn hàng
  - Customer information
  - Order items với pricing breakdown
  - Shipping address
  - Payment method
  - Status management
- **Pagination**: Phân trang với navigation controls
- **Export to CSV**: Xuất dữ liệu orders ra file CSV
- **Status Updates**: Cập nhật status trực tiếp từ table hoặc modal

### 🛍️ Products Management
- **Product Catalog**: Danh sách sản phẩm với đầy đủ thông tin
- **CRUD Operations**: 
  - Create new products
  - Read/View products
  - Update existing products
  - Delete products
- **Advanced Search**: Tìm kiếm theo Name, SKU, hoặc Category
- **Form Validation**: 
  - Required field validation
  - Duplicate SKU checking
  - Price and stock validation
  - Real-time error messages
- **Product Modal**: Form để thêm/sửa sản phẩm với validation
- **Stock Alerts**: Visual indicators cho low stock và out of stock
- **Pagination**: Phân trang cho product list
- **Export to CSV**: Xuất danh sách sản phẩm

### 👥 Customers Management
- **Customer List**: Bảng danh sách khách hàng
- **Customer Stats**: 
  - Total Customers
  - Active Customers
  - Total Revenue
  - Average Order Value
- **Customer Details Modal**: 
  - Complete customer profile
  - Contact information
  - Order history summary
  - Customer statistics
- **Search & Filter**: Tìm kiếm theo name/email, lọc theo status
- **Pagination**: Phân trang cho customer list
- **Export to CSV**: Xuất danh sách khách hàng

### 📈 Analytics
- **Key Metrics Dashboard**: 
  - Total Revenue với trend
  - Total Orders với trend
  - Average Order Value
  - Conversion Rate
- **Multiple Chart Types**:
  - Sales Trend (Line Chart)
  - Revenue by Month (Bar Chart)
  - Sales by Category (Pie Chart)
  - Top Products (Horizontal Bar Chart)
- **Top Products Table**: Bảng sản phẩm bán chạy với progress bars
- **Time Range Selector**: Chọn khoảng thời gian (7d, 30d, 90d, 1y)

### ⚙️ Settings
- **General Settings**: 
  - Store name, email, phone, address
- **Business Settings**:
  - Currency selection
  - Timezone configuration
  - Language selection
  - Tax rate
  - Shipping cost
  - Low stock threshold
- **Notification Settings**:
  - Enable/disable browser notifications
  - Email alerts toggle
- **Save Functionality**: Lưu settings với toast notifications

## 🎨 UI/UX Features

### ✨ Toast Notifications
- Success, Error, Info, Warning notifications
- Auto-dismiss với customizable duration
- Slide-in animations
- Manual dismiss option

### 📱 Responsive Design
- **Mobile-First**: Fully responsive layout
- **Mobile Sidebar**: Hamburger menu cho mobile devices
- **Adaptive Tables**: Horizontal scroll trên mobile
- **Responsive Grids**: Auto-adjusting columns

### 🎯 User Experience
- **Loading States**: Skeleton loaders (ready for implementation)
- **Empty States**: Helpful messages khi không có data
- **Form Validation**: Real-time validation với error messages
- **Smooth Animations**: Transition effects cho better UX
- **Status Indicators**: Color-coded status badges
- **Hover Effects**: Interactive elements với hover states

### 🔍 Search & Filter
- **Real-time Search**: Instant filtering khi typing
- **Multiple Filters**: Filter theo nhiều criteria
- **Search Highlighting**: (Ready for enhancement)

### 📄 Pagination
- **Smart Pagination**: Hiển thị page numbers intelligently
- **Navigation Controls**: Previous/Next buttons
- **Page Info**: Showing X to Y of Z results
- **Responsive**: Works trên mọi screen sizes

### 📥 Export Functionality
- **CSV Export**: Export data ra CSV format
- **Automatic Filename**: Date-stamped filenames
- **All Tables**: Export available cho Orders, Products, Customers

## 🛠️ Technology Stack

- **React 19**: Latest React version
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Material-UI Icons**: Icon library
- **Recharts**: Chart library cho data visualization
- **React Router v7**: Client-side routing
- **Axios**: HTTP client (configured, ready for API integration)

## 📁 Project Structure

```
src/
├── api/              # API client configuration
├── components/       # Reusable components
│   ├── Pagination.tsx
│   ├── Toast.tsx
│   ├── OrderDetailsModal.tsx
│   ├── CustomerDetailsModal.tsx
│   └── ExportButton.tsx
├── hooks/           # Custom React hooks
│   └── useToast.ts
├── layouts/         # Layout components
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── pages/           # Page components
│   └── dashboard/
│       ├── Overview.tsx
│       ├── Order.tsx
│       ├── Products.tsx
│       ├── Customers.tsx
│       ├── Analytics.tsx
│       └── Settings.tsx
├── routes/          # Routing configuration
├── types/           # TypeScript type definitions
│   ├── order.type.ts
│   ├── product.type.ts
│   ├── customer.type.ts
│   └── analytics.type.ts
└── App.tsx          # Main app component
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📝 Features Summary

✅ **Completed Features:**
- [x] Complete dashboard layout với sidebar và header
- [x] Overview page với KPI cards và charts
- [x] Orders management với full CRUD
- [x] Products management với full CRUD
- [x] Customers management
- [x] Analytics với multiple chart types
- [x] Settings page với comprehensive options
- [x] Toast notification system
- [x] Pagination cho tất cả tables
- [x] Export to CSV functionality
- [x] Order details modal
- [x] Customer details modal
- [x] Form validation
- [x] Responsive design
- [x] Search và filtering
- [x] Status management

🔄 **Ready for Enhancement:**
- [ ] Loading states với skeleton loaders
- [ ] Date range picker cho Analytics
- [ ] Image upload cho products
- [ ] Advanced filtering options
- [ ] Bulk operations
- [ ] Dark mode
- [ ] User authentication
- [ ] API integration
- [ ] Real-time updates
- [ ] Print functionality

## 🎯 Next Steps

1. **Connect to Backend API**: Replace mock data với real API calls
2. **Add Authentication**: Implement login và user management
3. **Add Image Upload**: Cho product images
4. **Implement Real-time Updates**: WebSocket integration
5. **Add More Charts**: Additional analytics visualizations
6. **Enhance Search**: Full-text search với highlighting
7. **Add Permissions**: Role-based access control

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS# dashborad
