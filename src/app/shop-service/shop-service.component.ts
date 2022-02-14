import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";



@Component({
  selector: 'app-shop-service',
  templateUrl: './shop-service.component.html',
  styleUrls: ['./shop-service.component.scss']
})
export class ShopServiceComponent implements  OnInit{

  
  serviceData: any;
  serviceData1: any;

  element: HTMLElement;
  service_amount: string;

  config: any;

  constructor(private http: HttpClient,private router: Router,
    public restApi: RestApiService) { }


  ngOnInit(): void {
    this.loadServiceData();

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    
  }


  pageChanged(event:any){
    this.config.currentPage = event;
  }

  


  loadServiceData(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getServiceData(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.serviceData = data;
      this.serviceData1 = this.serviceData.data.carAndShopservice;
      
      console.log("data>222>>>",this.serviceData1)
      // this.dtTrigger.next();
    })

    
  }


  AddServiceAmount(obj:any) {
    
    // alert(obj)
    let service_amountid = "amount_"+obj;
    let service_amount = (<HTMLInputElement>document.getElementById(service_amountid)).value;
    console.log(service_amount);
    let currentUserId = localStorage.getItem('currentUserId');
// alert(service_amount)
    if(service_amount != "") {
// alert("in")

    let addbtn = "addbtn_"+obj;
    (<HTMLInputElement>document.getElementById(addbtn)).remove();
    let updatebtn = "updatebtn_"+obj;
    (<HTMLInputElement>document.getElementById(updatebtn)).style.display="block";

    // var shopservAmount = 
    //             {
    //               "serviceid": obj,
    //               "service_amount": service_amount,
    //               "currentUserId":currentUserId
                  
    //               }

                  this.http.get('http://localhost/MNC-PHP-API/shop/AddshopService?service_amount='+service_amount +
                     "&serviceid=" + obj + "&currentUserId="+currentUserId).subscribe( data => {
                      console.log('POST Request is successful >>>>>>>>', data);
          
                  },
                  success => {
                      console.log('Error>>>>>', success.status);
                      if(success.status == 200) {
                        this.loadServiceData();
                      }
                  }
                      

                     )

    // this.restApi.AddshopService(shopservAmount).subscribe((data => {
    //  console.log(">>>>>",data)
    // }
    // ));

    
    }
    else {
      (<HTMLInputElement>document.getElementById(service_amountid)).focus();
      let validateamount = "validateamount_"+obj;
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="block";
    }

    
  
  }

  UpdateServiceAmount(obj:any) {
    let service_amountid = "amount_"+obj;
    let service_amount = (<HTMLInputElement>document.getElementById(service_amountid)).value;
    console.log(service_amount);
    let currentUserId = localStorage.getItem('currentUserId');

    if(service_amount != "") {


                  this.http.get('http://localhost/MNC-PHP-API/shop/UpdateshopService?service_amount='+service_amount +
                     "&serviceid=" + obj + "&currentUserId="+currentUserId).subscribe() 
    }
    else {
      (<HTMLInputElement>document.getElementById(service_amountid)).focus();
      let validateamount = "validateamount_"+obj;
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="block";
    }
  }


  removevalidateMsg(id:any) {
    // alert("hi")
    let validateamount = "validateamount_"+id;
    // alert(validateamount)
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="none";
  }

}
