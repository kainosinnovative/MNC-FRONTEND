import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  selectedCity: any;
  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    // alert("hi")
    this.getdatabycity();
    this.cdr.detectChanges();
  }

  getdatabycity() {
    this.selectedCity = localStorage.getItem('selectedCity');
  }

}
