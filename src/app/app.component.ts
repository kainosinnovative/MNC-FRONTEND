import { Component,ElementRef,VERSION, ViewChild } from '@angular/core';
import { OnInit } from  '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HostListener } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SelectcityComponent } from './selectcity/selectcity.component';
import { EventEmitterService } from './event-emitter.service';
import { DatePipe } from '@angular/common';
import { RestApiService } from "./shared/rest-api.service";
import { ToastrService } from 'ngx-toastr';
import { FormControl } from "@angular/forms";
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
// import * as data from '.../server/db';
// import { TestimonialAddComponent } from './testimonial-add/testimonial-add.component';
// import { OtpverfiedComponent } from './otpverfied/otpverfied.component';

// var num2: any;
// var num1 = localStorage.getItem('currentUsername');
//         if(num1 == "" || num1 == null) {
//             num2 = 0;
//         }
//         else {
//             num2 = num1;
//         }

@HostListener('window:unload', ['$event'])


export class Service {
  apiURL = 'http://localhost/MNC-PHP-API';
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    let city= localStorage.getItem('selectedCity');
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(this.apiURL+'/shop/getallshoplist?city_id='+city).pipe(tap(data => this.opts = data))

  }

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})


export class AppComponent implements OnInit{

  filteredOptions: Observable<any[]>;

  myControl = new FormControl();
  
  currentUserId = localStorage.getItem('currentUserId');

  currentUsername = localStorage.getItem('currentUsername');

  userroleSes = localStorage.getItem('userroleSes');



shoplogo:any;
  title = 'angular6-sidenav-example';
  cont_id: any;
  cityid: any;
  cityname:any;
  // topScroll: any;
  date1:any;
  currenttime:any;
  ShopHolidaysDetails:any;
  ShopHolidaysDetails1:any;

  dashboardShop:any;
  dashboardShop1:any;
  carDetailsById:any;
   carDetailsById1:any;
   dashboardShopoffer1:any;
   customerId:any;
   CustomerWhislistData:any;
   CustomerWhislistData1:any;
   dashboardShopoffer:any;
   Observable:any
  service: any;
  response: any;
   //dashboardShopoffer1:any;

constructor(private  dialog:  MatDialog, private  router:  Router,private eventEmitterService: EventEmitterService,
  public datepipe: DatePipe,public restApi: RestApiService,private toastr: ToastrService ){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       })
    )
  }
  closemenu() {
    console.log("hi")
    // this.cont_id.nativeElement.classList.add('mat-drawer-container mat-sidenav-container mat-drawer-transition')
  //   let element = document.getElementById("cont_id");
  //   myTag = this.el.nativeElement.querySelector("li");
  // element.classList.remove("mystyle");
    // document.getElementById("cont_id").classList.remove("mat-drawer-container mat-sidenav-container mat-drawer-transition");
  }


  ngOnInit(): void {

    this.loadcarDetailsById();
    // this.dashboardShop1='';
    this.dashboardShopoffer1='';
    this.date1=new Date();
  
    
    this.currenttime = this.datepipe.transform(this.date1, 'HH:mm');
    
    this.shoplogo = localStorage.getItem('shoplogo');
    //  var cityid:any;
    this.cityid = localStorage.getItem('selectedCity');
    this.cityname=localStorage.getItem('selectedCityname');

 

  //  alert(this.cityid);
    if(this.cityid == null ){
      this.cityid = 3;
      this.cityname="Arakkonam";
      localStorage.setItem('selectedCity',this.cityid);
      localStorage.setItem('selectedCityname',this.cityname);
    }
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeFirstComponentFunction.subscribe(() => {
        this.login();
        this.loginCheck1();
      });
    }

    this.getholidaysForAll();


  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
      //  map(response => response.filter((option:any) => {
      //    return option.name1.toLowerCase().indexOf(val.toLowerCase()) >-1
      //  }))
     )
   }

  onActivate(event:any) {

 }

  login(){
    console.log("hiiiii1111");
       this.dialog.open(LoginComponent,{disableClose: true});
    console.log("test>>>>",localStorage.getItem('isLoggedIn'))
  }

    signup(){
      console.log("hiiiii1111");
         this.dialog.open(SignupComponent);
      // console.log("test>>>>",localStorage.getItem('isLoggedIn'))

  //   const foo = {
  //     "results": [{
  //           "id": 12,
  //           "name": "Test"
  //        },
  //        {
  //           "id": 2,
  //           "name": "Beispiel"
  //        },
  //        {
  //           "id": 3,
  //           "name": "Sample"
  //        }
  //     ]
  //  };
  //  console.log(foo.results.find(item => item.name === "Beispiel"))


}

