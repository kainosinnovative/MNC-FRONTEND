import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrManager } from 'ng6-toastr-notifications';
// import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RestApiService } from "../shared/rest-api.service";
@Component({
  selector: 'app-newinsertpage',
  templateUrl: './newinsertpage.component.html',
  styleUrls: ['./newinsertpage.component.scss']
})
export class NewinsertpageComponent implements OnInit {
  config: any;
  collection = { count: 60, data: [] };
  serviceData:any;
  serviceData1:any;
  dashboardShop:any;
  dashboardShop1:any;
  constructor(private frmbuilder: FormBuilder,private http: HttpClient,private router: Router,
    public restApi: RestApiService) {
    
  }


  ngOnInit(): void {
    this.dashboardShopList();
    let value:any;
    // for (var i = 0; i < this.collection.count; i++) {
    //   this.collection.data.push(
    //     {
    //       id: i + 1,
    //       value: "items number " + (i + 1)
    //     }
    //   );
    // }

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
