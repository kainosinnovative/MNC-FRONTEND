
import { Component, OnInit,Input } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

import { RestApiService } from "../shared/rest-api.service";
@Component({
  selector: 'app-testimonial-add',
  templateUrl: './testimonial-add.component.html',
  styleUrls: ['./testimonial-add.component.scss']
})
export class TestimonialAddComponent implements OnInit {
  
  @Input() testimonialDetails = { user_description:'', user_rating:''}
  constructor(private  dialogRef:  MatDialogRef<TestimonialAddComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any,public router: Router, public restApi: RestApiService) {
  }

  // user_description:any;
  starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
rating:any;  
//Create a function which receives the value counting of stars click, 
//and according to that value we do change the value of that star in list.
setStar(data:any){
      this.rating=data+1;                               
      for(var i=0;i<=4;i++){  
        if(i<=data){  
          this.starList[i]=false;  
        }  
        else{  
          this.starList[i]=true;  
        }  
     } 
    //  
    this.testimonialDetails.user_rating = this.rating
 }

  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public  closeMe() {
      this.dialogRef.close();
  }

  testimonial: any = [];

  onClickSubmit() {
    alert(this.testimonialDetails.user_description)
    // alert(this.testimonialDetails.username)
    // this.testimonialDetails.user_rating = (<HTMLInputElement>document.getElementById("username")).value;
    // this.testimonialDetails.user_rating = "300";
    this.restApi.createTestimonial(this.testimonialDetails).subscribe()
    
 }

 
}

