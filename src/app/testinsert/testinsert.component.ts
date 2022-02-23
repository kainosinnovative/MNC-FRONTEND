import { RestApiService } from "../shared/rest-api.service";
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})
export class TestinsertComponent implements OnInit {
  selectedCity: any;
  dashboardShop:any;
  dashboardShop1:any;
  productForm: FormGroup;  
  carDetailsById1:any;
  carDetailsById:any;
  constructor(private router:Router, public restApi: RestApiService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    });  
    this.loadcarDetailsById();
  }
  
  
     
  loadcarDetailsById(){
    
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.CarDetailsById(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.carDetailsById = data;
      this.carDetailsById1 = this.carDetailsById.data.CarDetailsByCustomerId;
      console.log("carDetailsById>>>",this.carDetailsById)
    })
  }

  
    
  quantities() : FormArray {  
    return this.carDetailsById.data as FormArray
    // return this.productForm.get("quantities") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({  
      qty: '',  
      price: '',  
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.productForm.value);  
  }  

  
 
}

