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


/* 
1:- what is class ?
Class ek blueprint hai jo data (properties) aur functions (methods) ko define karta hai. Yeh ek object-oriented programming concept hai, jisme ek class se runtime pe instances (objects) banaye jaate hain jo uske properties (jaise 'allEpisodes') aur methods (jaise 'scrollLeft') use karte hain.
Example: Ye 'EpisodeSliderComponent' class properties (jaise 'allEpisodes') aur methods (jaise 'scrollLeft') define karti hai.
*/

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

  // @Input() is a decorator used to define a component property that will receive data from its parent component
  @Input() slideId!: number;

  episodes: Episode[] = [];
  canScrollLeft = false;
  canScrollRight = true;

  /*
  1:- `@ViewChild('slider')`: Ek Angular decorator hai jo template mein `#slider` wale DOM element (jaise `<div #slider>`) ko dhoondhta hai.

  2:- `slider!`: Ek Variable hai jo ElementRef class ke object ko store karta hai; `:ElementRef` type batata hai ki yeh variable ElementRef class ka object rakhega; `!` TypeScript ko batata hai ki yeh null nahi hoga.

  3:- `ElementRef`: Angular class jo DOM element ko apne andar rakhta hai; runtime pe is class ka object banta hai jisme raw DOM element hota hai, aur `nativeElement` property se yeh raw DOM element (jaise `<div>`) milta hai.

  4:- Flow: Angular `#slider` element dhoondhta hai, usko ElementRef class ke object mein rakhta hai, aur `slider` variable mein store karta hai (ngAfterViewInit ke baad). `nativeElement` se raw DOM methods (jaise `scrollLeft`) use hote hain.
 */
  @ViewChild('slider') slider!: ElementRef;

  ngOnInit() {
    this.episodes = this.allEpisodes[this.slideId];

    // wait for DOM to render episode cards
    setTimeout(() => this.checkScrollButtons(), 0);
  }

  ngAfterViewInit() {
    // This adds scroll event listener to the "slider" element and calls checkScrollButtons to update scroll button visibility
    if (this.slider) {
      this.slider.nativeElement.addEventListener('scroll', () => this.checkScrollButtons());
    }
  }

  /*
  jaise hi episodes slider scroll kiya jata hai (gesture, touchpad, mouse, screen swipe, buttons) se yeh function checkScrollButtons() call hota hai and dynamically scroll buttons ki visibility check karta hai and show or hide karta hai
  */
  checkScrollButtons() {
    const el = this.slider.nativeElement;

    const scrollLeft = el.scrollLeft;
    const visibleWidth = el.offsetWidth;
    const totalScrollWidth = el.scrollWidth;

    this.canScrollLeft = scrollLeft > 0;
    this.canScrollRight = scrollLeft + visibleWidth < totalScrollWidth;
  }

  // Scroll left button click handler
  scrollLeft() {
    this.slider.nativeElement.scrollLeft -= 300;
  }

  // Scroll right button click handlers
  scrollRight() {
    this.slider.nativeElement.scrollLeft += 300;
  }


  // Play video(episode) functionality starts from here

  @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef;
  player!: Player;
  selectedVideoUrl: string | null = null;

  playVideo(url: string) {
    this.selectedVideoUrl = url;

    setTimeout(() => {
      if (this.videoPlayerRef) {
        this.player = videojs(this.videoPlayerRef.nativeElement);
        this.player.src({ type: 'video/mp4', src: url });
        this.player.play();

        this.addSkipBackwardButton();
        this.addSkipForwardButton();
        this.addcloseButton();
      }
    });
  }

  addSkipBackwardButton() {
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

    videojs.registerComponent('SkipBack', SkipBack);
    this.player.addChild('SkipBack', {});

    const button = this.player.el()?.querySelector('.vjs-skip-backward-button') as HTMLElement;
    if (button && !(button as any)._hoverAttached) {
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

    const updateVisibility = () => {
      const isPaused = this.player.paused();
      const isActive = this.player.userActive();
      const isHovered = button?.matches(':hover');

      if (isPaused || isActive || isHovered) {
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
      } else {
        button.style.opacity = '0';
        button.style.pointerEvents = 'none';
      }
    };

    this.player.on('useractive', updateVisibility);
    this.player.on('userinactive', updateVisibility);
  }

  addSkipForwardButton() {
    const Button = videojs.getComponent('Button');
    const appRef = this;

    const SkipForwardGupta = class extends Button {
      constructor(player: any, options: any) {
        super(player, options);
        this.addClass('vjs-skip-ramji-button');
        (this as any).controlText?.('Forward 5s');
        (this.contentEl() as HTMLElement).innerHTML = `
        <div class="custom-skip-button">
          <span class="skip-text">5s</span>
          <img src="/assets/skip-next.svg" class="skip-icon" />
        </div>
      `;
      }
      handleClick() {
        const duration = appRef.player.duration();
        const newTime = Math.min(duration!, appRef.player.currentTime()! + 5);
        appRef.player.currentTime(newTime);
      }
    };

    videojs.registerComponent('SkipForwardRamji', SkipForwardGupta);
    this.player.addChild('SkipForwardRamji', {});

    const button = this.player.el()?.querySelector('.vjs-skip-ramji-button') as HTMLElement;
    if (button && !(button as any)._hoverAttached) {
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

    const updateVisibility = () => {
      const isPaused = this.player.paused();
      const isActive = this.player.userActive();
      const isHovered = button?.matches(':hover');

      if (isPaused || isActive || isHovered) {
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
      } else {
        button.style.opacity = '0';
        button.style.pointerEvents = 'none';
      }
    };

    this.player.on('useractive', updateVisibility);
    this.player.on('userinactive', updateVisibility);
  }

  addcloseButton() {
    const Button = videojs.getComponent('Button');
    const appRef = this;

    /*
    yha "Close" naam ki ek custom class ban rahi hai, jo Video.js ke "Button" class ko inherit kar rahi hai "extends Button" ka matlab hai ki Close class me Button ke sare methods aur properties available honge isse hum custom button bana sakte hain, lekin usme Button wali base functionality bhi rahegi
    */
    const Close = class extends Button {
      constructor(player: any, options: any) {
        super(player, options);
        this.addClass('vjs-video-close-button');
        (this as any).controlText?.('Close');
        (this.contentEl() as HTMLElement).innerHTML = `
          <img src="/assets/close.svg" class="close-icon" />
        `;
      }
      handleClick() {
        appRef.player.pause();
        appRef.selectedVideoUrl = null;
        appRef.player.dispose();
      }
    };

    videojs.registerComponent('Close', Close);
    this.player.addChild('Close', {});

    const closeBtn = this.player.el()?.querySelector('.vjs-video-close-button') as HTMLElement;

    // update visibility of close button
    const updateCloseVisibility = () => {
      const isPaused = this.player.paused();
      const isActive = this.player.userActive();

      closeBtn.style.opacity = (isPaused || isActive) ? '1' : '0';
      closeBtn.style.pointerEvents = (isPaused || isActive) ? 'auto' : 'none';
    };
    this.player.on('useractive', updateCloseVisibility);
    this.player.on('userinactive', updateCloseVisibility);
  }

  ngOnDestroy() {
    this.player?.dispose();
  }

}