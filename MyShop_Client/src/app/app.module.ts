import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,FormGroup,ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './Employee/employees/employees.component';
import { UserregistrationComponent } from './Users/userregistration/userregistration.component';
import { LoginComponent } from './Users/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth.interceptor';
import { UserServiceService } from './Shared/user-service.service';
import { CategoriesComponent } from './Category/categories/categories.component';
import { SpecComponent } from './Products/spec/spec.component';
import { ProductComponent } from './Products/product/product.component';
import { OrderComponent } from './Orders/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    UserregistrationComponent,
    LoginComponent,
    HomeComponent,
    CategoriesComponent,
    SpecComponent,
    ProductComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule,ReactiveFormsModule 
  ],
  providers: [UserServiceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
