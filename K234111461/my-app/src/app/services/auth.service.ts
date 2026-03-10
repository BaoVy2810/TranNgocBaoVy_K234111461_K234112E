import { Injectable, signal } from '@angular/core';

export type AuthUser = { id: string; name: string; email: string; role: 'customer' | 'employee' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<AuthUser | null>(null);

  setUser(u: AuthUser | null) {
    this.user.set(u);
  }

  logout() {
    this.user.set(null);
  }

  isCustomer() {
    return this.user()?.role === 'customer';
  }

  isEmployee() {
    return this.user()?.role === 'employee';
  }
}
