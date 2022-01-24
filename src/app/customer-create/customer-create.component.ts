import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";


var num2: any;
var num1 = localStorage.getItem('isLoggedIn');
        if(num1 == "" || num1 == null) {
            num2 = 0;
        }
        else {
            num2 = num1;
        }

@Component({
selector: 'app-customer-create',
templateUrl: './customer-create.component.html',
styleUrls: ['./customer-create.component.scss']
})

export class CustomerCreateComponent implements OnInit {

    
    // if(localStorage.getItem('isLoggedIn') == "") {
        
    // }
    // else {
        // num1 = 0;
    // }
     
@Input() customerDetails = { name: '', email: '', phone: num2, gender: '', doorno: '', street: '', area: '', Pincode: '', city: '', landmark: '' }
constructor(
public restApi: RestApiService,
public router: Router
) { }
ngOnInit() { }
addCustomer() {
this.restApi.createCustomer(this.customerDetails).subscribe((data: {}) => {
this.router.navigate(['/customercreate'])
})
}
}
