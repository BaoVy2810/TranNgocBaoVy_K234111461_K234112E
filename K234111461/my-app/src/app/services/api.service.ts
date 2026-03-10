import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:4000/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<unknown[]>(`${API}/products`);
  }

  getProductsFilter(minPrice?: number, maxPrice?: number, model?: string, madeBy?: string) {
    let url = `${API}/products/search/filter?`;
    if (minPrice != null) url += `minPrice=${minPrice}&`;
    if (maxPrice != null) url += `maxPrice=${maxPrice}&`;
    if (model) url += `model=${encodeURIComponent(model)}&`;
    if (madeBy) url += `madeBy=${encodeURIComponent(madeBy)}&`;
    return this.http.get<unknown[]>(url.slice(0, -1));
  }

  loginCustomer(email: string, password: string) {
    return this.http.post<{ id: string; name: string; email: string; role: string }>(
      `${API}/auth/login/customer`,
      { email, password }
    );
  }

  registerCustomer(name: string, email: string, password: string, phone = '', address = '') {
    return this.http.post<{ success: boolean; id: string }>(
      `${API}/customers`,
      { name, email, password, phone, address }
    );
  }

  registerEmployee(name: string, email: string, password: string, phone = '') {
    return this.http.post<{ success: boolean; id: string }>(
      `${API}/employees`,
      { name, email, password, phone }
    );
  }

  loginEmployee(email: string, password: string) {
    return this.http.post<{ id: string; name: string; email: string; role: string }>(
      `${API}/auth/login/employee`,
      { email, password }
    );
  }

  addToCart(customerId: string, productId: string, quantity: number) {
    return this.http.post(`${API}/cart/add`, { customerId, productId, quantity });
  }

  getCart(customerId: string) {
    return this.http.get<{ order: { _id: string }; details: { _id: string; orderId?: unknown; productId: string; quantity: number; price: number; product?: { name: string } }[] }>(
      `${API}/cart/${customerId}`
    );
  }

  updateCartItem(orderDetailId: string, quantity: number) {
    return this.http.put(`${API}/cart/item/${orderDetailId}`, { quantity });
  }

  removeCartItem(orderDetailId: string) {
    return this.http.delete(`${API}/cart/item/${orderDetailId}`);
  }

  payment(orderId: string) {
    return this.http.post<{ success: boolean; totalAmount: number }>(
      `${API}/cart/payment/${orderId}`,
      {}
    );
  }

  getRevenue(year?: string) {
    const url = year ? `${API}/revenue?year=${year}` : `${API}/revenue`;
    return this.http.get<{ revenue: number; orderCount: number; year: string }>(url);
  }

  getRevenueByYear() {
    return this.http.get<{ _id: number; totalRevenue: number; count: number }[]>(
      `${API}/revenue/by-year`
    );
  }

  getVipCustomers(n = 10) {
    return this.http.get<{ name: string; email: string; totalSpent: number; orderCount: number }[]>(
      `${API}/vip-customers?n=${n}`
    );
  }
}
