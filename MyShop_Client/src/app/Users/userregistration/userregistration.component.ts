import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Shared/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent implements OnInit {

  constructor(public service:UserServiceService,private router:Router) { }

  ngOnInit(): void {
  }
OnSubmit(){

  this.service.Register().subscribe((res:any)=>{
    console.log(res)
    this.router.navigateByUrl("login");
    if(res.succeded){
      this.service.formModel.reset();
      
    }
    else
    {
      res.errors.array.forEach(element => {
        console.log(element.code)
      });
    }

  },((errors:any)=>{}))
}
}
