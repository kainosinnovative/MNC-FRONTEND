import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../shared/customer/customer';

import { Testimonial,Testimonial2,loginauth,logindetails,singleLoginTestimonial,shopCustlogin,Cartype,Services,ShopService,carbrand } from '../shared/customer/customer';

import { Observable, throwError } from 'rxjs';
import { retry, catchError,map } from 'rxjs/operators';
import { createcustomer } from '../shared/customer/customer';
import { contactdetails } from '../shared/customer/customer';

@Injectable({
providedIn: 'root'
})
export class RestApiService {
apiURL = 'http://localhost/MNC-PHP-API';
constructor(private http:HttpClient) {}
headers = new HttpHeaders().set('Content-Type', 'application/text');
// httpOptions = {
// headers: new HttpHeaders({}),

// }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": "*",
    
  } ),responseType: 'text' as 'json'
};

getCustomers(): Observable<Customer> {
return this.http.get<Customer>(this.apiURL + '/customers')
.pipe(
retry(1),
catchError(this.handleError)
)
}


gettestimonialData(): Observable<Testimonial> {
  
  return this.http.get<Testimonial>(this.apiURL + "/app/testimonialList")

  .pipe(
  retry(1),
  catchError(this.handleError)
  )
  }

  getcartype(): Observable<Cartype> {
  
    return this.http.get<Cartype>(this.apiURL + "/app/cartype")
  
    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

    getcarbrand(): Observable<carbrand> {
  
      return this.http.get<carbrand>(this.apiURL + "/app/brandtype")
    
      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }


    getServiceData(currentUserId:any): Observable<Services> {
      // alert(currentUserId)
      return this.http.get<Services>(this.apiURL + "/app/carAndShopservice?currentUserId="+currentUserId)
    
      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }
  
  
      // AddshopService(shopservAmount:any): Observable<ShopService> {
      //   alert(shopservAmount)
      //   let serviceid = shopservAmount["serviceid"];
      // let service_amount = shopservAmount["service_amount"];
      // let currentUserId = shopservAmount["currentUserId"];
      //   return this.http.get<ShopService>(this.apiURL + "/shop/AddshopService?service_amount="+service_amount +
      //    "&serviceid=" + serviceid + "&currentUserId="+currentUserId)
      
      //   .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      //   )
      //   }


  createTestimonial(testimonialData: any): Observable<Testimonial2>{
    return this.http.post<Testimonial2>(`${this.apiURL}/app/AddTestimonial`, testimonialData);
  }

  createcustomer(customerData: any): Observable<createcustomer>{
    return this.http.post<createcustomer>(`${this.apiURL}/app/Addcustomer`, customerData);
  }

 



//     return this.http.post('http://localhost:3000/api/Users/login', data, httpOptions)
//    .do( function(resp) {
//         self.setSession(resp);
//  });
    
    loginauth(AuthData: { mobno: any;}):
    Observable<loginauth> {
      // console.log("res>>>>",Response)
    return this.http.post<loginauth>(this.apiURL + '/app/sendOtp2', AuthData,
    this.httpOptions)
    // .do( function(resp: any) {
    //   self.setSession(response);
    .pipe(map( (response: any) => response ),
    retry(1), // <- return response
    catchError(this.handleError),
    // retry(1),
    // catchError(this.handleError)
    )
    // console.log("res>>>>",Response)
    }

    signup(AuthData:any):
    Observable<loginauth> {
     
    return this.http.post<loginauth>(this.apiURL + '/app/signupCustomer', AuthData,
    this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

    getCustomerData(jsonObject:any): Observable<shopCustlogin> {
      // console.log("mob>>>",jsonObject);
      let customer_mobileno = jsonObject["isloggedinUser"];
      let loginfor = jsonObject["loginfor"];
      // var finalstr = customer_mobileno + "" + loginfor;
      // alert("loginfor>>>"+loginfor)
      // alert("customer_mobileno>>>"+customer_mobileno)
      return this.http.get<shopCustlogin>(this.apiURL + '/app/SingleCustomerDetails?customer_mobileno='+customer_mobileno+'&loginfor='+loginfor)
      
      .pipe(
        retry(1),
        catchError(this.handleError)
        
      )
    
    } 


    // getLoginTestimonial(currentUserId	:any): Observable<singleLoginTestimonial> {
      
    //   return this.http.get<singleLoginTestimonial>(this.apiURL + '/app/SingleLoginTestimonial?customerid='+ currentUserId	)
      
    //   .pipe(
    //     retry(1),
    //     catchError(this.handleError)
        
    //   )
    
    // }
  

getCustomer(id:any): Observable<Customer> {
    // alert("phone"+phone)
    // alert("phone"+this.apiURL + '/customers/' + phone)
    return this.http.get<Customer>(this.apiURL + '/customers/' + id)
    
    .pipe(
      retry(1),
      catchError(this.handleError)
      
    )
  
  }  
  
  
  updateCustomer(id:any, employee:any): Observable<Customer> {
    return this.http.put<Customer>(this.apiURL + '/customers/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // read user data
  // readCustomerDataById(currentUserId:any): Observable<createcustomer>{
  //   return this.http.get<createcustomer>(`${this.apiURL}/app/readCustomerDataById`);
  // }

  readCustomerDataById(currentUserId	:any): Observable<logindetails> {
    console.log("api>>>",currentUserId);
    // alert("phone"+customer_mobileno)
    // alert("phone"+this.apiURL + '/customers/' + phone)
    return this.http.get<logindetails>(this.apiURL + '/app/readCustomerDataById?customer_id='+ currentUserId	)
    
    .pipe(
      retry(1),
      catchError(this.handleError)
      
    )
  
  } 

createCustomer(employee: { name: string; email: string; phone: number; gender: string;doorno: string; street: string;
area: string; Pincode: string; city: string; landmark: string;}):
Observable<Customer> {
  // alert(employee)
return this.http.post<Customer>(this.apiURL + '/customers', JSON.stringify(employee),
this.httpOptions)
.pipe(
retry(1),
catchError(this.handleError)
)
}
handleError(error:any) {
let errorMessage = '';
if(error.error instanceof ErrorEvent) {
// Get client-side error
errorMessage = error.error.message;
} else {
// Get server-side error
errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
window.alert(errorMessage);
return throwError(errorMessage);
}


readShopProfileDataById(currentShopId	:any): Observable<logindetails> {
  
  return this.http.get<logindetails>(this.apiURL + '/shop/getShopProfileById?shop_id='+ currentShopId	)
  
  .pipe(
    retry(1),
    catchError(this.handleError)
    
  )

} 

}
