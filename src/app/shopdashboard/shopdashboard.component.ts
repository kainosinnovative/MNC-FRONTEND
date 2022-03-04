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
  MasterServiceData:any;
  MasterServiceData1:any;
  pickdrop_statusDetails:any;
  pickdrop_statusDetails1:any;
  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // alert(localStorage.getItem('is_pickup_drop_avl'))
    this.customerBookingForShop();
    this.loadMasterService();
    this.master_pickdrop_status();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    
  }

  customerBookingForShop(){

    let currentUserId = localStorage.getItem('currentUserId');
    
    return this.restApi.getcustomerBookingForShop(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.bookingDetails = data;
      //console.log("abi", this.shopdetails);
       this.bookingDetails1 = this.bookingDetails.data.customerBookingForShop;
      
       console.log("bookingDetails1>>>>",this.bookingDetails1)
      
    })
  }

  loadMasterService(){
    
    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;
      
      console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })

    
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }


  master_pickdrop_status(){
    return this.restApi.getmaster_pickdrop_status().subscribe((data: {}) => {
      // alert(data)
      this.pickdrop_statusDetails = data;
       this.pickdrop_statusDetails1 = this.pickdrop_statusDetails.master_pickdrop_status;
      
       console.log("Details1>>>>",this.pickdrop_statusDetails1)
      
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

}
