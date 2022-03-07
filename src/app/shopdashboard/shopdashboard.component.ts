import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shopdashboard',
  templateUrl: './shopdashboard.component.html',
  styleUrls: ['./shopdashboard.component.scss']
})
export class ShopdashboardComponent implements OnInit {
  bookingDetails:any;
  bookingDetails1:any;
  config: any;
  config1: any;
  MasterServiceData:any;
  MasterServiceData1:any;
  pickdrop_statusDetails:any;
  pickdrop_statusDetails1:any;
  carwashstatus:any;
  carwashstatus1:any;
  AcceptbookingDetails:any;
  AcceptbookingDetails1:any;
  currentOffer:any;
  currentOffer1:any;
  config2:any;
  config3:any;
  serviceDataOffers: any;
  serviceDataOffers1: any;
  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // alert(localStorage.getItem('is_pickup_drop_avl'))
    this.AcceptedBookingList();
    this.customerBookingForShop();
    this.loadMasterService();
    this.master_pickdrop_status();
    this.master_carwash_status();
    this.currentComboOffers();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    this.config1 = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    this.config2 = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    this.config3 = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };

    this.loadServiceDataOffers();
    
  }

  loadServiceDataOffers(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getServiceDataOffers(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.serviceDataOffers = data;
      this.serviceDataOffers1 = this.serviceDataOffers.data.getcurrentComboOffersByShopid;
      
      console.log("serviceDataOffers1>>>",this.serviceDataOffers1)
      // this.dtTrigger.next();
    })

    
  }

  customerBookingForShop(){

    let currentUserId = localStorage.getItem('currentUserId');
    
    return this.restApi.getcustomerBookingForShop(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.bookingDetails = data;
      //console.log("abi", this.shopdetails);
       this.bookingDetails1 = this.bookingDetails.data.customerBookingForShop;
      
      //  console.log("bookingDetails1>>>>",this.bookingDetails1)
      
    })
  }

  loadMasterService(){
    
    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;
      
      // console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })

    
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }

  pageChanged1(event:any){
    this.config1.currentPage = event;
  }

  pageChanged2(event:any){
    this.config2.currentPage = event;
  }

  pageChanged3(event:any){
    this.config3.currentPage = event;
  }

  master_pickdrop_status(){
    return this.restApi.getmaster_pickdrop_status().subscribe((data: {}) => {
      // alert(data)
      this.pickdrop_statusDetails = data;
       this.pickdrop_statusDetails1 = this.pickdrop_statusDetails.master_pickdrop_status;
      
      //  console.log("Details1>>>>",this.pickdrop_statusDetails1)
      
    })
  }

  master_carwash_status(){
    return this.restApi.getmaster_carwash_status().subscribe((data: {}) => {
      // alert(data)
      this.carwashstatus = data;
       this.carwashstatus1 = this.carwashstatus.master_carwash_status;
      
       console.log("master_carwash_status>>>>",this.carwashstatus1)
      
    })
  }

  acceptrejectbooking(booking_status:any, Booking_id:any, pickup_drop:any) {
    // let pickedAndDropId = "PickupDrop_"+Booking_id;
    // let pickedAndDrop_status = (<HTMLInputElement>document.getElementById(pickedAndDropId)).value;

    // if(pickedAndDrop_status == ""){
    //   this.toastr.error("please select pickup status");
    //   (<HTMLInputElement>document.getElementById(pickedAndDropId)).focus();
    // }
    // else {
    var changeBookingStatus = 
                   {
                  "booking_status": booking_status,
                  "Booking_id": Booking_id,
                  "pickup_drop":pickup_drop
                   }

this.restApi.changeBookingStatus(changeBookingStatus).subscribe((data: any) => {
  console.log('POST Request is successful >>>>>>>>', data.status);
  if(data.status == "pass") {
    this.customerBookingForShop();
    this.AcceptedBookingList();
    if(booking_status == "Accepted"){
      this.toastr.success(booking_status);
    }
    else {
      this.toastr.error(booking_status);
    }
    
  }
},
success => {
  console.log('Error>>>>>', success);
 
  
  
}
);
  }

// }

AcceptedBookingList(){

  let currentUserId = localStorage.getItem('currentUserId');
  
  return this.restApi.getAcceptedBookingList(currentUserId).subscribe((data: {}) => {
    // alert(data)
    this.AcceptbookingDetails = data;
    //console.log("abi", this.shopdetails);
     this.AcceptbookingDetails1 = this.AcceptbookingDetails.data.AcceptedBookingList;
    
     console.log("AcceptbookingDetails>>>>",this.AcceptbookingDetails1)
    
  })
}

updateCarwashStatus(Booking_id:any) {
let carwashStatusId = "carwash_"+Booking_id;
    let carwash_status = (<HTMLInputElement>document.getElementById(carwashStatusId)).value;

    if(carwash_status == ""){
      this.toastr.error("Please select carwash status");
      (<HTMLInputElement>document.getElementById(carwashStatusId)).focus();
    }
    else {
      var changeCarwashStatus = 
                   {
                  "carwash_status": carwash_status,
                  "Booking_id": Booking_id
                  
                   }

this.restApi.changeCarwashStatus(changeCarwashStatus).subscribe((data: any) => {
  console.log('POST Request is successful >>>>>>>>', data.status);
  if(data.status == "pass") {
   
      this.toastr.success("Carwash status updated");
    
    
  }
},
success => {
  console.log('Error>>>>>', success);
 
  
  
}
);
    }
}

currentComboOffers(){
  let currentUserId = localStorage.getItem('currentUserId');
  return this.restApi.getcurrentComboOffersByShopid(currentUserId).subscribe((data: {}) => {
    // alert(data)
    this.currentOffer = data;
     this.currentOffer1 = this.currentOffer.data.getcurrentComboOffersByShopid;
    
     console.log("currentComboOffers>>>>",this.currentOffer1)
    
  })
}

}
