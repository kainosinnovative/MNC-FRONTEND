import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
// var CanvasJS = require('canvasjs');
import * as CanvasJS from './canvasjs.min';
// import * as CanvasJS from './canvasjs.min.js';
// import { ScaleLinear, ScalePoint, ScaleTime } from 'd3-scale';
@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})
export class TestinsertComponent implements OnInit{
  
  constructor() {
   
  }

  ngOnInit(): void {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      axisX: {
        title: "Departments"
      },
      axisY: {
        title: "Salary in USD",
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();
  }

  
}











