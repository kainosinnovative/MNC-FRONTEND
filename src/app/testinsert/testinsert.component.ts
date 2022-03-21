import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})
export class TestinsertComponent implements OnInit{
  public data = [
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
];
  constructor() {

  }
  title = 'angulardatatables';
  dtOptions: any = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
        buttons:{
          dom: {
            button: {
              tag: 'i',
              className: ''
            }
          },
          //since we now have completely unstyled icons add
          //some space between them trough a .custom-btn class
          buttons: [
           {
             titleAttr: 'Download as PDF',
             extend: 'pdfHtml5',
             className: 'custom-btn fa fa-file-pdf-o',
             text: ''
           },
           {
             titleAttr: 'Download as Excel',
             extend: 'excelHtml5',
             className: 'custom-btn fa fa-file-excel-o',
             text: ''
           },
           {
             titleAttr: 'Download as CSV',
             extend: 'csvHtml5',
             className: 'custom-btn fa fa-file-text-o',
             text: ''
           },
           {
             titleAttr: 'Print',
             extend: 'print',
             className: 'custom-btn fa fa-print',
             text: ''
           },

          ]
        }

    };

  }


}











