import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { UserServiceService } from '../Shared/user-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private service:UserServiceService) { }
userDetails;
  ngOnInit(): void {
    if(localStorage.getItem("token")!=null)
    {
      this.service.GetProfile().subscribe(d=>{
        console.log(d);
        this.userDetails=d;
        
            })
    }
    else
    {
      this.router.navigateByUrl("login")
    }
    
  }
  Logout(){
    
    
    localStorage.removeItem("token");
    this.router.navigateByUrl("login")
  }
}
