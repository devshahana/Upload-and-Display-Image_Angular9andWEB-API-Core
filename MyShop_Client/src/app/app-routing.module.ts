import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './Employee/employees/employees.component';
import { UserregistrationComponent } from './Users/userregistration/userregistration.component';
import { LoginComponent } from './Users/login/login.component';
import { HomeComponent } from './home/home.component';
import{ AuthGuardGuard } from './auth-guard.guard'
  import { from } from 'rxjs';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuardGuard]},
  {path:"view",component:EmployeesComponent},
  {path:"register",component:UserregistrationComponent},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
