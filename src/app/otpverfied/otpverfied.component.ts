
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-otpverfied',
  templateUrl: './otpverfied.component.html',
  styleUrls: ['./otpverfied.component.scss']
})
export class OtpverfiedComponent implements OnInit {

  isloggedinUser = localStorage.getItem('isloggedinUser');
  public  dataForm1: FormGroup;
  dialog: any;
  dialogRef: any;
  
  otpFirstDigit:any;
  otpSecondDigit:any;
  otpThirdDigit:any;
  otpFourthDigit:any;
  orderby: any;
  customerdata:any;
  customerdata1:any;
  customerdata2:any;
  
constructor(public router: Router, public restApi: RestApiService,
  private frmbuilder: FormBuilder,private http: HttpClient) { };

ngOnInit(): void {
  this.dataForm1 = this.frmbuilder.group({
    mobile: [this.isloggedinUser, null],
   
    });
  
}



loadCustomerDetails2() {
  // alert("in")
  let isloggedinUser = localStorage.getItem('isloggedinUser');
  return this.restApi.getCustomerData(isloggedinUser).subscribe((data => {
    // let singleCus = params;
    this.customerdata = data;
      this.customerdata1 = this.customerdata.data;
      this.customerdata2 = this.customerdata1.SingleCustomerDetails;
      localStorage.setItem('currentUsername', this.customerdata2[0].customer_name); 

      window.location.reload();
    
    
  }
  ))
}


VerifyOtp(){
  var ReceiveOtp = localStorage.getItem('otpstore');
  // alert(num1)
  var firstDigit = this.otpFirstDigit;
  let SecondDigit = this.otpSecondDigit;
  let thirdDigit = this.otpThirdDigit;
  let fourthDigit = this.otpFourthDigit;
  
  let EnteredOtp = firstDigit + SecondDigit +thirdDigit + fourthDigit;
  if(ReceiveOtp == EnteredOtp) {
    localStorage.removeItem("otpstore");
    let isloggedinUser = localStorage.getItem('isloggedinUser');
    // alert(isloggedinUser)
    this.loadCustomerDetails2();
    // alert(isloggedinUser)
   
    // this.dialogRef.close();
    // this.router.navigateByUrl('/home');
  }
  else {
    (document.getElementById('invalidOtp') as HTMLFormElement).innerHTML = "Invalid Otp";
  }
}



// sendotp2(dataForm1: any) {
 
//       this.http.post('http://localhost/MYDEALER-API/app/sendOtp2', dataForm1).subscribe(
//       );
//   }


sendotp2(dataForm1: any) {
  // alert()
      console.log("send otp>>>>>")
      this.http.post('http://localhost/MYDEALER-API/app/sendOtp2', dataForm1).subscribe(
        
          data => {
              console.log('POST Request is successful >>>>>>>>', data);
  
          },
          success => {
              console.log('Error>>>>>', success);
             
              
              if(success.status == 404) {
                let msg = success.error;
                // let text = "How are you doing today?";
  const myArray = msg.split("message");
  const secondArr = myArray[1].split(",");
  let str = secondArr[0].substring(3);
  var newStr = str.substring(0, str.length - 1);
  
                (document.getElementById('pleaseregister') as HTMLFormElement).innerHTML = newStr;
                
              }
              else {
                let msg3 = success.error.text;
  
                
  let split_string = msg3.split(/(\d+)/)
  // alert(split_string[1])
  localStorage.setItem('otpstore', split_string[1]);
  localStorage.setItem('isloggedinUser', dataForm1.mobile);             
                this.dialogRef.close();
                const dialogRef = this.dialog.open(OtpverfiedComponent, {
      id: 'otpverfied'
    });
              }
             
          }
      );
  }
  
}
// function loadCustomerDetails() {
//   throw new Error('Function not implemented.');
// }





