import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { config_url } from '../shared/customer/constant';


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
styleUrls: ['./customer-create.component.scss'],
providers: [DatePipe]
})

export class CustomerCreateComponent implements OnInit {
  


types:any;
profileform : any;



  opened = true;
  opened1 = false;
  imageSrc: string;
  CustomerDataById: any;
  CustomerDataById1:any;
  CustomerDataById2:any;
  CustomerDataById3:any;
  firstname: any;
  myusername: any;

  date: any;
  fetchdata: any;
  fetchdata1: any;
  branddata: any;
  brandtype: any;
  selectedDeviceObj: any;
  selectedcaetype: any;
  carmodelsdata: any;
  element: HTMLElement;
  modelsdata: any;
  selecttypedata: any;
  myuser: any;
 
  cartypedata: any;
  cardata: any;
 
  
  constructor(
    public router: Router,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    public restApi: RestApiService,
    private toastr: ToastrService,public datepipe: DatePipe
   ) {

      
 }

 file=new FormControl('')
  file_data:any=''
 
ngOnInit() { 

  this.readCustomerDataById();
  this.loadcartype();
  this.loadcarbrand();
  element: HTMLElement;

  let currentUserId:any = localStorage.getItem('currentUserId');

  this.date=new Date();
let current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
 
  const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
  const zipcodePattern = "^[1-9][0-9]{5}$";
  this.profileform = this.frmbuilder.group({
    firstname: ['', Validators.required],
     lastname: ['', Validators.required],
    dob: ['', Validators.required],
    doorno: ['', Validators.required],
    state: ['', Validators.required],
     gender: ['', Validators.required],
    
     city: ['', Validators.required],
     street: ['', Validators.required],
    
     fueltype: ['', Validators.required],
     cartype: ['', Validators.required],
     carbrands: ['', Validators.required],
     carcolor: ['', Validators.required],
     carmodel: ['', Validators.required],
     zipcode: ['', [Validators.required, Validators.pattern(zipcodePattern)]],
     emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
    // mobileno:['', [Validators.required, Validators.pattern(mobilePattern)]],
     lastupddt: [current_date, [Validators.required]],
    customer_id:[currentUserId, [Validators.required]]
  
    })    
;}


readCustomerDataById() {
  
  let currentUserId = localStorage.getItem('currentUserId');
  return this.restApi.readCustomerDataById(currentUserId).subscribe((res)=>{
    this.CustomerDataById = res

    
    this.CustomerDataById1 = this.CustomerDataById.data.profile
    console.log(this.CustomerDataById)
    
  }
    
  
  )
  
}


showSuccess() {
  
  this.toastr.success('Customer Feedback Added Successfully!');
}

showError() {
  
  this.toastr.error('Something went wrong!');
}



get f(){
  return this.profileform.controls;
}


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

  
  // alert(this.file_data)

  this.http.post(config_url+'/app/AddCustomerInsert',this.file_data)
      .subscribe(res => {
      //send success response
      }, (err) => {
      //send error response
    });

    // this.toastr.success('Profile Image Successfully');

}


uploadFile(profileform:any)
    {
      
      this.http.post(config_url+'/app/AddCustomerdetails',profileform)
      .subscribe(res => {
      
      }, (err) => {
      
    });
    console.log(profileform);
    this.toastr.success('Profile Updated Successfully');
    // window.location.reload();
    }

    loadcartype(){
    
    
      return this.restApi.getcartype().subscribe((cartypedata: {}) => {
        // alert(data)
        this.fetchdata = cartypedata;
        this.fetchdata1 = this.fetchdata.data.type;
        
        console.log("data>>>>",this.fetchdata1)
      })
    }

    loadcarbrand(){
    
    
      return this.restApi.getcarbrand().subscribe((carbranddata: {}) => {
        // console.log(carbranddata);
         //console.log(hi)
        this.brandtype = carbranddata;
        this.branddata = this.brandtype.data.type;
        
        console.log("data>>>>",this.branddata)
      })
    }

    onChangeObj(newObj: any) {
      console.log(newObj);
      
    
      this.selectedDeviceObj = newObj;
  
      (<HTMLInputElement>document.getElementById("model")).value='';
      this.myusername = (<HTMLInputElement>document.getElementById("cartype")).value;
      console.log(this.myusername);
  
  

      // ... do other stuff here ...

      this.http.get('http://localhost/MNC-PHP-API/app/model?cartype='+this.myusername+ 
  '&brand='+this.selectedDeviceObj).subscribe(
    data => {
      //alert(data)
      console.log(data);
      this.carmodelsdata = data
      this.modelsdata = this.carmodelsdata.data.type;
    },
    error => {
      // alert(error)
      console.log(error.status)
     // if(error.status == "200") {
        //this.showsuccess();
       // this.pagerefresh();
     // }
    }
    );
  }

  onchangecartype(typedata: any) {
    console.log(typedata);
    
  
    this.selecttypedata = typedata;

    (<HTMLInputElement>document.getElementById("model")).value='';
    this.myuser = (<HTMLInputElement>document.getElementById("carbrand")).value;
    console.log(this.myuser);



    // ... do other stuff here ...

    this.http.get('http://localhost/MNC-PHP-API/app/model?brand='+this.myuser+ 
'&cartype='+this.selecttypedata).subscribe(
  data => {
    //alert(data)
    console.log(data);
    this.carmodelsdata = data
    this.modelsdata = this.carmodelsdata.data.type;
  },
  error => {
    // alert(error)
    console.log(error.status)
   // if(error.status == "200") {
      //this.showsuccess();
     // this.pagerefresh();
   // }
  }
  );
}
   
  }
    
   

function newObj(newObj: any) {
  throw new Error('Function not implemented.');
}

