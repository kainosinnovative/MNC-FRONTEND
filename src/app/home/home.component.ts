import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RestApiService } from "../shared/rest-api.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {
  selectedCity: any;
  dashboardShop:any;
  dashboardShop1:any;
  dashboardShopOffer:any;
  dashboardShopOffer1:any;
  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    // alert("hi")
    this.dashboardShopDetailByOffer();
    // this.cdr.detectChanges();
    this.dashboardShopList();
  }

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};
  
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
      // console.log("data dashboard>>>",this.dashboardShop1);
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


  slideConfig1 = {"slidesToShow": 3, "slidesToScroll": 1};
  
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
