import { Component } from '@angular/core';
import { OnInit } from  '@angular/core';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HostListener } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
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
export class AppComponent {

  currentUsername = localStorage.getItem('currentUsername');
  
  
  title = 'angular6-sidenav-example';
  cont_id: any;
constructor(private  dialog:  MatDialog, private  router:  Router){}
  closemenu() {
    console.log("hi")
    // this.cont_id.nativeElement.classList.add('mat-drawer-container mat-sidenav-container mat-drawer-transition')
  //   let element = document.getElementById("cont_id");
  //   myTag = this.el.nativeElement.querySelector("li");
  // element.classList.remove("mystyle");
    // document.getElementById("cont_id").classList.remove("mat-drawer-container mat-sidenav-container mat-drawer-transition");
  }

  login(){
    console.log("hiiiii1111");
       this.dialog.open(LoginComponent);
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
  window.localStorage.clear();
  window.location.reload();
}


    
}
  // function signup() {
  //   throw new Error('Function not implemented.');
  // }

