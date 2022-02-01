import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../shared/customer/customer';
import { Testimonial,Testimonial2,loginauth,logindetails,singleLoginTestimonial } from '../shared/customer/customer';
import { Observable, throwError } from 'rxjs';
import { retry, catchError,map } from 'rxjs/operators';
import { createcustomer } from '../shared/customer/customer';
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



  
  

  // createTestimonial(testimonialData:any):
  //   Observable<Testimonial2> {
      
  //   return this.http.post<Testimonial2>(this.apiURL + '/app/AddTestimonial', testimonialData,
  //   this.httpOptions)
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

    getCustomerData(customer_mobileno	:any): Observable<logindetails> {
      console.log(customer_mobileno);
      // alert("phone"+customer_mobileno)
      // alert("phone"+this.apiURL + '/customers/' + phone)
      return this.http.get<logindetails>(this.apiURL + '/app/SingleCustomerDetails?orderby='+ customer_mobileno	)
      
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
}
