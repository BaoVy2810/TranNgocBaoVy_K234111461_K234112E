import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StudentInfoComponent } from './student-info/student-info';
import { LoginComponent } from './login/login';
import { ShoppingComponent } from './shopping/shopping';
import { CurrentCartComponent } from './current-cart/current-cart';
import { RevenueComponent } from './revenue/revenue';
import { VipCustomersComponent } from './vip-customers/vip-customers';
import { RegisterComponent } from './register/register';
import { RedirectComponent } from './redirect/redirect';
import { AlertModalComponent } from './alert-modal/alert-modal';

@NgModule({
  declarations: [
    App,
    RedirectComponent,
    AlertModalComponent,
    StudentInfoComponent,
    LoginComponent,
    ShoppingComponent,
    CurrentCartComponent,
    RevenueComponent,
    VipCustomersComponent,
    RegisterComponent,
  ],
imports: [
   BrowserModule,
   CommonModule,
   FormsModule,
   AppRoutingModule,
   HttpClientModule,
   ReactiveFormsModule,
   RouterModule
],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
