import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface CartDetail {
  _id: string;
  orderId?: unknown;
  productId: string;
  quantity: number;
  price: number;
  product?: { name: string; price: number };
}

@Component({
  selector: 'app-current-cart',
  standalone: false,
  templateUrl: './current-cart.html',
  styleUrl: './current-cart.css',
})
export class CurrentCartComponent implements OnInit {
  order: unknown = null;
  details: CartDetail[] = [];
  isCustomer = false;
  modalMessage = '';
  showModal = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.refreshCustomerAndLoadCart();
    // Chạy lại sau một tick để tránh load chưa kịp (phải bấm 2 lần reload)
    queueMicrotask(() => this.refreshCustomerAndLoadCart());
  }

  private refreshCustomerAndLoadCart() {
    const user = this.auth.user();
    this.isCustomer = user?.role === 'customer';
    if (this.isCustomer && user) {
      this.loadCart();
    }
  }

  private loadCart() {
    const user = this.auth.user();
    if (user?.role !== 'customer') return;
    this.api.getCart(user.id).subscribe({
      next: (res) => {
        this.order = res.order;
        this.details = (res.details || []) as CartDetail[];
        this.cdr.markForCheck();
      },
    });
  }

  updateQty(d: CartDetail) {
    this.api.updateCartItem(d._id, d.quantity).subscribe({
      next: () => {},
      error: () => this.loadCart(),
    });
  }

  remove(d: CartDetail) {
    this.api.removeCartItem(d._id).subscribe({
      next: () => this.loadCart(),
    });
  }

  onModalClose() {
    this.showModal = false;
    this.loadCart();
    this.cdr.markForCheck();
  }

  pay() {
    const o = this.order as { _id: string };
    if (!o?._id) return;
    this.api.payment(o._id).subscribe({
      next: (r) => {
        this.modalMessage = 'Payment success.\nTotal: ' + (r.totalAmount?.toLocaleString() ?? '0') + ' VNĐ';
        this.showModal = true;
        this.cdr.markForCheck();
      },
      error: () => {
        this.modalMessage = 'Payment failed';
        this.showModal = true;
        this.cdr.markForCheck();
      },
    });
  }
}
