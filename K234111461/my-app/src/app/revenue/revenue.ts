import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revenue',
  standalone: false,
  templateUrl: './revenue.html',
  styleUrl: './revenue.css'
})
export class RevenueComponent implements OnInit {
  year = '';
  data: { revenue: number; orderCount: number; year: string } | null = null;
  byYear: { _id: number; totalRevenue: number; count: number }[] = [];
  isEmployee = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.refreshAndLoadRevenue();
    queueMicrotask(() => this.refreshAndLoadRevenue());
  }

  private refreshAndLoadRevenue() {
    this.isEmployee = this.auth.user()?.role === 'employee';
    if (this.isEmployee) {
      this.load();
      this.api.getRevenueByYear().subscribe({
        next: (res) => {
          this.byYear = res || [];
          this.cdr.markForCheck();
        }
      });
    }
  }

  load() {
    const y = this.year || undefined;
    this.api.getRevenue(y).subscribe({
      next: (res) => {
        this.data = res;
        this.cdr.markForCheck();
      }
    });
  }
}