Otpvrf(){
  console.log("hiiiii1111");
    //  this.dialog.open(OtpverfiedComponent);
  // console.log("test>>>>",localStorage.getItem('isLoggedIn'))
}

logout() {


  // window.location.reload();
  this.movetohome();

}

movetohome() {
  let userroleSes = localStorage.getItem('userroleSes');
  // alert(userroleSes)
  if(userroleSes == 'CustomerSes'){
    window.localStorage.clear();
    this.router.navigate(['/home']);
  }
  if(userroleSes == 'shopOwnerSes'){
    window.localStorage.clear();
    this.router.navigate(['/shoplogin']);
  }

  window.setTimeout(function(){location.reload()},100)
}

loginCheck() {
  // alert("shop")
  localStorage.removeItem("loginfor");
  localStorage.setItem('loginfor','shopowner');
}

loginCheck1() {
  // alert("customer")
  localStorage.removeItem("loginfor");
  localStorage.setItem('loginfor','customer');
}


selectcity(){

     this.dialog.open(SelectcityComponent,{disableClose: true});

}

getholidaysForAll() {
        
  this.restApi.getholidaysForAll().subscribe((res)=>{
    this.ShopHolidaysDetails = res
 
    this.ShopHolidaysDetails1 = this.ShopHolidaysDetails;
    console.log("ShopHolidaysDetails1>>>",this.ShopHolidaysDetails1);
  //  this.MoveShopHoliday();
    // this.MoveShopOfferHoliday();
  }
  );
}

 closing = false;
bookingRedirect() {
  let shop_id = localStorage.getItem('currentUserId');

  for(var i=0;i < this.ShopHolidaysDetails1.length;i++) {
    
    if(shop_id == this.ShopHolidaysDetails1[i].shop_id) {
      // alert("hi");
      if (this.currenttime > this.ShopHolidaysDetails1[i].leave_timing_from	 && this.currenttime < this.ShopHolidaysDetails1[i].leave_timing_to)
{
      this.closing = true;
      this.toastr.error('your shop is closed today from ' + this.ShopHolidaysDetails1[i].leave_timing_from + " to " + this.ShopHolidaysDetails1[i].leave_timing_to);
}
    }
  }
  // alert(this.closing);
if(this.closing == false) {
this.router.navigate(['/shopownerOnlineBooking/'+shop_id]);
}
}

loadcarDetailsById(){

  let currentUserId = localStorage.getItem('currentUserId');
  return this.restApi.CarDetailsById(currentUserId).subscribe((data: {}) => {
    // alert(data)
    this.carDetailsById = data;
    this.carDetailsById1 = this.carDetailsById.data.CarDetailsByCustomerId;
    console.log("carDetailsById1>>>",this.carDetailsById1)
    this.MovecarDetailsById();
    this.MovecarDetForOffer();
  })
}

MovecarDetailsById() {
        
  if(this.carDetailsById1 != undefined) {
  for(var i=0;i < this.carDetailsById1.length;i++) {

    for(var j=0;j < (this.dashboardShop1.length);j++) {
      if(this.dashboardShop1[j].model_id == this.carDetailsById1[i].model){
        
        var newNum = "modelAvail";
        var newVal = "Available";
        this.dashboardShop1[j][newNum] = newVal;
      }
      
     
    }

  }
}

  console.log("car avl>>>",this.dashboardShop1);
}

