import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,} from '@angular/forms';
//import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { HttpClient } from '@angular/common/http';
//import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute,ParamMap, Params  } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-onlinebooking',
  templateUrl: './onlinebooking.component.html',
  styleUrls: ['./onlinebooking.component.scss']
})
export class OnlinebookingComponent implements OnInit {

  show: boolean = true

  displaydata: any;
  displaydata1: any;
  onlinebooking: any;
  brandtype: any;
  branddata: any;
  selectedDeviceObj: any;
  myusername: any;
  carmodelsdata:any;
  modelsdata: any;
  selecttypedata: any;
  myuser: any;
  CustomerDataById: any;
  CustomerDataById1: any;
  //date: any;
  shopdetails: any;
  shopdetails1: any;
  offerdetails: any;
  offerslist: any;
  MasterServiceid: any;
  MasterServiceid1: any;
   public totalvalue : number=0;
   public finalvalue : number=0;
//totalvalue = 0;
carDetailsById:any;
carDetailsById1:any;

  currentUsername = localStorage.getItem('currentUsername');
 isloggedinUser = localStorage.getItem('isloggedinUser');

 public text: string = 'Select';

 public textcontent: string = 'Select';


  constructor(
    public restApi: RestApiService,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    //public datepipe: DatePipe
    private router: ActivatedRoute
  ) {  }





  ngOnInit(): void {
    this.displaycartype();
    this.loadcarbrand();
    this.readCustomerDataById();
    // this.loadshopdetails();
    this.loadcarDetailsById();
    this.idbyMasterService();
  
   
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.onlinebooking = this.frmbuilder.group({
      firstname: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileno:['', [Validators.required, Validators.pattern(mobilePattern)]],
      cartype: ['', Validators.required],
      fueltype: ['', Validators.required],
      brand: ['', Validators.required],
      date: ['', Validators.required],
      model: ['', Validators.required],
      // lastupddt: [current_date, [Validators.required]]
       }) 


       this.router.params.subscribe(params => {
        const id = params['id'];
        this.loadshopdetails(id);
        this.loadshopoffers(id);
  })
  }




  // readCustomerDataById() {
  //   throw new Error('Method not implemented.');
  // }

  


