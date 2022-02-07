export class Customer {
    id: string = '';
    name: string = '';
    email: string = '';
    phone: number = 0;

    gender: string = '';
    doorno: string = '';
    street: string = '';
    area: string = '';
    Pincode: string = '';
    city: string = '';
    landmark: string = '';
    }


    export class Testimonial {
        testimonial_id: number = 0;
        name: string = '';
        user_title: string = '';
    user_description:string = '';
    user_profile:string = '';
    testimonial_status: string = '';
    }

    export class ILogin {      
        userid: string = "";    
        password: string = "";    
      }  

      export class Testimonial2 {
        json() {
          throw new Error('Method not implemented.');
        }
        user_description:string = "";
        user_rating:any = "";
        customer_id :any = "";
       
      }

      export class createcustomer {
        json() {
          throw new Error('Method not implemented.');
        }
        user_description:string = "";
        user_rating:any = "";
        customer_id :any = "";
       
      }

      export class contactdetails {
        json() {
          throw new Error('Method not implemented.');
        }
        name:string = "";
        phoneno:any = "";
        mailid :any = "";
        message :any = "";
        shopower :any = "";
       
      }
      
      export class loginauth {
        statusText(statusText: any) {
          throw new Error('Method not implemented.');
        }
        type: loginauth;
        status: any;
        json() {
          throw new Error('Method not implemented.');
        }
        
        mobno:any = "";
       
      }

      export class logindetails {
        customer_mobileno:any = "";
      }


      export class singleLoginTestimonial {
        customer_id:any = "";
      }

      export class shopCustlogin {
        customer_mobileno:string = "";
        loginfor:string = "";
      }


      