// import { RestApiService } from "../shared/rest-api.service";
// import { Component, OnInit, ViewChild } from '@angular/core';
// import {Router} from '@angular/router';
// import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
// import { ChartComponent } from "ng-apexcharts";
// import {
//   ApexNonAxisChartSeries,
//   ApexResponsive,
//   ApexChart
// } from "ng-apexcharts";

// @Component({
//   selector: 'app-testinsert',
//   templateUrl: './testinsert.component.html',
//   styleUrls: ['./testinsert.component.scss']
// })

// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: ApexResponsive[];
//   labels: any;
// };


// export class TestinsertComponent implements OnInit {

//   @ViewChild("chart") chart: ChartComponent;
//   public chartOptions: Partial<ChartOptions>;

//   constructor() {
//     this.chartOptions = {
//       series: [44, 55, 13, 43, 22],
//       chart: {
//         width: 380,
//         type: "pie"
//       },
//       labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200
//             },
//             legend: {
//               position: "bottom"
//             }
//           }
//         }
//       ]
//     };
//   }

//   ngOnInit(): void {
    
//   }
  
  
  
 
// }



import { Component, ViewChild, OnInit } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
};

@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})
export class TestinsertComponent implements OnInit{
  currentOffer:any;
  currentOffer1:any;
  ComboOfferAmountArr:any = [];
  ComboOfferFromDateTodate:any = [];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  

  constructor(public restApi: RestApiService,private http: HttpClient) {
    
  }


  
  ngOnInit(): void {
this.currentComboOffers();

// this.httpService.get('./assets/sales.json', {responseType: 'json'}).subscribe(
//   data => {
//       this.pieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
//   },
//   (err: HttpErrorResponse) => {
//       console.log (err.message);
//   }
// );
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
       console.log("array>>>",this.ComboOfferFromDateTodate);


       this.chartOptions = {
        series: this.ComboOfferAmountArr,
        chart: {
          width: 500,
          type: "pie"
        },
        labels: this.ComboOfferFromDateTodate,
        responsive: [
          {
            // breakpoint: 100,
            options: {
              chart: {
                width: 10
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
     
      
    })
    
   
  }
}


