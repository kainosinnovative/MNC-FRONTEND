import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewbookdetailPopupComponent } from '../viewbookdetail-popup/viewbookdetail-popup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {
  MybookingDetails:any;
  MybookingDetails1:any;
  config:any;
  MasterServiceData:any;
  MasterServiceData1:any;
  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService, private  dialog:  MatDialog) { }

  ngOnInit(): void {
    this.loadMybookingDetails();
    this.loadMasterService();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
  }

  loadMybookingDetails(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getMybookingDetails(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.MybookingDetails = data;
      this.MybookingDetails1 = this.MybookingDetails.data.getMybookingDetails;
      
      console.log("MybookingDetails1>>>",this.MybookingDetails1)
      // this.dtTrigger.next();
    })

    
  }

  pageChanged(event:any){
    this.config.currentPage = event;
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

  ViewDetailsPopup(Booking_id:any, heading:any){
    localStorage.setItem('ViewBooking_id',Booking_id);
    localStorage.setItem('ViewBooking_heading',heading);
  //   // alert("hi")
    this.dialog.open(ViewbookdetailPopupComponent,{disableClose: true, 
    width: '50%'});
  
  }

  closeMe() {
    localStorage.removeItem("ViewBooking_id");
    localStorage.removeItem("ViewBooking_heading");
    
 }

}
