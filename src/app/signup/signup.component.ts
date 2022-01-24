import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { Inject, Injectable} from  '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

import { OtpverfiedComponent } from '../otpverfied/otpverfied.component';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';




import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  dataForm: any;



  //dialog: any;

  // constructor(private  dialogRef:  MatDialogRef<SignupComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any,public router: Router,public dialog: MatDialog) {


  constructor(private  dialogRef:  MatDialogRef<SignupComponent>,
     @Inject(MAT_DIALOG_DATA) public  data:  any,public router: Router,
     private frmbuilder: FormBuilder,
     private http: HttpClient,
     public restApi: RestApiService,public dialog: MatDialog) {

  }

  ngOnInit(): void {
    
  }

  closeMe() {
    this.dialogRef.close();
  }
  
  
    
  //   this.dialogRef.close();
  //   //newFunction();
  // this.dialog.open(LoginComponent,{ data: {
  // message:  "Error!!!"
  // }});

  signup(dataForm: any) {
    //   // alert("hi")
      // this.restApi.signup(dataForm).subscribe()
    }


  login(){

    const dialogRef = this.dialog.open(LoginComponent, {
      id: 'login'
    });
  
    // console.log(dialogRef);
  }

//   signup(dataForm: any) {
//     this.http.post('http://localhost/angPHP/carwash/PHP/insert.php', dataForm).subscribe(
//         data => {
//             console.log('POST Request is successful ', data);
//             // this.getData();
//             this.dataForm.reset('');
//             // this.showSuccess("Data Inserted :)");
//             this.dialogRef.close();
//         },
//         error => {
//             console.log('Error', error);
//             // this.errorMsg = error;
//         }
//     );
// }


   


Otpvrf(){

  // const dialogRef = this.dialog.open(OtpverfiedComponent, {
  //   id: 'otpverfied'
  // });

  // console.log(dialogRef);
}

}




