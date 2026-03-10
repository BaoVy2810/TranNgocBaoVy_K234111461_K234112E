# The Panda Store - API Guide

**Base URL:** `http://localhost:4000`

## Q1: Seed Data (Database Design)
**POST** `/api/seed`  
- Không cần body. Chèn 5 mẫu vào mỗi collection (Category, Product, Employee, Customer, Order, OrderDetails).

---

## Q2-Q5: CRUD APIs (6 collections)

### Category
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/categories` | Tạo mới (body: { name, description }) |
| GET | `/api/categories` | Lấy tất cả |
| GET | `/api/categories/:id` | Lấy theo id |
| PUT | `/api/categories/:id` | Cập nhật |
| DELETE | `/api/categories/:id` | Xóa |

### Product
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/products` | Tạo mới (body: { name, price, model, madeBy, categoryId }) |
| GET | `/api/products` | Lấy tất cả (Q7) |
| GET | `/api/products/:id` | Lấy theo id |
| PUT | `/api/products/:id` | Cập nhật |
| DELETE | `/api/products/:id` | Xóa |

### Employee, Customer, Order, OrderDetails
- Cùng pattern: `/api/employees`, `/api/customers`, `/api/orders`, `/api/orderdetails`
- CRUD: POST, GET (all + :id), PUT :id, DELETE :id

---

## Q8: Search products by price, model, made-by
**GET** `/api/products/search/filter?minPrice=100000&maxPrice=500000&model=PT&madeBy=Vietnam`

---

## Q9-Q10: Cart / Order
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/cart/add` | Thêm sản phẩm vào giỏ. Body: { customerId, productId, quantity } |
| GET | `/api/cart/:customerId` | Xem giỏ hàng |
| PUT | `/api/cart/item/:orderDetailId` | Sửa số lượng. Body: { quantity } |
| DELETE | `/api/cart/item/:orderDetailId` | Xóa item khỏi giỏ |
| POST | `/api/cart/payment/:orderId` | Thanh toán, chuyển status sang paid |

---

## Q11: Revenue Statistics
**GET** `/api/revenue` – Tổng doanh thu  
**GET** `/api/revenue?year=2025` – Doanh thu theo năm  
**GET** `/api/revenue/by-year` – Danh sách revenue theo từng năm  

---

## Q12: VIP Customers
**GET** `/api/vip-customers?n=10` – Top N khách hàng có tổng chi tiêu cao nhất (mặc định n=10)

---

## Q13: Auth (Login)
**POST** `/api/auth/login/customer`  
Body: `{ "email": "cus1@gmail.com", "password": "123" }`  
→ Trả về { id, name, email, role: "customer" }

**POST** `/api/auth/login/employee`  
Body: `{ "email": "emp1@pandastore.com", "password": "123" }`  
→ Trả về { id, name, email, role: "employee" }

---

## Test với Postman
1. Chạy `npm start` hoặc `nodemon index.js`
2. Gọi POST `/api/seed` để tạo dữ liệu mẫu
3. Test từng API theo bảng trên
