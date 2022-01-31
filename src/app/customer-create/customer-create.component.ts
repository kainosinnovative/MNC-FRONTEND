import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  
  constructor(
    public router: Router,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    public restApi: RestApiService) {

      
 }
 
ngOnInit() { 
  const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
  this.profileform = this.frmbuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    uploadimage: ['', Validators.required],
    emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
    mobileno:['', [Validators.required, Validators.pattern(mobilePattern)]],
    // updateOn: 'blur'
   
    })    
;}
// addCustomer() {
// this.restApi.createCustomer(this.customerDetails).subscribe((data: {}) => {
// this.router.navigate(['/customercreate'])
// })
// }
sendprofile(profileform: any){}

}

