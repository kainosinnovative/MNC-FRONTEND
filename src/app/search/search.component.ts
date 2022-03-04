import { Component, OnInit,Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { RestApiService } from "../shared/rest-api.service";

import { Observable,of } from "rxjs";
import { DatePipe } from '@angular/common';

import { Router,ActivatedRoute,ParamMap, Params  } from '@angular/router';
import { EventEmitterService } from '../event-emitter.service';
import { HttpClient } from '@angular/common/http';
import { style } from '@angular/animations';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { ToastrService } from 'ngx-toastr';



import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class Service {
  apiURL = 'http://localhost/MNC-PHP-API';
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(this.apiURL+'/shop/getallshoplist').pipe(tap(data => this.opts = data))

  }

}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [DatePipe]
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  MasterServiceData:any;
  MasterServiceData1:any;
  wishlistdata: any;
wishlistdata1: any;
date:any;
  constructor(private service: Service,public datepipe: DatePipe,private toastr: ToastrService,public restApi: RestApiService,private route:ActivatedRoute,private router:Router,private eventEmitterService: EventEmitterService,private http: HttpClient) {
     this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       })
    )
   }
   userroleSes = localStorage.getItem('userroleSes');
   dashboardShop:any;
   dashboardShop1:any;
  ngOnInit() {
    this.date=new Date();
    this.date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.loadMasterService();
  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter((option:any) => {
         return option.name.toLowerCase().indexOf(val.toLowerCase()) >-1
       }))
     )
   }
   onSelFunc(option: any){
    console.log(option);
    return this.restApi.dashboardShopSearch(option).subscribe((data: {}) => {
    //  alert(data)
      this.dashboardShop = data;
      this.dashboardShop1 = this.dashboardShop.data.dashboardShopSearch;
      console.log("data dashboard>>>",this.dashboardShop1);
    })
  }
  loadMasterService(){

    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;

      console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })


  }

clickEvent(shopid :number){
  //alert(shopid)
  let wishlist1="wishlistvalue_"+ shopid;

  let  customerid = localStorage.getItem('currentUserId');
  let cityid = localStorage.getItem('selectedCity');



  //let wishlist1 =  (<HTMLInputElement>document.getElementById(wishlist)).innerHTML;
  //console.log(wishlist1)
let wishlistcolor =  (<HTMLInputElement>document.getElementById(wishlist1)).style.color;
//alert(wishlistcolor)

if(wishlistcolor === "gray"){

this.http.get('http://localhost/MNC-PHP-API/app/Addwhislist?date='+this.date+
     '&Customer_id='+customerid + '&city_id='+cityid + '&shop_id='+shopid).subscribe(
       (data: any) => {
     console.log(data)





     this.wishlistdata = data;
     if(this.wishlistdata.status === "pass"){

      (<HTMLInputElement>document.getElementById(wishlist1)).style.color = "red";

      this.showloginSuccess();
      }
   }
    );
}

else
{
   this.http.get('http://localhost/MNC-PHP-API/app/Deletewhislist?date='+this.date+
     '&Customer_id='+customerid + '&city_id='+cityid + '&shop_id='+shopid).subscribe(
       (data: any) => {
     //console.log(data)



     this.wishlistdata1 = data;
     if(this.wishlistdata1.status === "pass"){

      (<HTMLInputElement>document.getElementById(wishlist1)).style.color = "gray";
      //alert("Successfully Removed your Wishlist")
      }
   }
    );
}

}
showloginSuccess() {
  console.log("login message");

  //this.toastr.success('Added Successfully to Wishlist');

      //
}
slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};

  slickInit(e:any) {
    console.log('slick initialized');
  }

  breakpoint(e:any) {
    console.log('breakpoint');
  }

  afterChange(e:any) {
    console.log('afterChange');
  }

  beforeChange(e:any) {
    console.log('beforeChange');
  }

userloggedin(shopid :number)
  {
    if(!this.userroleSes)
    {
      this.eventEmitterService.onFirstComponentButtonClick();
     // alert("please login");
    }
    else
    {
      console.log(shopid);
      this.router.navigate(['/onlinebooking/'+shopid]);
    }
  }
  }