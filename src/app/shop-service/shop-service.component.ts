import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-shop-service',
  templateUrl: './shop-service.component.html',
  styleUrls: ['./shop-service.component.scss'],
  providers: [DatePipe]
})
export class ShopServiceComponent implements  OnInit{
  keyword = 'service_name';
  offerpricetext:any;
  serviceData: any;
  serviceData1: any;

  element: HTMLElement;
  service_amount: string;
   date:any;
  config: any;
   current_date:any;
   MasterServiceData:any;
   MasterServiceData1:any;
   MasterModelData:any;
   MasterModelData1:any;
   shopserviceForm:any;
   MasterserviceForm:any;
   citytype:any;
   citytype1:any;
  constructor(private http: HttpClient,private router: Router,
    public restApi: RestApiService,private toastr: ToastrService,public datepipe: DatePipe,
    private frmbuilder: FormBuilder) { }


  ngOnInit(): void {
    this.date=new Date();
    this.current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.loadServiceData();
    this.loadMasterService();
    this.loadAllModels();
   
    let currentUserId:any = localStorage.getItem('currentUserId');
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };

    this.shopserviceForm = this.frmbuilder.group({
      service_id: ['', Validators.required],
      model_id: ['', Validators.required],
      lastupddt: [this.current_date, Validators.required],
      actual_amount: ['', Validators.required],
      shop_id:[currentUserId, Validators.required],
      status:['1', Validators.required]
      // hidden_service: [''],
    }
    )


    this.MasterserviceForm = this.frmbuilder.group({
      service_name: ['', Validators.required],
      
      lastupddt: [this.current_date, Validators.required],
      
    }
    )
    
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
      
      console.log(this.serviceData1)
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
    let responsedata :any;
    let servicename="servicename_"+obj;
    let service_amountid = "amount_"+obj;
    let service_amount = (<HTMLInputElement>document.getElementById(service_amountid)).value;
    let service_name = (<HTMLInputElement>document.getElementById(servicename)).value;
    let model_id = (<HTMLInputElement>document.getElementById("model_"+obj)).value;
    let currentUserId = localStorage.getItem('currentUserId');

