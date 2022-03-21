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
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };

  }


}











