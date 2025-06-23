import { Component } from '@angular/core';
import { HomeCarouselComponent } from '../../components/home-carousel/home-carousel.component';

@Component({
  selector: 'app-home',
  imports: [HomeCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
