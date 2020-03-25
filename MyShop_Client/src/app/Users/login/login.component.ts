import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Shared/user-service.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel={
    UserName:'',
    Password:''
  }

  constructor(private service:UserServiceService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")!=null){
      this.router.navigateByUrl("home")
    }

  }
  OnSubmit(form:NgForm){
    console.log(form.value)
    this.service.Login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem("token",res.token)
        
        this.router.navigateByUrl("/home")
      },err=>{
if(err.status==400){
  alert("Invalid credentials")
}

      }
    )
  }
}