MovecarDetForOffer() {
        
  if(this.carDetailsById1 != undefined) {
  for(var i=0;i < this.carDetailsById1.length;i++) {

    for(var j=0;j < (this.dashboardShopoffer1.length);j++) {
      if(this.dashboardShopoffer1[j].model_id == this.carDetailsById1[i].model){
        // alert(this.dashboardShop1[j].model_id);
        var newNum = "modelAvail";
        var newVal = "Available";
        this.dashboardShopoffer1[j][newNum] = newVal;
      }
      
      //console.log("val",this.dashboardShop1);
      // this.datecheckArr.push(ShopHolidaysDetails1[i])
     
    }

  }
}


  
  console.log("car avl dashboardShopoffer1>>>",this.dashboardShopoffer1);
}

customerWhislist(customerId:any)
{
  var whislist : [];
  let selectedcity=localStorage.getItem('selectedCity');

  return this.restApi.getCustomerWhislist(customerId,selectedcity).subscribe((data: {}) => {
    // alert(data)
    this.CustomerWhislistData = data;
    this.CustomerWhislistData1= this.CustomerWhislistData.data;

    console.log("whislist",this.CustomerWhislistData1);
    // this.dtTrigger.next();
    this.MoveWishlistCheck();
    this.MoveWishlistOfferCheck();
  })

}



  onSelFunc(option: any){

   console.log(option);
  let city1= localStorage.getItem('selectedCity');
 return this.restApi.dashboardShopSearch(option,city1).subscribe((data: {}) => {
   //alert(data)
    this.dashboardShop = data;
    this.dashboardShop1 = this.dashboardShop.data.dashboardShopSearch;
    console.log("data dashboard>>>",this.dashboardShop1);
    if(!this.dashboardShop1)
    {
      this.dashboardShop1='';
    }
    this.getholidaysForAll();
    this.loadcarDetailsById();
    this.customerId= localStorage.getItem('currentUserId');
 console.log(this.customerId);
  if(this.customerId != null)
  {
  this.customerWhislist(this.customerId);
  }
  })
}

MoveWishlistCheck() {
  //console.log("after ws val",this.dashboardShop1);
  if(this.CustomerWhislistData1 != undefined) {
  for(var i=0;i < this.CustomerWhislistData1.length;i++) {

    for(var j=0;j < (this.dashboardShop1.length);j++) {
      if(this.dashboardShop1[j].shop_id == this.CustomerWhislistData1[i].whislist){
        var newNum = "wishlistcheck";
        var newVal = "Yes";
        this.dashboardShop1[j][newNum] = newVal;
      }
      
    }

  }
}
  console.log("val1>>>",this.dashboardShop1);
}


MoveWishlistOfferCheck() {
  //console.log("after ws val",this.dashboardShop1);
  if(this.CustomerWhislistData1 != undefined) {
  for(var i=0;i < this.CustomerWhislistData1.length;i++) {

    for(var j=0;j < (this.dashboardShopoffer1.length);j++) {
      if(this.dashboardShopoffer1[j].shop_id == this.CustomerWhislistData1[i].whislist){
        var newNum = "wishlistcheck";
        var newVal = "Yes";
        this.dashboardShopoffer1[j][newNum] = newVal;
      }
      
    }

  }
}
  console.log("MoveWishlistOfferCheck>>>",this.dashboardShopoffer1);
}

onSelFunc1(option: any){
  console.log(option);
  let city1= localStorage.getItem('selectedCity');
  return this.restApi.dashboardShopSearchoffer(option,city1).subscribe((data: {}) => {
    //alert(data)
     this.dashboardShopoffer = data;
     this.dashboardShopoffer1 = this.dashboardShopoffer.data.dashboardShopDetailsByOffer;

     console.log("data dashboard1>>>",this.dashboardShopoffer1);
     this.getholidaysForAll();

     this.customerId= localStorage.getItem('currentUserId');
 console.log(this.customerId);
  if(this.customerId != null)
  {
  this.customerWhislist(this.customerId);
  }
   })

}


}
  // function signup() {
  //   throw new Error('Function not implemented.');
  // }

