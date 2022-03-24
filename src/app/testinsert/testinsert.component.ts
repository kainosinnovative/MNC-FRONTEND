import { AfterViewInit, VERSION, Component, OnInit, ViewChild,Input,Injectable } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

// import { donutChartOptions } from '../helpers/donutChartOptions';
import { areaChartOptions } from '../helpers/areaChartOptions';
// import { barChart } from '../helpers/barChart';
import { oneLineBar } from '../helpers/oneLineBar';
import { Options } from 'highcharts';

import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})


// let ComboOfferFromDateTodate:any;
export  class TestinsertComponent implements OnInit
{
  currentOffer:any;
  currentOffer1:any;
  ComboOfferAmountArr:any;
  ComboOfferFromDateTodate:any;

  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService, private  dialog:  MatDialog) {


}


ngOnInit(): void {

 this.currentComboOffers2();

}

currentComboOffers2(){
  alert("in")
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


  })
}


}

// export var arr = [1,2,3];

export class barChart1 extends TestinsertComponent{

  sum:number = 10;

    SumValue() {
        return this.sum;
    }


  barChart2: Options = {
    chart: {
      type: 'bar',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Bar',
    },
    yAxis: {
      //visible: false,
      gridLineColor: '#fff',
      title: {
        text: 'value',
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      title: {
        text: 'Bar',
      },
      lineColor: '#fff',
      categories: this.ComboOfferFromDateTodate,
      // categories: [
      //   'Jan',
      //   'Feb',
      //   'Mar',
      //   'Apr',
      //   'May',
      //   'Jun',
      //   'Jul',
      //   'Aug',
      //   'Sep',
      //   'Oct',
      //   'Nov',
      //   'Dec',
      // ],
    },

    plotOptions: {

      series: {
        borderRadius: 5,
      } as any,
    },

    series: [
      {

        type: 'bar',
        color: '#506ef9',
        data: [
          { y: 20.9},
          { y: 71.5 },
          { y: 106.4 },
          { y: 129.2 },
          { y: 144.0 },
          { y: 176.0 },
          { y: 135.6 },
          { y: 148.5 },
          { y: 216.4 },
          { y: 194.1 },
          { y: 95.6 },
          { y: 54.4 },
        ],
      },
    ],
  };



}
export var barChart2 = [1,2,3];

// export const

// export barChart1;

