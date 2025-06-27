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

      { title: 'Episode 2', thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg' },

      { title: 'Episode 3', thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg' },

      { title: 'Episode 4', thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg' },

      { title: 'Episode 5', thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg' },

      { title: 'Episode 6', thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg' },

      { title: 'Episode 7', thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg' },

      { title: 'Episode 8', thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg' }
    ],
    3: [
      { title: 'Episode 1', thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg' },

      { title: 'Episode 2', thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg' }

    ]
  };

  ngOnInit() {
    this.episodes = this.allEpisodes[this.slideId] || [];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.slider) {
        this.checkScrollButtons();
        this.slider.nativeElement.addEventListener('scroll', () => this.checkScrollButtons());
      }
    });
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