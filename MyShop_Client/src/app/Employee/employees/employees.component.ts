import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpRequest,HttpResponse,HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
imageUrl:string="assets/Image/Capture.JPG";
uploadedFiles:File=null;
public progress: number;
  public message: string;
  employeeList;
  constructor(private htpp:HttpClient) { }

  ngOnInit(): void {
  this.Load();
  }
  Load(){
    this.htpp.get("http://localhost:50506/api/Employees")
    .subscribe(data=>{
this.employeeList=data;
console.log(data)

    })
  }
HandleInputFIle(data:FileList){
  console.log(data[0])
this.uploadedFiles= data[0];
console.log(this.uploadedFiles)
 var reader= new FileReader();
  reader.onload=(event:any)=>{
this.imageUrl=event.target.result;

  }
  reader.readAsDataURL(this.uploadedFiles);
}

savedata(caption){
  alert("FF")
  const formData=new FormData();
  console.log(this.uploadedFiles)
  formData.append("Image",this.uploadedFiles,this.uploadedFiles.name)
  formData.append("caption",caption.value)
  console.log(formData.get("caption").valueOf)
  const uploadReq = new HttpRequest('POST', "http://localhost:50506/api/Employees", formData, {
    reportProgress: true,
  });
   this.htpp.request(uploadReq).subscribe(event=>{
    if (event.type === HttpEventType.UploadProgress)
    this.progress = Math.round(100 * event.loaded / event.total);
  else if (event.type === HttpEventType.Response)
    this.message = event.body.toString();
    this.Load();
    caption.value=null;
    this.imageUrl="assets/Image/Capture.JPG";
    
   })
    // this.htpp.post("http://localhost:50506/api/Employees",formData)
    //           .subscribe(data=>{

    //             console.log(data);
    //           })
}
}
