import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RestApiService } from "../shared/rest-api.service";
import { Router,ActivatedRoute,ParamMap, Params  } from '@angular/router';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  date:any;
  selectedCity: any;
  dashboardShop:any;
  dashboardShop1:any;
  dashboardShopOffer:any;
  dashboardShopOffer1:any;
  MasterServiceData:any;
  MasterServiceData1:any;
  CustomerWhislistData:any;
  CustomerWhislistData1:any;
  customerId:any;
  param1: string;
param2: string;
  // route: any;
  constructor(public restApi: RestApiService,public datepipe: DatePipe,private route:ActivatedRoute,private router:Router,private eventEmitterService: EventEmitterService) { }
  currentUsername = localStorage.getItem('currentUsername');

  userroleSes = localStorage.getItem('userroleSes');
  

  ngOnInit(): void {
    this.date=new Date();
    this.date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.loadMasterService();
    // alert("hi")
    this.dashboardShopDetailByOffer();
    // this.cdr.detectChanges();
    this.dashboardShopList();
   
    this.customerId= localStorage.getItem('currentUserId');
   console.log(this.customerId);
    if(this.customerId != null)
    {
    this.customerWhislist(this.customerId);
    }
    // this.router.queryParams.subscribe(params => {
    //   console.log("params>>>",params);
    // });

    
  }
  customerWhislist(customerId:any)
  {
    var whislist : [];
    
    return this.restApi.getCustomerWhislist(customerId).subscribe((data: {}) => {
      // alert(data)
      this.CustomerWhislistData = data;
      this.CustomerWhislistData1= this.CustomerWhislistData.data.whislist;
      
      console.log("whislist",this.CustomerWhislistData1);
      // this.dtTrigger.next();
    })

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
  loadMasterService(){
    
    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;
      
      console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
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
  dashboardShopList(){
    var cityid:any;
    cityid = localStorage.getItem('selectedCity');
    if(cityid == null ){
      cityid = 3;
    }
    // alert(cityid)
    return this.restApi.dashboardShop(cityid).subscribe((data: {}) => {
      // alert(data)
      this.dashboardShop = data;
      this.dashboardShop1 = this.dashboardShop.data.dashboardShopList;
      console.log("data dashboard>>>",this.dashboardShop1);
    })
  }
 

  dashboardShopDetailByOffer(){
    var cityid:any;
    cityid = localStorage.getItem('selectedCity');
    if(cityid == null ){
      cityid = 3;
    }
    // alert(cityid)
    return this.restApi.dashboardShopDetailsByOffer(cityid).subscribe((data: {}) => {
      // alert(data)
      this.dashboardShopOffer = data;
      this.dashboardShopOffer1 = this.dashboardShopOffer.data.dashboardShopDetailsByOffer;
      console.log("dashboard>>>",this.dashboardShopOffer1);
    })
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
  

}
