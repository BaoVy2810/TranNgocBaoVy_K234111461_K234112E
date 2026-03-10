import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  @Input() isModal = true;
  email = '';
  password = '';
  role: 'customer' | 'employee' = 'customer';
  error = '';
  loading = false;
  @Output() closed = new EventEmitter<void>();

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.data['isModal'] === false) this.isModal = false;
  }

  close() {
    this.closed.emit();
  }

  goRegister() {
    if (this.isModal) this.close();
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.error = '';
    this.loading = true;
    const login$ = this.role === 'customer'
      ? this.api.loginCustomer(this.email, this.password)
      : this.api.loginEmployee(this.email, this.password);

    login$.subscribe({
      next: (res) => {
        this.loading = false;
        this.auth.setUser({
          id: res.id,
          name: res.name,
          email: res.email,
          role: res.role as 'customer' | 'employee'
        });
        if (this.isModal) this.close();
        if (this.role === 'customer') this.router.navigate(['/current-cart']);
        else this.router.navigate(['/shop']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid email or password';
      }
    });
  }
}
