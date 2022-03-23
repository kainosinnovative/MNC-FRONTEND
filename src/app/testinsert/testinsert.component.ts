import { AfterViewInit, VERSION, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'angular-highcharts';
// import { donutChartOptions } from '../helpers/donutChartOptions';
import { areaChartOptions } from '../helpers/areaChartOptions';
import { barChart } from '../helpers/barChart';
import { oneLineBar } from '../helpers/oneLineBar';

@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})
export class TestinsertComponent implements OnInit
{
  // chart = new Chart(donutChartOptions);
  areaSplineChart = new Chart(areaChartOptions);
  barChart = new Chart(barChart);
  oneLineBar = new Chart(oneLineBar);

constructor(private http: HttpClient) {
  
}

ngOnInit(): void {
 
}
}