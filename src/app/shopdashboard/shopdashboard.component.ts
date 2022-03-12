import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewbookdetailPopupComponent } from '../viewbookdetail-popup/viewbookdetail-popup.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexLegend,ApexYAxis
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  yaxis:ApexYAxis | any;
  tooltip:ApexChart | any;
};

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  fill: ApexFill | any;
  legend: ApexLegend | any;
  dataLabels: ApexDataLabels | any;
  
};
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
  ComboOfferAmountArr:any = [];
  ComboOfferFromDateTodate:any = [];
  NormalOfferPercentArr:any = [];
  servicenameArr:any = [];

  bookingDetailsById:any;
  bookingDetailsById1:any;
  ViewBooking_heading:any;
  loadmasterComboOfferval:any;
  loadmasterComboOfferval1:any;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions2>;
  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService, private  dialog:  MatDialog) { }

  ngOnInit(): void {
    // alert(localStorage.getItem('is_pickup_drop_avl'))
    this.AcceptedBookingList();
    this.customerBookingForShop();
    this.loadMasterService();
    this.master_pickdrop_status();
    this.master_carwash_status();
    this.currentComboOffers();

    this.getBookingByid();
  
    this.loadmasterComboOffer();
    this.ViewBooking_heading = localStorage.getItem('ViewBooking_heading');
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
    // this.config2 = {
    //   itemsPerPage: 10,
    //   currentPage: 1,
      
    // };
    this.config3 = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };

    this.loadServiceDataOffers();
    
  }

  // loadServiceDataOffers(){
  //   let currentUserId = localStorage.getItem('currentUserId');
  //   return this.restApi.getServiceDataOffers(currentUserId).subscribe((data: {}) => {
  //     // alert(data)
  //     this.serviceDataOffers = data;
  //     this.serviceDataOffers1 = this.serviceDataOffers.data.getcurrentOffersByShopid;
      
  //     console.log("serviceDataOffers1>>>",this.serviceDataOffers1)
  //     // this.dtTrigger.next();
  //   })

    
  // }

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

  // pageChanged2(event:any){
  //   this.config2.currentPage = event;
  // }

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
  this.restApi.getcurrentComboOffersByShopid(currentUserId).subscribe((data: {}) => {
    this.currentOffer = data;
     this.currentOffer1 = this.currentOffer;
    
    
    // this.ComboOfferAmountArr = [10,100];
     for(let i=0;i<this.currentOffer1.length;i++){
       this.ComboOfferAmountArr.push(Number(this.currentOffer1[i].offer_percent));
      // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
      this.ComboOfferFromDateTodate.push(this.currentOffer1[i].offer_name);
     }
    //  console.log("array>>>",this.ComboOfferFromDateTodate);

     this.chartOptions = {

      
       
      series: [
        {
          name: "Offer %",
          data: this.ComboOfferAmountArr
        }
      ],
      chart: {
        toolbar: {
          show: true,
         
          tools: {
            // download: false,
            download: '<i style="font-size:12px;color:black" class="fa fa-download" title="Download"></i>',
            
          },
        },
          
        type: "bar",
        height: 300,
        width:300,
        colors: "red",

      },
      
      plotOptions: {
        bar: {
          horizontal: false,
          width:20,
          columnWidth: '10%',
          // data:20
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        // categories: ["test"],
        categories: this.ComboOfferFromDateTodate,
        title: {
          text: "Offer Type",
          style: {
            color: "#000000",
            //font:"20px"
          }
        },
        
        
      },
      yaxis: {

        scaleLabel: {
          display: true,
          labelString: "Date",
         },
        
        
        
    },
    tooltip: {
      y: {
        formatter: function(val:any) {
          return ''
        },
        title: {
          formatter: function (seriesName:any) {
            return ''
          }
        }
      }
    }
  };

   
    
  })
  
 
}

// currentComboOffers(){
//   let currentUserId = localStorage.getItem('currentUserId');
//   return this.restApi.getcurrentComboOffersByShopid(currentUserId).subscribe((data: {}) => {
//     // alert(data)
//     this.currentOffer = data;
//      this.currentOffer1 = this.currentOffer.data.getcurrentComboOffersByShopid;
    
//      console.log("currentComboOffers>>>>",this.currentOffer1)
    
//   })
// }


loadServiceDataOffers(){
  let currentUserId = localStorage.getItem('currentUserId');
  return this.restApi.getServiceDataOffers(currentUserId).subscribe((data: {}) => {
    // alert(data)
    this.serviceDataOffers = data;
    this.serviceDataOffers1 = this.serviceDataOffers.data.getcurrentOffersByShopid;
    
    console.log("serviceDataOffers1>>>",this.serviceDataOffers1)
    // this.dtTrigger.next();

    for(let i=0;i<this.serviceDataOffers1.length;i++){
      this.NormalOfferPercentArr.push(Number(this.serviceDataOffers1[i].offer_percent));
     // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
     this.servicenameArr.push((this.serviceDataOffers1[i].service_name));
    }
    console.log("array>>>",this.servicenameArr);

    this.chartOptions2 = {
      series: this.NormalOfferPercentArr,
      chart: {
        width: 500,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      labels: this.servicenameArr,
      // legend: {
        // enabled:true
        // formatter:  this.servicenameArr
        // formatter: function(val:any, opts:any) {
        //   return val + " - " + opts.w.globals.series[opts.seriesIndex];
        // }
      // },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: "bottom"
            },
            dataLabels: {
              enabled: false
            },
            
          }
        }
      ]
    };
  })

  
}

viewBookingDetails(id :any)
{
  alert(id)
}


  

ViewDetailsPopup(Booking_id:any, heading:any){
  localStorage.setItem('ViewBooking_id',Booking_id);
  localStorage.setItem('ViewBooking_heading',heading);
//   // alert("hi")
  this.dialog.open(ViewbookdetailPopupComponent,{disableClose: true, 
  width: '50%'});

}

getBookingByid() {
  // alert(Booking_id)
  let Booking_id = localStorage.getItem('ViewBooking_id');
  return this.restApi.getBookingDetailsById(Booking_id).subscribe((data: {}) => {
    // alert(data)
    this.bookingDetailsById = data;
    //console.log("abi", this.shopdetails);
    //  this.bookingDetailsById1 = this.bookingDetailsById.data;
    
     console.log("bookingDetails2>>>>",this.bookingDetailsById)
    
  })
    }

    loadmasterComboOffer() {
      
      return this.restApi.loadmasterComboOffer().subscribe((data: {}) => {
        // alert(data)
        this.loadmasterComboOfferval = data;
        
         this.loadmasterComboOfferval1 = this.loadmasterComboOfferval;
        
         console.log("loadmasterComboOfferval1>>>>",this.loadmasterComboOfferval1)
        
      })
        }

        closeMe() {
          localStorage.removeItem("ViewBooking_id");
          localStorage.removeItem("ViewBooking_heading");
          
       }

}
