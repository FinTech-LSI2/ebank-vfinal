import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwiperCarouselComponent } from '../swiper-carousel/swiper-carousel.component';
import { DiscoverAppComponent } from '../discover-app/discover-app.component';
import { FaqComponent } from '../faq/faq.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone:true,

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [SwiperCarouselComponent,DiscoverAppComponent,FaqComponent,ContactComponent,FooterComponent,NavbarComponent] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class HomeComponent  {

}

