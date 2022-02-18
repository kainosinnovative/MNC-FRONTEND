import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "./core/material.module";
import { HomeComponent } from './home/home.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';

import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

// import { Customer } from './shared/customer/customer';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { TestimonialAddComponent } from './testimonial-add/testimonial-add.component';

import {RightsidebarComponent} from './rightsidebar/rightsidebar.component'
import {NewinsertpageComponent} from './newinsertpage/newinsertpage.component'


import { OtpverfiedComponent } from './otpverfied/otpverfied.component';


import { LogoutComponent } from './logout/logout.component';
import { OnlinebookingComponent } from './onlinebooking/onlinebooking.component'


import { NgxStarRatingModule } from 'ngx-star-rating';
import { ToastrModule } from 'ngx-toastr';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FileuploadComponent } from './fileupload/fileupload.component';

import { ServicesComponent } from './services/services.component';
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { ShopServiceComponent } from './shop-service/shop-service.component';
import { DataTablesModule } from 'angular-datatables';

import { NgxPaginationModule } from 'ngx-pagination';
import { ShopdashboardComponent } from './shopdashboard/shopdashboard.component';
import { SelectcityComponent } from './selectcity/selectcity.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ComboOffersComponent } from './combo-offers/combo-offers.component';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TestinsertComponent } from './testinsert/testinsert.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home Component' } },
  // { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: NewinsertpageComponent, data: { title: 'Second Component' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home Component' } },
  { path: 'shop', component:ShopComponent, data: { title: 'shopcomponent'}},
  { path: 'login', component: LoginComponent, data: { title: 'Login Component' } },
  { path: 'testimonial', component: TestimonialComponent, data: { title: 'Testimonial Component'} },
  { path: 'customercreate', component: CustomerCreateComponent, data: { title: 'Customer Create Component'} },
  
  { path: 'contactus', component: ContactUsComponent, data: { title: 'Contact Us'} },
  { path: 'otpverfied', component: OtpverfiedComponent, data: { title: 'Otp Verfied'}},
  { path: 'onlinebooking', component: OnlinebookingComponent, data: { title: 'Online Booking'}},
  { path: 'FileuploadComponent', component: FileuploadComponent, data: { title: 'FileuploadComponent'}},
  { path: 'services', component: ServicesComponent, data: {title: 'Services component'}},
  { path: 'ShopProfile', component: ShopProfileComponent, data: {title: 'ShopProfile'}},
  { path: 'ShopService', component: ShopServiceComponent, data: {title: 'ShopService'}},
  { path: 'NewinsertpageComponent', component: NewinsertpageComponent, data: {title: 'ShopService'}},
  { path: 'ShopDashboard', component: ShopdashboardComponent, data: {title: 'Shop Dashboard'}},
  { path: 'ComboOffers', component: ComboOffersComponent, data: {title: 'Combo Offers'}},
  { path: 'test', component: TestinsertComponent, data: {title: 'test'}}
  

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TestimonialComponent,
    CustomerCreateComponent,
       ContactUsComponent,
         ShopComponent,
         SignupComponent,
         TestimonialAddComponent,
         RightsidebarComponent,
    NewinsertpageComponent,
    OtpverfiedComponent,
    LogoutComponent,
    OnlinebookingComponent,
    FileuploadComponent,

    ServicesComponent,
      ShopProfileComponent,
      ShopServiceComponent,
      ShopdashboardComponent,
      SelectcityComponent,
      ComboOffersComponent,
      TestinsertComponent
   
     ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    RouterModule.forRoot(
      appRoutes,

     // { useHash: true }

    ),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    // Customer,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      timeOut: 150000,
    }),
    NgCircleProgressModule.forRoot(),
    DataTablesModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    NgImageSliderModule,
    MatAutocompleteModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { 

  constructor(private  dialog:  MatDialog) { }

  login(){
    
    
        this.dialog.open(LoginComponent,{ data: {
        message:  "Error!!!"
        }});
    
}

signup(){
    
    this.dialog.open(SignupComponent,{ data: {
  message:  "Error!!!"
  }});

}
}