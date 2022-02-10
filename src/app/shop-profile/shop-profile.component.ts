import { Component, OnInit } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.scss'],
  providers: [DatePipe]
})
export class ShopProfileComponent implements OnInit {
shopprofile : any;
date: any;
ShopProfileDetails :any;
ProfileDataByIdObject:any;
ProfileDataById:any;
file_data:any='';
file=new FormControl('')

opened = true;
opened1 = false;
imageSrc: string;
citytype: any;
  citydata: any;
  statetype: any;
  statedata: any;
  constructor(public router: Router,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    public restApi: RestApiService,
    private toastr: ToastrService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.readProfileDataById();
  let currentShopId:any = localStorage.getItem('currentUserId');
  this. loadcitylist();
  this.getstatedata();
  this.date=new Date();
let current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  const aadharPattern="^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";
  const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
  const zipcodePattern = "^[1-9][0-9]{5}$";
  this.shopprofile = this.frmbuilder.group({
    name:['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    dob: ['', Validators.required],
    doorno: ['', Validators.required],
    state: ['', Validators.required],
    gender: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
   // aadharno: ['', Validators.required],
     aadharno: ['', [Validators.required, Validators.pattern(aadharPattern)]],
    zipcode: ['', [Validators.required, Validators.pattern(zipcodePattern)]],
     emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
     mobileno:['', [Validators.required, Validators.pattern(mobilePattern)]],
    lastupddt: [current_date, [Validators.required]],
    shop_id:[currentShopId, [Validators.required]]
  
    })    
;
  }
  readProfileDataById() {
  
    let currentShopId = localStorage.getItem('currentUserId');
    return this.restApi.readShopProfileDataById(currentShopId).subscribe((res)=>{
      this.ProfileDataByIdObject = res
  
      
      this.ShopProfileDetails = this.ProfileDataByIdObject.data.profile
      console.log(this.ShopProfileDetails)
      
    }
      
    
    )
    
  }

  uploadFile(shopprofile:any)
  {
    this.http.post(config_url+'/shop/AddShopdetails',shopprofile)
    .subscribe(res => {
    
    }, (err) => {
   
  });

  this.toastr.success('Profile Updated Successfully');
  // window.setTimeout(function(){location.reload()},100)
  // window.location.reload();
  }  
  get f(){
    return this.shopprofile.controls;
  }
  fileChange(event:any) {
    let usertype:any;
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
          formData.append('shopownersession',"shopowner")
          this.file_data=formData
          
        }
   
        
    }
    this.http.post(config_url+'/app/AddCustomerInsert',this.file_data)
    .subscribe(res => {
    //send success response
    }, (err) => {
    //send error response
  });

  
  }    
  loadcitylist(){
    
    
    return this.restApi.getcitylist().subscribe((citylistdata: {}) => {
   
     // console.log(citylistdata)
      this.citytype = citylistdata;

      console.log(this.citytype)
  //console.log("hi")
      this.citydata = this.citytype.data.list;
      
       console.log("data>>>>",this.citydata)
    })
  }

  getstatedata(){
  
  
    return this.restApi.getstatelist().subscribe((statelistdata: {}) => {
   
      this.statetype = statelistdata;
     this.statedata = this.statetype.data.list;
      
   console.log("data>>>>",this.statedata)
    })
  }

   
}
