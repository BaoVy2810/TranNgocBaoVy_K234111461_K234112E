import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  role: 'customer' | 'employee' = 'customer';
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';
  loading = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.success = '';
    if (!this.name?.trim()) {
      this.error = 'Please enter Name';
      return;
    }
    if (!this.email?.trim()) {
      this.error = 'Please enter Email';
      return;
    }
    if (!this.password) {
      this.error = 'Please enter Password';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Password and Confirm Password do not match';
      return;
    }
    this.loading = true;
    const register$ = this.role === 'customer'
      ? this.api.registerCustomer(this.name, this.email, this.password)
      : this.api.registerEmployee(this.name, this.email, this.password);

    register$.subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.loading = false;
        this.error = 'Registration failed. Email may already exist or server not running.';
      }
    });
  }
}
