import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Fullname: [''],
    Email: ['', [Validators.required, Validators.email]],

    Password: ['', Validators.required],
    ConfirmPassword: ['']


  })

  ConfirmPasswords(fb: FormGroup) {
    let confirmctrl = fb.get('ConfirmPassword');
    if (confirmctrl.errors == null || 'PasswordMisMatch' in confirmctrl.errors) {
      if (fb.get('Password').value != confirmctrl.value) {
        confirmctrl.setErrors({ PasswordMisMatch: true })
      }
      else {
        confirmctrl.setErrors(null);
      }
    }
  }
  Register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Fullname: this.formModel.value.Fullname,
      Email: this.formModel.value.Email,

      Password: this.formModel.value.Password,

    }
    console.log(body)
    return this.http.post("http://localhost:50506/api/ApplicationUsers", body)
  }
  Login(formData){
    return this.http.post("http://localhost:50506/api/ApplicationUsers/Login", formData)
  }
  GetProfile(){
    var tokenHeader= new HttpHeaders({'Authorization':'Bearer ' +localStorage.getItem('token')}) 
    // return this.http.get("http://localhost:50506/api/ApplicationUsers/profile",{headers:tokenHeader})
    return this.http.get("http://localhost:50506/api/ApplicationUsers/profile")
  }
}
