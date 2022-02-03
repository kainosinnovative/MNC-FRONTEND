import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';



@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

contactfrom: any;

  constructor(
    private frmbuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.contactfrom = this.frmbuilder.group({
      username: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileno: ['', [Validators.required, Validators.pattern(mobilePattern)]]
      });
  }

}
