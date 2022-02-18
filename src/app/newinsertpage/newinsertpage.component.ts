import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrManager } from 'ng6-toastr-notifications';
// import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RestApiService } from "../shared/rest-api.service";
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
// import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }

  opts = [];
  citytype: any;
  citydata: any;
  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>('http://localhost/MNC-PHP-API/app/citylist').pipe(tap(data => {this.opts = data
      // console.log(this.opts);
      this.citytype = data;

      console.log(this.citytype)
  //console.log("hi")
      this.citydata = this.citytype.data.list;
      
       console.log("data>>>>",this.citydata)
  }
      ))
  }
}

@Component({
  selector: 'app-newinsertpage',
  templateUrl: './newinsertpage.component.html',
  styleUrls: ['./newinsertpage.component.scss']
})
export class NewinsertpageComponent implements OnInit {
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;

  constructor(private service: Service) {
     this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )
    
   }

   filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter((option: any) => { 
         return option.city_name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }  

  ngOnInit(): void {
    
    
  }

  


}
