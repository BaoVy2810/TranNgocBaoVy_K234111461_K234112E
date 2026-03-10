import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectComponent } from './redirect/redirect';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ShoppingComponent } from './shopping/shopping';
import { CurrentCartComponent } from './current-cart/current-cart';
import { RevenueComponent } from './revenue/revenue';
import { VipCustomersComponent } from './vip-customers/vip-customers';

const routes: Routes = [
  { path: '', component: RedirectComponent },
  { path: 'login', component: LoginComponent, data: { isModal: false } },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShoppingComponent },
  { path: 'current-cart', component: CurrentCartComponent },
  { path: 'revenue', component: RevenueComponent },
  { path: 'vip-customers', component: VipCustomersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
