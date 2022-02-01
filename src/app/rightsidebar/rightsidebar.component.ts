import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { TestimonialAddComponent } from '../testimonial-add/testimonial-add.component';
@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})
export class RightsidebarComponent implements OnInit {
  currentUsername = localStorage.getItem('currentUsername');
  constructor(private  dialog:  MatDialog, private  router:  Router) { }

  ngOnInit(): void {
  }

  testimonialAdd(){
  
    this.dialog.open(TestimonialAddComponent);
 

 
}

}
