import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
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
  comboofferData:any;
  comboofferData1:any;
  MasterServiceData:any;
  MasterServiceData1:any;
  shopserviceModel:any;
  shopserviceModel1:any;
  combooffertblByModelid:any;
  combooffertblByModelid1:any;
  addoffermsg:any;
  addoffermsg1:any;
  constructor(private http: HttpClient,private router: Router,
    public restApi: RestApiService,public datepipe: DatePipe,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.date=new Date();
// let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

this.loadServiceData();
this.loadComboOffers();
this.loadMasterService();
this.loadshopserviceByModelid();
this.loadcombooffertblByModelid(1);
    // this.config = {
    //   itemsPerPage: 10,
    //   currentPage: 1,
      
    // };
  }


 

  loadcombooffertblByModelid(a:any) {
    this.serviceIdArr = new Array();
    // alert("hi");
    (<HTMLInputElement>document.getElementById("combooffer_offerpercent")).value = "";
    (<HTMLInputElement>document.getElementById("combooffer_offeramount")).value = "";
    (<HTMLInputElement>document.getElementById("totalamount")).value = "";
    (<HTMLInputElement>document.getElementById("addCombobtn")).disabled=true;
    if(a == 2)
    (<HTMLInputElement>document.getElementById("secondtblid")).style.display = "block";
    
    let model_id = (<HTMLInputElement>document.getElementById("model_id")).value;
    // alert(model_id  )
    let currentUserId = localStorage.getItem('currentUserId');
    var combooffertbl = 
              {
                "model_id": model_id,
                "shop_id":currentUserId,
                 }

    
    return this.restApi.combooffertblByModelid(combooffertbl).subscribe((data: {}) => {
      // alert(data)
      this.combooffertblByModelid = data;
      this.combooffertblByModelid1 = this.combooffertblByModelid.data.combooffertblByModelid;
      console.log(this.combooffertblByModelid)
    })

    
  }

  loadshopserviceByModelid(){
    
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.shopserviceByModelid(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.shopserviceModel = data;
      this.shopserviceModel1 = this.shopserviceModel.data.shopserviceByModelid;
      
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


  loadComboOffers(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getComboOffersData(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.comboofferData = data;
      this.comboofferData1 = this.comboofferData.data.getComboOffersByShopid;
      
      // console.log("data>>>>",this.comboofferData1)
      // this.dtTrigger.next();
    })

    
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
      
      // console.log("data>222>>>",this.serviceData1)
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
      // alert(totalAmount)
  }

    // alert(this.serviceIdArr)
    (<HTMLInputElement>document.getElementById("Selectedserviceid")).value = this.serviceIdArr1.toString();
    (<HTMLInputElement>document.getElementById("totalamount")).value = totalAmount.toString();

    (<HTMLInputElement>document.getElementById("combooffer_offerpercent")).value = "";
    (<HTMLInputElement>document.getElementById("combooffer_offeramount")).value = "";
    (<HTMLInputElement>document.getElementById("offerpercentError")).style.display ="none";
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
  let model_id = (<HTMLInputElement>document.getElementById("model_id")).value;
  console.log(combo_price);
  let currentUserId = localStorage.getItem('currentUserId');
// alert(currentUserId)
  if(start_date > end_date) {
    // alert("yes")
    (<HTMLInputElement>document.getElementById("enddate_message")).style.display ="block";
  }

else if(combooffer_offerpercent == "") {
   (<HTMLInputElement>document.getElementById("combooffer_offerpercent")).focus();
  //  (<HTMLInputElement>document.getElementById("combooffer_offeramount")).focus();
  //   let validateamount = "validateamount_"+obj;
    (<HTMLInputElement>document.getElementById("offerpercentError")).style.display ="block";
}
else if(combo_price == "") {
  (<HTMLInputElement>document.getElementById("combooffer_offeramount")).focus();
}
else {

  var ComboOfferDetails = 
              {
                "services": Selectedserviceid,
                "combo_price": combo_price,
                "shop_id":currentUserId,
                "offer_percent":combooffer_offerpercent,
                "start_date":start_date,
                "end_date":end_date,
                "model_id":model_id
                }

                

  this.restApi.AddComboOfferDetails(ComboOfferDetails).subscribe((data => {
   
   this.addoffermsg = data;
   this.addoffermsg1 = this.addoffermsg.status;
   console.log(">>>>>",this.addoffermsg1)
   if(this.addoffermsg1 == "pass") {
this.toastr.success('Combo Offer Added Successfully!');
  window.setTimeout(function(){location.reload()},100)
   }
  }
  ));

  
  
  }
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


            (<HTMLInputElement>document.getElementById("offerpercentError")).style.display ="none";
}


dateErrorMsg() {
  (<HTMLInputElement>document.getElementById("enddate_message")).style.display ="none";
}

}
