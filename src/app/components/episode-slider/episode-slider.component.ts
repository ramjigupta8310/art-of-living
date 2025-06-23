import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-slider',
  imports: [CommonModule],
  templateUrl: './episode-slider.component.html',
  styleUrl: './episode-slider.component.css'
})
export class EpisodeSliderComponent implements OnInit, AfterViewInit {
  @Input() slideId!: number;
  @ViewChild('slider') slider!: ElementRef;

  episodes: any[] = [];
  canScrollLeft = false;
  canScrollRight = true;

  allEpisodes: { [key: number]: { title: string; thumbnail: string; }[] } = {
    1: [
      { title: 'Episode 1', thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg' },
      { title: 'Episode 2', thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg' }
    ],
    // 3: [
    //   { title: 'Season 2 - Episode 1', thumbnail: 'assets/thumb3.jpg' },
    //   { title: 'Season 2 - Episode 2', thumbnail: 'assets/thumb4.jpg' }
    // ]
  };

  ngOnInit() {
    this.episodes = this.allEpisodes[this.slideId] || [];
  }

  ngAfterViewInit() {
    this.checkScrollButtons();
    this.slider.nativeElement.addEventListener('scroll', () => this.checkScrollButtons());
  }

  scrollLeft() {
    this.slider.nativeElement.scrollLeft -= 300;
  }

  scrollRight() {
    this.slider.nativeElement.scrollLeft += 300;
  }

  checkScrollButtons() {
    const el = this.slider.nativeElement;
    this.canScrollLeft = el.scrollLeft > 0;
    this.canScrollRight = el.scrollLeft + el.offsetWidth < el.scrollWidth;
  }
}