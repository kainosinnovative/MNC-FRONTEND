
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';



@Component({
  selector: 'app-otpverfied',
  templateUrl: './otpverfied.component.html',
  styleUrls: ['./otpverfied.component.scss']
})
export class OtpverfiedComponent implements OnInit {
  showMyContainer: boolean = false;
  showTimerContainer:boolean=true;
  isloggedinUser = localStorage.getItem('isloggedinUser');
  public  dataForm1: FormGroup;
  dialog: any;
  // dialogRef: any;
  name = 'Angular 6';
  timeLeft: number = 10;
  interval:any;

  otpFirstDigit:any;
  otpSecondDigit:any;
  otpThirdDigit:any;
  otpFourthDigit:any;
  orderby: any;
  customerdata:any;
  customerdata1:any;
  customerdata2:any;

  
  
constructor(public router: Router, public restApi: RestApiService,private  dialogRef:  MatDialogRef<OtpverfiedComponent>,
  @Inject(MAT_DIALOG_DATA) public  data:  any,
  private frmbuilder: FormBuilder,private http: HttpClient,private toastr: ToastrService) { };

ngOnInit(): void {
  this.dataForm1 = this.frmbuilder.group({
    mobile: [this.isloggedinUser, null],
   
    });
 this.startTimer(); 
}



loadCustomerDetails2(Objval:any) {
  // alert("in")
  console.log("in");
  let isloggedinUser = localStorage.getItem('isloggedinUser');
  let loginfor = localStorage.getItem('loginfor');


  var jsonObject = 
                {
                  "isloggedinUser": isloggedinUser,
                  "loginfor": loginfor 
                  
                  }
  // this.loadLoginuserTestimonial();
  
  return this.restApi.getCustomerData(jsonObject).subscribe((data => {
    this.customerdata = data;
      this.customerdata1 = this.customerdata.data;
      this.customerdata2 = this.customerdata1.SingleCustomerDetails;
     
      console.log("data>>",data)
      
      if(loginfor == 'shopowner') {
        
      localStorage.setItem('currentUsername', this.customerdata2[0].firstname); 
      localStorage.setItem('currentUserId', this.customerdata2[0].shop_id );
      localStorage.setItem('userroleSes', 'shopOwnerSes');
      }
      else {
        localStorage.setItem('currentUsername', this.customerdata2[0].firstname); 
      localStorage.setItem('currentUserId', this.customerdata2[0].customer_id);
      localStorage.setItem('userroleSes', 'CustomerSes');
      }

     
      this.showloginSuccess();
      // this.toastr.success(Objval+' Successfully');
      // window.location.reload();
      this.pagerefresh();
  }
  ))
  
}


showloginSuccess() {
  console.log("login message");
  
  this.toastr.success('Logged In Successfully');
  
      // 
}

pagerefresh() {
  // window.location.reload();
let userroleSes = localStorage.getItem('userroleSes');
alert(userroleSes)
  if(userroleSes == 'CustomerSes'){
    this.router.navigate(['/home']);
  }
  else {
    this.router.navigate(['/ShopDashboard']);
  }

  window.setTimeout(function(){location.reload()},2000)
}


pagerefresh1() {
  // window.location.reload();
let loginfor = localStorage.getItem('loginfor');
alert(loginfor)
  if(loginfor == 'customersignup'){
    this.router.navigate(['/home']);
    
  }
  else {
    this.router.navigate(['/shoplogin']); 
  }

  window.setTimeout(function(){location.reload()},2000)
}


signupdetailsInsert(){
  // alert("hi")
  let registerUserName = localStorage.getItem('registerUserName');
      let registerEmailid = localStorage.getItem('registerEmailid');
      let registerMobileNo = localStorage.getItem('registerMobileNo');
      let loginfor = localStorage.getItem('loginfor');
      
  this.http.get('http://localhost/MNC-PHP-API/app/signupCustomer?customer_name='+registerUserName+ 
  '&customer_mobileno='+registerMobileNo + '&customer_email='+registerEmailid + '&loginFor='+loginfor ).subscribe(
    data => {
      alert(data)
    },
    error => {
      // alert(error)
      console.log(error.status)
      if(error.status == "200") {
        this.showsuccess();
        this.pagerefresh1();
      }
    }
    
  
   );

  

  // console.log("in");
  
  // localStorage.removeItem("otpstore");
  // window.location.reload();
  // this.dialogRef.close();

  // this.loadCustomerDetails2("this.toastr.success(Objval+' Successfully');");

  //let registerUserName = localStorage.getItem('registerUserName');
  
  
  
  }

  showsuccess() {
    console.log("success");
    this.toastr.success('Registered Successfully Please Login');
    // window.location.reload();
  }


  closeMe() {
    this.dialogRef.close();
 }
 

  VerifyOtp(){
    var ReceiveOtp = localStorage.getItem('otpstore');
    //  alert("ReceiveOtp>>>"+ReceiveOtp)
    var firstDigit = this.otpFirstDigit;
    let SecondDigit = this.otpSecondDigit;
    let thirdDigit = this.otpThirdDigit;
    let fourthDigit = this.otpFourthDigit;
    
    let EnteredOtp = firstDigit + SecondDigit +thirdDigit + fourthDigit;
    // alert("EnteredOtp>>>"+EnteredOtp)
   
    if(ReceiveOtp == EnteredOtp) {
      localStorage.removeItem("otpstore");
      let sessionbtn = localStorage.getItem('sessionbtn');
      if(sessionbtn == "login") {
        this.loadCustomerDetails2("Loggedin");
      }
      else {
  this.signupdetailsInsert();
      }
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
  // this.pauseTimer();
  this.timeLeft=20;
     this.startTimer();
      this.http.post('http://localhost/MNC-PHP-API/app/sendOtp2', dataForm1).subscribe(
        
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
  
                // (document.getElementById('pleaseregister') as HTMLFormElement).innerHTML = newStr;
                
              }
              else {
                let msg3 = success.error.text;
  
                
  let split_string = msg3.split(/(\d+)/)
  // alert(split_string[1])
  localStorage.setItem('otpstore', split_string[1]);
  localStorage.setItem('isloggedinUser', dataForm1.mobile);             
                // this.dialogRef.close();
    //             const dialogRef = this.dialog.open(OtpverfiedComponent, {
    //   id: 'otpverfied'
    // });
              }
             
          }
      );
  }
  startTimer() {
   
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
       this.showTimerContainer=true;
       this.showMyContainer=false;
      }
     
      else{
          this.showMyContainer=true;
      this.showTimerContainer=false;
     // this.timeLeft=10;
    //  alert("in")
    localStorage.removeItem("otpstore");
       }
    },2000)
  }
  
  pauseTimer() {
    clearInterval(this.interval);
  }  
}
// function loadCustomerDetails() {
//   throw new Error('Function not implemented.');
// }





