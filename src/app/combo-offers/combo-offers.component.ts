import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-combo-offers',
  templateUrl: './combo-offers.component.html',
  styleUrls: ['./combo-offers.component.scss'],
  providers: [DatePipe]
})
export class ComboOffersComponent implements OnInit {
  serviceData: any;
  serviceData1: any;
  config: any;
  date:any;
  constructor(private http: HttpClient,private router: Router,
    public restApi: RestApiService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.date=new Date();
// let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

this.loadServiceData();
    // this.config = {
    //   itemsPerPage: 10,
    //   currentPage: 1,
      
    // };
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
    
  }

  UpdateServiceAmount(obj:any) {
    
  }


  removevalidateMsg(id:any) {
    
  }

  serviceIdArr = new Array();
   serviceIdArr1 = new Array();
   serviceAmountArr = new Array();
  
  collectServiceid(serviceid:any) {
    //alert(serviceid)
    
    let service_amountid = "amount_"+serviceid;
    let service_amount = (<HTMLInputElement>document.getElementById(service_amountid)).innerText;
    // alert(service_amount);
    var concatServid_amount = serviceid + "#" + service_amount;

    if(this.serviceIdArr.includes(concatServid_amount)){
      this.serviceIdArr = this.remove(this.serviceIdArr, concatServid_amount);
    }
    else {
      this.serviceIdArr.push(concatServid_amount);
    }
    var arrayLength = this.serviceIdArr.length;
    if(arrayLength == 0){
      (<HTMLInputElement>document.getElementById("addCombobtn")).disabled=true;
    }
    else {
      (<HTMLInputElement>document.getElementById("addCombobtn")).disabled=false;
    }
    this.serviceIdArr1 = new Array();
    var totalAmount = 0;
    // this.serviceAmountArr = new Array();
    for (var i = 0; i < arrayLength; i++) {
      var splitArr = this.serviceIdArr[i].split("#");
      // console.log(this.serviceIdArr[i]);

      //Do something
      this.serviceIdArr1.push(splitArr[0]);
      // this.serviceAmountArr.push(splitArr[1]);
      totalAmount = totalAmount + parseInt(splitArr[1]);
  }

    // alert(this.serviceIdArr)
    (<HTMLInputElement>document.getElementById("Selectedserviceid")).value = this.serviceIdArr1.toString();
    (<HTMLInputElement>document.getElementById("totalamount")).value = totalAmount.toString();

    (<HTMLInputElement>document.getElementById("combooffer_offerpercent")).value = "";
    (<HTMLInputElement>document.getElementById("combooffer_offeramount")).value = "";
  }

  remove(arr:any, item:any)
{
    var index = this.serviceIdArr.indexOf(item);
    return [
 
        // part of the array before the given item
        ...this.serviceIdArr.slice(0, index),
 
        // part of the array after the given item
        ...this.serviceIdArr.slice(index + 1)
    ];
}


AddComboOffer() {
  let start_date = (<HTMLInputElement>document.getElementById("combooffer_fromdate")).value;
  let end_date = (<HTMLInputElement>document.getElementById("combooffer_todate")).value;
  let combooffer_offerpercent = (<HTMLInputElement>document.getElementById("combooffer_offerpercent")).value;
  let Selectedserviceid = (<HTMLInputElement>document.getElementById("Selectedserviceid")).value;
  let combo_price = (<HTMLInputElement>document.getElementById("combooffer_offeramount")).value;
  console.log(combo_price);
  let currentUserId = localStorage.getItem('currentUserId');
// alert(currentUserId)
  // if(service_amount != "") {



  var ComboOfferDetails = 
              {
                "services": Selectedserviceid,
                "combo_price": combo_price,
                "shop_id":currentUserId,
                "offer_percent":combooffer_offerpercent,
                "start_date":start_date,
                "end_date":end_date
                }

                

  this.restApi.AddComboOfferDetails(ComboOfferDetails).subscribe((data => {
   console.log(">>>>>",data)
  }
  ));

  
  // }
  // else {
  //   (<HTMLInputElement>document.getElementById(service_amountid)).focus();
  //   let validateamount = "validateamount_"+obj;
  //   (<HTMLInputElement>document.getElementById(validateamount)).style.display ="block";
  // }

}

getOfferPrice(offerPercent:any) {
  let offerPercentVal : any = offerPercent.target.value;
  var numVal1 = Number((<HTMLInputElement>document.getElementById("totalamount")).value);
            var numVal2 = Number(offerPercentVal) / 100;
            var totalValue = numVal1 - (numVal1 * numVal2);
            (<HTMLInputElement>document.getElementById("combooffer_offeramount")).value = totalValue.toFixed();
}

}
