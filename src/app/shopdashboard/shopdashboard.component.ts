import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
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
  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder) { }

  ngOnInit(): void {
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
      
       console.log("bookingDetails1>>>>",this.pickdrop_statusDetails1)
      
    })
  }

  acceptrejectbooking(booking_status:any, Booking_id:any) {
    // alert("hi")
    // alert(booking_status)
    // alert(Booking_id)

    var changeBookingStatus = 
                   {
                  "booking_status": booking_status,
                  "Booking_id": Booking_id,
                   }

this.restApi.changeBookingStatus(changeBookingStatus).subscribe((data: any) => {
  console.log('POST Request is successful >>>>>>>>', data.status);
  if(data.status == "pass") {
    
  }
},
success => {
  console.log('Error>>>>>', success);
 
  
  
}
);
  }

}
