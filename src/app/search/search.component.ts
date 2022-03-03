import { Component, OnInit,Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { RestApiService } from "../shared/rest-api.service";
import { HttpClient } from '@angular/common/http';
import { Observable,of } from "rxjs";
import { map, startWith } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})

export class Service {
  apiURL = 'http://localhost/MNC-PHP-API';
  constructor(private httpClient: HttpClient) { }

  jokes = [];

  getData() {
    return this.jokes.length ? of(this.jokes)
      : this.httpClient.get<any>(this.apiURL +'/shop/getallshoplist').pipe(
        map((shoplist) => {
          this.jokes = shoplist.value;
          console.log("seetha>>",this.jokes);
          return this.jokes;
        })
      )
  }
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  custom = new FormControl();
  customerFilter: Observable<any>;
  shoptype:any;
  shopdata:any;
 
  constructor(public restApi: RestApiService,
  private http: HttpClient,private service: Service) {


  }   
  ngOnInit() {
    this.loadshoplist();
    // this.customerFilter = this.custom.valueChanges.pipe(
    //   startWith(""),
    //   map(value => this._filter(value))
    // );
  }
loadshoplist()
{
  return this.restApi.getallshoplist().subscribe((shoplistdata: {}) => { 
   
    // console.log(citylistdata)
     this.shoptype = shoplistdata;

     console.log(this.shoptype)
 console.log("hi")
    this.shopdata = of(this.shoptype.data.list);
     
     console.log("data>>>>",this.shopdata)
   })

}
  // private _filter(value: string): any {
  //   console.log("-----");
  //   console.log(value);
  //   const filterValue = value;

  //   return this.shopdata.filter((shoplist:any) => {
  //     console.log(shoplist);
  //     return shoplist.name.toLowerCase().indexOf(filterValue) === 0;
  //   });
  // }
  jokes: Observable<any>;


  currentJoke = '';

  

  doFilter() {
    this.jokes = this.service.getData()
      .pipe(map(jokes => this.filter(jokes)),
      )
  }

  filter(values: any[]) {
    console.log(values)
    return values.filter(joke => joke.joke.toLowerCase().includes(this.currentJoke))
  }
}
