import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


var event:string;
var num2: any;
var num1 = localStorage.getItem('isLoggedIn');
        if(num1 == "" || num1 == null) {
            num2 = 0;
        }
        else {
            num2 = num1;
        }

@Component({
selector: 'app-customer-create',
templateUrl: './customer-create.component.html',
styleUrls: ['./customer-create.component.scss']
})

export class CustomerCreateComponent implements OnInit {
  


types:any;
profileform : any;
@Input() customerDetails = { name: '', email: '', phone: num2, gender: '', doorno: '', street: '', area: '', Pincode: '', city: '', landmark: '' }

  opened = true;
  opened1 = false;
  imageSrc: string;
  
  constructor(
    public router: Router,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    public restApi: RestApiService,
    private toastr: ToastrService
   ) {

      
 }

 file=new FormControl('')
  file_data:any=''
 
ngOnInit() { 
 
  const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
  this.profileform = this.frmbuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    dob: ['', Validators.required],
    doorno: ['', Validators.required],
    state: ['', Validators.required],
    gender: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    zipcode: ['', Validators.required],
    emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
    mobileno:['', [Validators.required, Validators.pattern(mobilePattern)]],
    // updateOn: 'blur'
    file: ['', [Validators.required]],
    //fileSource:['', [Validators.required]]
    })    
;}

// sendprofile(profileform: any){
  //const formData = new FormData();
  //formData.append('file', this.profileform.get('fileSource').value);
 
  //this.http.post('http://localhost:8080/MNC-PHP-API/upload.php', formData)
  //  .subscribe(res => {
    //  console.log(res);
     // alert('Uploaded Successfully.');
   // })

  //   this.restApi.createcustomer(profileform).subscribe(data => {
  //     console.log('POST Request is successful ', data);
  //     this.showError();
  // },
  // error => {
  //     console.log('Error', error);
  //     this.showSuccess();
      
      
  // })
    
        
       
          
// }

showSuccess() {
  
  this.toastr.success('Customer Feedback Added Successfully!');
}

showError() {
  
  this.toastr.error('Something went wrong!');
}



get f(){
  return this.profileform.controls;
}
// onFileChange(event: any) {
//   const reader = new FileReader();
  
//   if(event.target.files && event.target.files.length) {
//     const [file] = event.target.files;
//     reader.readAsDataURL(file);
  
//     reader.onload = () => {
 
//       this.imageSrc = reader.result as string;
   
//       this.profileform.patchValue({
//         fileSource: reader.result
//       });
 
//     };
 
//   }
// }

fileChange(event:any) {
    
  const fileList: FileList = event.target.files;
  //check whether file is selected or not
  if (fileList.length > 0) {

      const file = fileList[0];
      //get file information such as name, size and type
      console.log('finfo',file.name,file.size,file.type);
      //max file size is 4 mb
      let currentUserId:any = localStorage.getItem('currentUserId');
      if((file.size/1048576)<=4)
      {
        let formData = new FormData();
        let info={id:2,name:'raja'}
        formData.append('file', file, file.name);
        formData.append('id','2');
        formData.append('tz',new Date().toISOString())
        formData.append('update','2')
        formData.append('info',JSON.stringify(info))
        formData.append('currentUserId',currentUserId)
        this.file_data=formData
        
      }else{
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
      
  }

  
  alert(this.file_data)

  this.http.post('http://localhost/MNC-PHP-API/app/AddCustomerInsert',this.file_data)
      .subscribe(res => {
      //send success response
      }, (err) => {
      //send error response
    });

}


uploadFile(profileform:any)
    {
      
//       this.http.post('http://localhost/MNC-PHP-API/app/AddCustomerInsert',this.profileform)
//       .subscribe(res => {
      
//       }, (err) => {
      
//     });
    }


}

