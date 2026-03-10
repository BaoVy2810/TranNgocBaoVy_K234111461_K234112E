import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-redirect',
  standalone: false,
  template: '',
})
export class RedirectComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.user()) {
      this.router.navigate(['/shop']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
