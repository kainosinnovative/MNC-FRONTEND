import { Component,ElementRef,VERSION, ViewChild } from '@angular/core';
import { OnInit } from  '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HostListener } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SelectcityComponent } from './selectcity/selectcity.component';
import { EventEmitterService } from './event-emitter.service';
import { FormControl } from "@angular/forms";
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{

  myControl = new FormControl();
  
  currentUserId = localStorage.getItem('currentUserId');

  currentUsername = localStorage.getItem('currentUsername');

  userroleSes = localStorage.getItem('userroleSes');




  title = 'angular6-sidenav-example';
  cont_id: any;
  cityid: any;
  cityname:any;
  // topScroll: any;
constructor(private  dialog:  MatDialog, private  router:  Router,private eventEmitterService: EventEmitterService ){}
  closemenu() {
    console.log("hi")
    // this.cont_id.nativeElement.classList.add('mat-drawer-container mat-sidenav-container mat-drawer-transition')
  //   let element = document.getElementById("cont_id");
  //   myTag = this.el.nativeElement.querySelector("li");
  // element.classList.remove("mystyle");
    // document.getElementById("cont_id").classList.remove("mat-drawer-container mat-sidenav-container mat-drawer-transition");
  }


  ngOnInit(): void {
    
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

bookingRedirect() {
  let shop_id = localStorage.getItem('currentUserId');
this.router.navigate(['/shopownerOnlineBooking/'+shop_id]);
}

// onSelFunc(option: any){

    

//   console.log(option);
//   let city1= localStorage.getItem('selectedCity');
//  return this.restApi.dashboardShopSearch(option,city1).subscribe((data: {}) => {
//    //alert(data)
//     this.dashboardShop = data;
//     this.dashboardShop1 = this.dashboardShop.data.dashboardShopSearch;
//     console.log("data dashboard>>>",this.dashboardShop1);
//     if(!this.dashboardShop1)
//     {
//       this.dashboardShop1='';
//     }
//     this.getholidaysForAll();
//     this.loadcarDetailsById();
//     this.customerId= localStorage.getItem('currentUserId');
//  console.log(this.customerId);
//   if(this.customerId != null)
//   {
//   this.customerWhislist(this.customerId);
//   }
//   })
// }

// onSelFunc1(option: any){
//   console.log(option);
//   let city1= localStorage.getItem('selectedCity');
//   return this.restApi.dashboardShopSearchoffer(option,city1).subscribe((data: {}) => {
//     //alert(data)
//      this.dashboardShopoffer = data;
//      this.dashboardShopoffer1 = this.dashboardShopoffer.data.dashboardShopDetailsByOffer;

//      console.log("data dashboard1>>>",this.dashboardShopoffer1);
//      this.getholidaysForAll();

//      this.customerId= localStorage.getItem('currentUserId');
//  console.log(this.customerId);
//   if(this.customerId != null)
//   {
//   this.customerWhislist(this.customerId);
//   }
//    })

// }


}
  // function signup() {
  //   throw new Error('Function not implemented.');
  // }

