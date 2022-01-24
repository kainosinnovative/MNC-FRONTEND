import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrManager } from 'ng6-toastr-notifications';
// import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
@Component({
  selector: 'app-newinsertpage',
  templateUrl: './newinsertpage.component.html',
  styleUrls: ['./newinsertpage.component.scss']
})
export class NewinsertpageComponent implements OnInit {
  dataForm: FormGroup;
  // fetchdata;
  // errorMsg;
  constructor(private frmbuilder: FormBuilder,private http: HttpClient,private router: Router) {}


  ngOnInit(): void {
    this.dataForm = this.frmbuilder.group({
      id: ['', null],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required]
      });
  }

  PostData(dataForm: any) {
    this.http.post('http://localhost/angPHP/carwash/PHP/insert.php', dataForm).subscribe(
        data => {
            console.log('POST Request is successful ', data);
            // this.getData();
            // this.dataForm.reset('');
            // this.showSuccess("Data Inserted :)");
        },
        error => {
            console.log('Error', error);
            // this.errorMsg = error;
        }
    );
}

}
