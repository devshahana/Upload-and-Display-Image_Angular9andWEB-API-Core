import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadimageService {

  constructor(private http:HttpClient) { }
  post(){
    const formData=new FormData();
   // formData.append("Image",)
  }
}
