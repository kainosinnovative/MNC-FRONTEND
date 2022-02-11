import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-onlinebooking',
  templateUrl: './onlinebooking.component.html',
  styleUrls: ['./onlinebooking.component.scss']
})
export class OnlinebookingComponent implements OnInit {

  displaydata: any;
  displaydata1: any;

  constructor(
    public restApi: RestApiService
  ) {  }

  ngOnInit(): void {
    this.displaycartype();
  }

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

}

