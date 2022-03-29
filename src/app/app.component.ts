import { Component,ElementRef,VERSION, ViewChild,Injectable } from '@angular/core';
import { OnInit } from  '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavigationEnd, Router,ActivatedRoute,ParamMap, Params } from '@angular/router';
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

// @HostListener('window:unload', ['$event'])
// @Injectable({
//   providedIn: 'root'
// })

// export class Service {
  // apiURL = 'http://localhost/MNC-PHP-API';
  // constructor(private http: HttpClient) { }

  // opts = [];

  // getData() {
  //   let city= localStorage.getItem('selectedCity');
  //   return this.opts.length ?
  //     of(this.opts) :
  //     this.http.get<any>(this.apiURL+'/shop/getallshoplist?city_id='+city).pipe(tap(data => this.opts = data))

  // }

// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})


export class AppComponent implements OnInit{

 

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

  

constructor(private  dialog:  MatDialog, private  router:  Router,private eventEmitterService: EventEmitterService,
  public datepipe: DatePipe,public restApi: RestApiService,private toastr: ToastrService ){
   
  }
  closemenu() {
    console.log("hi")

  }


  ngOnInit(): void {

    
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




}
  // function signup() {
  //   throw new Error('Function not implemented.');
  // }

