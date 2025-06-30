import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';


// An interface is a powerful feature provided by TypeScript that allows to define the structure or shape of an object
interface Episode {
  title: string;
  thumbnail: string;
  videoUrl: string;
}

interface AllEpisodes {
  // Jab key ka exact naam fix nahi hota (dynamic hoti hai) aur sirf uska type pata hota hai (yaha number),
  // tab use [] ke andar likha jata hai. Value yaha Episode[] (array of objects) hoti hai.
  [key: number]: Episode[];
}

@Component({
  selector: 'app-episode-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-slider.component.html',
  styleUrl: './episode-slider.component.css',
})

export class EpisodeSliderComponent implements OnInit, AfterViewInit, OnDestroy {

  allEpisodes: AllEpisodes = {
    1: [
      {
        title: 'Episode 1',
        thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Episode 2',
        thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4'
      }, 
      {
        title: 'Episode 3',
        thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Episode 4',
        thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4'
      },
      {
        title: 'Episode 5',
        thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Episode 6',
        thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4'
      }, 
      {
        title: 'Episode 7',
        thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Episode 8',
        thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4'
      }
    ],
    2: [
      {
        title: 'Episode 1',
        thumbnail: 'https://cdn.pixabay.com/photo/2024/12/19/17/48/mountain-9278324_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Episode 2',
        thumbnail: 'https://cdn.pixabay.com/photo/2025/03/03/17/47/cliffs-9444605_640.jpg',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4'
      }
    ]
  };

  // @Input() is a decorator used to define a component property that can receive data from its parent component
  @Input() slideId!: number;
  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef;

  player!: Player;
  episodes: Episode [] = [];
  canScrollLeft = false;
  canScrollRight = true;
  selectedVideoUrl: string | null = null;

  ngOnInit() {
    this.episodes = this.allEpisodes[this.slideId];

    // wait for DOM to render episode cards
    setTimeout(() => this.checkScrollButtons(), 0);
  }

  ngAfterViewInit() {
    if (this.slider) {
      this.slider.nativeElement.addEventListener('scroll', () => this.checkScrollButtons());
    }
  }

  scrollLeft() {
    this.slider.nativeElement.scrollLeft -= 300;
  }

  scrollRight() {
    this.slider.nativeElement.scrollLeft += 300;
  }

  checkScrollButtons() {
    const el = this.slider.nativeElement;

    const scrollLeft = el.scrollLeft;
    const visibleWidth = el.offsetWidth;
    const totalScrollWidth = el.scrollWidth;

    this.canScrollLeft = scrollLeft > 0;
    this.canScrollRight = scrollLeft + visibleWidth < totalScrollWidth - 1;
  }


  playVideo(url: string) {
    this.selectedVideoUrl = url;

    setTimeout(() => {
      if (this.videoPlayerRef) {
        this.player = videojs(this.videoPlayerRef.nativeElement);
        this.player.src({ type: 'video/mp4', src: url });
        this.player.play();

        this.addSkipButtons();
      }
    });
  }

  addSkipButtons() {
    const Button = videojs.getComponent('Button');
    const appRef = this;

    const SkipBack = class extends Button {
      constructor(player: any, options: any) {
        super(player, options);
        this.addClass('vjs-skip-backward-button');
        (this as any).controlText?.('Back 5s');
        (this.contentEl() as HTMLElement).innerHTML = `
          <div class="custom-skip-button">
            <img src="assets/skip-previous.svg" class="skip-icon" />
            <span class="skip-text">5s</span>
          </div>
        `;
      }
      handleClick() {
        const newTime = Math.max(0, appRef.player.currentTime()! - 5);
        appRef.player.currentTime(newTime);
      }
    };

    const SkipForward = class extends Button {
      constructor(player: any, options: any) {
        super(player, options);
        this.addClass('vjs-skip-forward-button');
        (this as any).controlText?.('Forward 5s');
        (this.contentEl() as HTMLElement).innerHTML = `
          <div class="custom-skip-button">
            <span class="skip-text">5s</span>
            <img src="assets/skip-next.svg" class="skip-icon" />
          </div>
        `;
      }
      handleClick() {
        const duration = appRef.player.duration();
        const newTime = Math.min(duration!, appRef.player.currentTime()! + 5);
        appRef.player.currentTime(newTime);
      }
    };

    videojs.registerComponent('SkipBack', SkipBack);
    videojs.registerComponent('SkipForward', SkipForward);
    this.player.addChild('SkipBack', {});
    this.player.addChild('SkipForward', {});

    const container = this.player.el() as HTMLElement;
    const skipButtons = container.querySelectorAll('.vjs-skip-backward-button, .vjs-skip-forward-button');

    const attachHoverListeners = () => {
      skipButtons.forEach((btn) => {
        const button = btn as HTMLElement;
        if (!(button as any)._hoverAttached) {
          let intervalId: any = null;

          button.addEventListener('mouseenter', () => {
            this.player.userActive(true);
            intervalId = setInterval(() => {
              if (button.matches(':hover')) {
                this.player.userActive(true);
              }
            }, 100);
          });

          button.addEventListener('mouseleave', () => {
            clearInterval(intervalId);
          });

          (button as any)._hoverAttached = true;
        }
      });
    };

    const updateVisibility = () => {
      const isPaused = this.player.paused();
      const isActive = this.player.userActive();
      const isHovered = Array.from(skipButtons).some(btn => (btn as HTMLElement).matches(':hover'));

      skipButtons.forEach((btn) => {
        const el = btn as HTMLElement;
        if (isPaused || isActive || isHovered) {
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
        } else {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }
      });
    };

    attachHoverListeners();
    this.player.on('useractive', updateVisibility);
    this.player.on('userinactive', updateVisibility);
  }

  ngOnDestroy() {
    this.player?.dispose();
  }
}
