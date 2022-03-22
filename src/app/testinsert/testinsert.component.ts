import { AfterViewInit, VERSION, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})
export class TestinsertComponent implements OnInit
{
  title = 'dataTableDemo';
  apiURL = 'http://localhost/MNC-PHP-API';
dtOptions: DataTables.Settings = {};
posts: any;

constructor(private http: HttpClient) {
  let currentUserId = localStorage.getItem('currentUserId');
  this.http.get(this.apiURL + "/app/getMybookingDetails?currentUserId="+currentUserId)
    .subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
  }, error => console.error(error));
}

ngOnInit(): void {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true
  };
}
}