    if(service_amount != "") {


                  this.http.get('http://localhost/MNC-PHP-API/shop/UpdateshopService?service_amount='+service_amount +
                     "&serviceid=" + obj + "&currentUserId="+currentUserId + "&modelId="+model_id) .subscribe((data => {
                     console.log(data);
                     responsedata=data;
                     if(responsedata
                      =="pass")
                     {
                      this.toastr.success('Amount for ' +  service_name + ' Updated Successfully');
                      this.loadServiceData();
                     }
                     else{
                      this.toastr.success('Please Try Again');
                     }


                     })) 
    }
    else {
      (<HTMLInputElement>document.getElementById(service_amountid)).focus();
      let validateamount = "validateamount_"+obj;
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="block";
    }
    
  }
  UpdateOfferAmount(obj:any)
  {
    let validateoffer= "validateoffer_"+obj;
    (<HTMLInputElement>document.getElementById(validateoffer)).style.display ="none";
    let responsedata :any;
    let servicename="servicename_"+obj;
    let offer_percent = "offer_"+obj;
    let offer_amount="offeramount_"+obj;
    let offerfromdate="offerfromdate_"+obj;
    let offertodate="offertodate_"+obj
    let todateformat="validatetodateformat_"+obj;
    (<HTMLInputElement>document.getElementById(todateformat)).style.display ="none";
    let fromdateformat="validatefromdateformat_"+obj;
    (<HTMLInputElement>document.getElementById(fromdateformat)).style.display ="none";
    let offerpercentage = (<HTMLInputElement>document.getElementById(offer_percent)).value;
    let offeramount = (<HTMLInputElement>document.getElementById(offer_amount)).value;
    let service_name = (<HTMLInputElement>document.getElementById(servicename)).value;
    let model_id = (<HTMLInputElement>document.getElementById("model_"+obj)).value;
    let currentUserId = localStorage.getItem('currentUserId');
    let fromdate= (<HTMLInputElement>document.getElementById(offerfromdate)).value;
    let todate= (<HTMLInputElement>document.getElementById(offertodate)).value;
    let validatefromdateid= "validatefromdate_"+obj;
    (<HTMLInputElement>document.getElementById(validatefromdateid)).style.display ="none";
    let validatetodateid= "validatetodate_"+obj;
    (<HTMLInputElement>document.getElementById(validatetodateid)).style.display ="none";
    if(offerpercentage != "" && fromdate !="" && todate !="") {

                  if(todate<fromdate)
                  {
                    (<HTMLInputElement>document.getElementById(offertodate)).focus();
                   
                    (<HTMLInputElement>document.getElementById(todateformat)).style.display ="block";
                  }
                 
                  else
                  {
                  this.http.get('http://localhost/MNC-PHP-API/shop/Updateshopoffer?offer_amount='+offeramount +
                     "&serviceid=" + obj  + "&modelId="+model_id +"&offerpercent="+offerpercentage + "&lastupddt="+this.current_date +
                      "&fromdate="+fromdate + "&todate="+todate +"&currentUserId="+currentUserId) .subscribe((data => {
                     
                     responsedata=data;
                     if(responsedata.status=="pass")
                     {
                      this.toastr.success('Offer Price for ' +  service_name + ' Updated Successfully');
                      this.loadServiceData();
                     }
                     else{
                      this.toastr.success('Please Try Again');
                     }
                    this.loadServiceData();

                    })) 
                  }
    }
    else if(offerpercentage!="" && fromdate === "" && todate === ""){
      (<HTMLInputElement>document.getElementById(offerfromdate)).focus();
     
      (<HTMLInputElement>document.getElementById(validatefromdateid)).style.display ="block";
      (<HTMLInputElement>document.getElementById(offertodate)).focus();
     
      (<HTMLInputElement>document.getElementById(validatetodateid)).style.display ="block";
    }
    else if(offerpercentage!="" && fromdate != "" && todate === ""){
    
      (<HTMLInputElement>document.getElementById(offertodate)).focus();
      let validatetodateid= "validatetodate_"+obj;
      (<HTMLInputElement>document.getElementById(validatetodateid)).style.display ="block";
    }
    else if(offerpercentage!="" && fromdate === "" && todate != ""){
    
      (<HTMLInputElement>document.getElementById(offerfromdate)).focus();
      let validatefromdateid= "validatefromdate_"+obj;
      (<HTMLInputElement>document.getElementById(validatefromdateid)).style.display ="block";
    }
    else {
      (<HTMLInputElement>document.getElementById(offer_percent)).focus();
    
      (<HTMLInputElement>document.getElementById(validateoffer)).style.display ="block";
    }
   
  }
  getOfferPrice(term: string,termid: string): void
  {
      
      var termid1=termid;
      var splitted = termid1.split("_", 2); 
      var splitted1=splitted[1];
      var amount="amount_"+splitted1;
      var serviceamount= Number((<HTMLInputElement>document.getElementById(amount)).value);
      var offeramount=serviceamount *(Number(term)/100);
      var offeramtid;
      offeramtid="offeramount_"+splitted[1];
      console.log(offeramtid);
     (<HTMLInputElement>document.getElementById(offeramtid)).value =offeramount.toString();
 

  }
  // validatedate(datestring :string)
  // {
  //   console.log($event)

  // }
 

  removevalidateMsg(id:any) {
    // alert("hi")
    let validateamount = "validateamount_"+id;
    // alert(validateamount)
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="none";
  }
  

  loadMasterService(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getMasterServiceAndShopService(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.MasterServiceAndShopService;
      
      console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })

    
  }


  loadAllModels(){
    
    return this.restApi.getAllModels().subscribe((data: {}) => {
      // alert(data)
      this.MasterModelData = data;
      this.MasterModelData1 = this.MasterModelData.data.list;
      
      console.log("models>>>>",this.MasterModelData1)
      // this.dtTrigger.next();
    })

    
  }

  

  AddMasterserviceDetails(MasterserviceForm:any) {
    
    this.http.post(config_url+'/shop/AddMasterservice',{MasterserviceForm})
      .subscribe(res => {
      
      }, (err) => {
        console.log(err.status)
        if(err.status == 200) {
          this.loadMasterService();
          this.toastr.success('Services added Successfully');
        }
      
    });
    console.log(MasterserviceForm);
    

  }


  AddShopserviceDetails(shopserviceForm:any) {
    // let formData = new FormData();
    // formData.append('test','2');
    console.log(shopserviceForm);
    // let hidden_service = (<HTMLInputElement>document.getElementById("hidden_service")).value;
    this.http.post(config_url+'/shop/AddShopserviceDetails',{shopserviceForm})
      .subscribe(res => {
      
      }, (err) => {
        console.log(err.status)
        if(err.status == 200) {
          this.loadServiceData();
          this.loadMasterService();
          this.loadAllModels();
          // this.shopserviceForm.controls.actual_amount.setValue("");
        }
      
    });
    console.log(shopserviceForm);
    this.toastr.success('Services added Successfully');

  }

  DisplayForm() {
    // (<HTMLInputElement>document.getElementById("shopservFormid")).style.display = "block";
  }

  changeOtherToadd(selectedVal:any) {
    // alert("hi") 
    // alert(selectedVal.target.value);
    if(selectedVal.target.value == "Others") {
      // (<HTMLInputElement>document.getElementById("hiddenServidTd")).style.display = "block";
    }
    else {
      // this.shopserviceForm.controls.hidden_service.setValue("");
      // (<HTMLInputElement>document.getElementById("hidden_service")).value = "";
      // (<HTMLInputElement>document.getElementById("hiddenServidTd")).style.display = "none";
    }
  }



 

  


  selectEvent(item:any) {
    // alert(item.service_id)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:any){
    // do something when input is focused
  }


  changeServiceStatus(serviceid:any,status:any) {
// alert(serviceid)
// alert(status)
    var changeServiceStatus = 
                   {
                  "shopserviceid": serviceid,
                  "status": status,
                   }

this.restApi.changeServiceStatus(changeServiceStatus).subscribe((data: any) => {
  console.log('POST Request is successful >>>>>>>>', data.status);
  if(data.status == "pass") {
    this.loadServiceData();
  }
},
success => {
  console.log('Error>>>>>', success);
 
  
  
}
);
  }

}
