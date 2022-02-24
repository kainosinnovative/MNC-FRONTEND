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
 
  constructor(private router:Router, public restApi: RestApiService,private fb:FormBuilder) { }

  ngOnInit(): void {
    
  }
  
  
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  
 
}

