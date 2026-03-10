import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface Product {
  _id: string;
  name: string;
  price: number;
  model?: string;
  madeBy?: string;
}

@Component({
  selector: 'app-shopping',
  standalone: false,
  templateUrl: './shopping.html',
  styleUrl: './shopping.css'
})
export class ShoppingComponent implements OnInit {
  products: Product[] = [];
  minPrice = '';
  maxPrice = '';
  qtyMap: Record<string, number> = {};
  isLoggedIn = false;
  modalMessage = '';
  showModal = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.refreshAndLoadProducts();
    queueMicrotask(() => this.refreshAndLoadProducts());
  }

  private refreshAndLoadProducts() {
    this.isLoggedIn = !!this.auth.user();
    this.loadProducts();
  }

  loadProducts() {
    const min = this.minPrice && this.minPrice !== '' ? +this.minPrice : undefined;
    const max = this.maxPrice && this.maxPrice !== '' ? +this.maxPrice : undefined;
    if (min != null || max != null) {
      this.api.getProductsFilter(min, max).subscribe({
        next: (res) => this.setProducts(res as Product[])
      });
    } else {
      this.api.getProducts().subscribe({
        next: (res) => this.setProducts(res as Product[])
      });
    }
  }

  private setProducts(list: Product[]) {
    this.products = list;
    list.forEach((p) => {
      if (this.qtyMap[p._id] == null) this.qtyMap[p._id] = 1;
    });
    this.cdr.markForCheck();
  }

  search() {
    this.loadProducts();
  }

  onModalClose() {
    this.showModal = false;
    this.cdr.markForCheck();
  }

  buy(p: Product) {
    const user = this.auth.user();
    if (!user || user.role !== 'customer') {
      this.router.navigate(['/login']);
      return;
    }
    // Mặc định 1; nếu user chỉnh quantity thì dùng số đó
    const qty = Math.max(1, Number(this.qtyMap[p._id]) || 1);
    this.api.addToCart(user.id, p._id, qty).subscribe({
      next: () => {
        this.modalMessage = 'Added to cart';
        this.showModal = true;
        this.cdr.markForCheck();
      },
      error: () => {
        this.modalMessage = 'Failed to add to cart';
        this.showModal = true;
        this.cdr.markForCheck();
      }
    });
  }
}
