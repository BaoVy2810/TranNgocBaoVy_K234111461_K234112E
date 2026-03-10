import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-vip-customers',
  standalone: false,
  templateUrl: './vip-customers.html',
  styleUrl: './vip-customers.css',
})
export class VipCustomersComponent implements OnInit {
  customers: { name: string; email: string; totalSpent: number; orderCount: number }[] = [];
  isEmployee = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.refreshAndLoadVip();
    queueMicrotask(() => this.refreshAndLoadVip());
  }

  private refreshAndLoadVip() {
    this.isEmployee = this.auth.user()?.role === 'employee';
    if (this.isEmployee) {
      this.api.getVipCustomers(10).subscribe({
        next: (res) => {
          this.customers = res || [];
          this.cdr.markForCheck();
        },
      });
    }
  }
}
