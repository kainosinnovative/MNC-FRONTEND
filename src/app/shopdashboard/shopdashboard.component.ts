import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
@Component({
  selector: 'app-shopdashboard',
  templateUrl: './shopdashboard.component.html',
  styleUrls: ['./shopdashboard.component.scss']
})
export class ShopdashboardComponent implements OnInit {
  bookingDetails:any;
  bookingDetails1:any;
  config: any;
  constructor(public restApi: RestApiService,private http: HttpClient) { }

  ngOnInit(): void {
    this.customerBookingForShop();
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

  pageChanged(event:any){
    this.config.currentPage = event;
  }

}
