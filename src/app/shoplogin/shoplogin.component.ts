import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shoplogin',
  templateUrl: './shoplogin.component.html',
  styleUrls: ['./shoplogin.component.scss']
})
export class ShoploginComponent implements OnInit {

  public  shopform: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
