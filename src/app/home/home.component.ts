import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RestApiService } from "../shared/rest-api.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  selectedCity: any;
  dashboardShop:any;
  dashboardShop1:any;
  constructor(private cdr:ChangeDetectorRef, public restApi: RestApiService) { }

  ngOnInit(): void {
    // alert("hi")
    // this.getdatabycity();
    // this.cdr.detectChanges();
    this.dashboardShopList();
  }

  // getdatabycity() {
  //   this.selectedCity = localStorage.getItem('selectedCity');
  // }

  // dashboardShopList() {
  // let selectedCity2 = localStorage.getItem('selectedCity');
  // }

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

  

}