  cartype(){
    console.log("hiiiii1111");
}

displaycartype(){
    
    
  return this.restApi.getcartype().subscribe((cartypedata: {}) => {
    // alert(data)
    this.displaydata = cartypedata;
    this.displaydata1 = this.displaydata.data.type;
    
    console.log("data>>>>",this.displaydata1)
  })
}

loadcarbrand(){
    
    
  return this.restApi.getcarbrand().subscribe((carbranddata: {}) => {
    // console.log(carbranddata);
     //console.log(hi)
    this.brandtype = carbranddata;
    this.branddata = this.brandtype.data.type;
    
    console.log("data>>>>",this.branddata)
  })
}

onChangeObj(newObj: any) {
  console.log(newObj);
  

  this.selectedDeviceObj = newObj;

  (<HTMLInputElement>document.getElementById("model")).value='';
  this.myusername = (<HTMLInputElement>document.getElementById("cartype")).value;
  console.log(this.myusername);



  // ... do other stuff here ...

  this.http.get('http://localhost/MNC-PHP-API/app/model?cartype='+this.myusername+ 
'&brand='+this.selectedDeviceObj).subscribe(
data => {
  //alert(data)
  console.log(data);
  this.carmodelsdata = data
  this.modelsdata = this.carmodelsdata.data.type;
},
error => {
  // alert(error)
  console.log(error.status)
 // if(error.status == "200") {
    //this.showsuccess();
   // this.pagerefresh();
 // }
}
);
}

onchangecartype(typedata: any) {
  console.log(typedata);
  

  this.selecttypedata = typedata;

  (<HTMLInputElement>document.getElementById("model")).value='';
  this.myuser = (<HTMLInputElement>document.getElementById("carbrand")).value;
  console.log(this.myuser);



  // ... do other stuff here ...

  this.http.get('http://localhost/MNC-PHP-API/app/model?brand='+this.myuser+ 
'&cartype='+this.selecttypedata).subscribe(
data => {
  //alert(data)
  console.log(data);
  this.carmodelsdata = data
  this.modelsdata = this.carmodelsdata.data.type;
},
error => {
  // alert(error)
  console.log(error.status)
 
}
);
}

readCustomerDataById() {
  
  let currentUserId = localStorage.getItem('currentUserId');

  return this.restApi.readCustomerDataById(currentUserId).subscribe((res)=>{
    this.CustomerDataById = res

    
    this.CustomerDataById1 = this.CustomerDataById.data.profile
    console.log(this.CustomerDataById);
    
  }
    
  
  )
  
}

loadshopdetails(currentUserId:any){

  // let currentUserId = 1;
  
  return this.restApi.getServiceData(currentUserId).subscribe((data: {}) => {
    // alert(data)
    this.shopdetails = data;
    //console.log("abi", this.shopdetails);
     this.shopdetails1 = this.shopdetails.data.carAndShopservice;
    
     console.log("abi>>>>",this.shopdetails1)
    
  })
}

loadshopoffers(currentShopId:any){

  // let currentShopId = 1;
  
  return this.restApi.ShopoffersById(currentShopId).subscribe((data: {}) => {

    //console.log('testabi', data);
   
    this.offerdetails = data;
    this.offerslist = this.offerdetails.data.OnlineBookingShopDetails;
    console.log("test>>>>",this.offerslist)
    
  })

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

  

changeBgColor(offer_id:any){

  let offer_totalid = "offerprice_" + offer_id ;
  // alert(offer_totalid);
   var offer_amt: number;
    let  buttonid="select_"+ offer_id;

    let buttontext =  (<HTMLInputElement>document.getElementById(buttonid)).innerHTML;

      if(buttontext === 'Select') { 
       

        (<HTMLInputElement>document.getElementById(buttonid)).innerHTML = "Selected";
      (<HTMLInputElement>document.getElementById(buttonid)).style.backgroundColor = "green";
       offer_amt = Number((<HTMLInputElement>document.getElementById(offer_totalid)).value);
        //alert(offer_amt);
        this.finalvalue = this.finalvalue +(offer_amt);
        (<HTMLInputElement>document.getElementById("finalamount")).value = this.finalvalue.toFixed();
      } else {
     
      (<HTMLInputElement>document.getElementById(buttonid)).innerHTML = "Select";
      (<HTMLInputElement>document.getElementById(buttonid)).style.backgroundColor = "skyblue";
       offer_amt = Number((<HTMLInputElement>document.getElementById(offer_totalid)).value);
       this.finalvalue = this.finalvalue -(offer_amt);
       (<HTMLInputElement>document.getElementById("finalamount")).value = this.finalvalue.toFixed();
  }
}

selectbuttoncolor(service_id:any){

 //alert(service_id);
   
  let service_totalid = "amount_" + service_id ;
  

 let  currentserviceid ="chooice_"+ service_id;
  let selecttext =  (<HTMLInputElement>document.getElementById(currentserviceid)).innerHTML;

 // alert(selecttext);

      if(selecttext === 'Select') { 
        (<HTMLInputElement>document.getElementById(currentserviceid)).innerHTML = "Selected";
       (<HTMLInputElement>document.getElementById(currentserviceid)).style.backgroundColor = "green";
       var service_amt = Number((<HTMLInputElement>document.getElementById(service_totalid)).value);
       console.log(service_amt);
      this.totalvalue = this.totalvalue +(service_amt);
      console.log(this.totalvalue);
      (<HTMLInputElement>document.getElementById("totalamount")).value =  this.totalvalue.toFixed();

       } else {
   
     (<HTMLInputElement>document.getElementById(currentserviceid)).innerHTML = "Select";
     (<HTMLInputElement>document.getElementById(currentserviceid)).style.backgroundColor = "skyblue";
     var service_amt = Number((<HTMLInputElement>document.getElementById(service_totalid)).value);
     this.totalvalue = this.totalvalue -(service_amt);
     (<HTMLInputElement>document.getElementById("totalamount")).value =  this.totalvalue.toFixed();
 }

//  var extraserviceTotalAmount:any = (<HTMLInputElement>document.getElementById("totalamount")).value;
//     var comboserviceTotalAmount:any = (<HTMLInputElement>document.getElementById("finalamount")).value;
//     if(comboserviceTotalAmount == "0" || comboserviceTotalAmount == "" || extraserviceTotalAmount == "0" || extraserviceTotalAmount == "") {
//       comboserviceTotalAmount = 0;
//       extraserviceTotalAmount = 0;
//       alert("if");
//       (<HTMLInputElement>document.getElementById("final_totalamount")).value = extraserviceTotalAmount + comboserviceTotalAmount;

//     }
//     else {
//       (<HTMLInputElement>document.getElementById("final_totalamount")).value = extraserviceTotalAmount + comboserviceTotalAmount;

//     }


var extraserviceTotalAmount = Number((<HTMLInputElement>document.getElementById("totalamount")).value);
    var comboserviceTotalAmount = Number((<HTMLInputElement>document.getElementById("finalamount")).value);
    let FinAmount = extraserviceTotalAmount + comboserviceTotalAmount;
    (<HTMLInputElement>document.getElementById("final_totalamount")).value = FinAmount.toString();
    
}

idbyMasterService(){
    
  return this.restApi.getMasterService().subscribe((data: {}) => {
    // alert(data)
    this.MasterServiceid = data;
    this.MasterServiceid1 = this.MasterServiceid.data.type;
    
    console.log("aravind>>>>",this.MasterServiceid1)
    // this.dtTrigger.next();

  })

  
}
ComboServiceArr = new Array();
ComboServiceArr1 = new Array();
getComboOfferDetails(Comboserviceid:any,Comboservice_amount:any,Comboservice_Offername:any) {
  var concatServiceid_amount =  Comboserviceid + "#" + Comboservice_Offername;

    if(this.ComboServiceArr.includes(concatServiceid_amount)){
      this.ComboServiceArr = this.remove(this.ComboServiceArr, concatServiceid_amount);
    }
    else {
      this.ComboServiceArr.push(concatServiceid_amount);
    }

    var arrayLength = this.ComboServiceArr.length;
    this.ComboServiceArr1 = new Array();
    for (var i = 0; i < arrayLength; i++) {
      var splitArr = this.ComboServiceArr[i].split("#");
      

      //Do something
      this.ComboServiceArr1.push(splitArr[1]);
      
  }

    (<HTMLInputElement>document.getElementById("offernameShow")).innerText = this.ComboServiceArr1.toString();
    
    var extraserviceTotalAmount = Number((<HTMLInputElement>document.getElementById("totalamount")).value);
    var comboserviceTotalAmount = Number((<HTMLInputElement>document.getElementById("finalamount")).value);
    let FinAmount = extraserviceTotalAmount + comboserviceTotalAmount;
    (<HTMLInputElement>document.getElementById("final_totalamount")).value = FinAmount.toString();
    

    
    // alert(this.ComboServiceArr1)
}


remove(arr:any, item:any)
{
    var index = this.ComboServiceArr.indexOf(item);
    return [
 
        // part of the array before the given item
        ...this.ComboServiceArr.slice(0, index),
 
        // part of the array after the given item
        ...this.ComboServiceArr.slice(index + 1)
    ];
}





slideConfig1 = {"slidesToShow": 4, "slidesToScroll": 1};
  
  slickInit1(e:any) {
    console.log('slick initialized');
  }
    
  breakpoint1(e:any) {
    console.log('breakpoint');
  }
    
  afterChange1(e:any) {
    console.log('afterChange');
  }
    
  beforeChange1(e:any) {
    console.log('beforeChange');
  }


  loadcarDetailsById(){
    
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.CarDetailsById(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.carDetailsById = data;
      this.carDetailsById1 = this.carDetailsById.data.CarDetailsByCustomerId;
      console.log("carDetailsById1>>>",this.carDetailsById1)
    })
  }

}


