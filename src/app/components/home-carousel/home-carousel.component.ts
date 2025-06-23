import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.css'
})
export class HomeCarouselComponent {
  isDetailPage = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDetailPage = this.router.url.startsWith('/detail');
      }
    });
  }

  images = [
    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_682ac7934fed0_854x480.jpg',
      heading: 'Three Types of Maya',
      description: "Step into the past with 'From the Archives' playlist, featuring timeless talks by Gurudev, some dating back more than 15-20 years. ...",
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6836ba9f25bf3_854x480.jpg',
      heading: 'Yoga Vasistha Sessions By Nakul Dhawan ',
      description: 'The Yoga Vasistha is a significant philosophical text in Hinduism, traditionally attributed to the sage Valmiki. It presents a dialogue between sage Vasistha and Prince Rama, explo ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: ['2015', 'Wisdom']
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67e7a4694a8e5_854x480.jpg',
      heading: 'Yoga Vasishtha Season 2 By Nakul Dhawan',
      description: "Step into the world of Yoga Vasishtha, where ancient wisdom meets modern-day seekers. Through its illuminating teachings, you'll uncover the secrets of existence and consciousness, ...",
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: ['2015', 'Wisdom']
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6841328d3470c_854x480.jpg',
      heading: 'Who Is More Efficient, Us Or Nature?',
      description: 'Wisdom Talk by Gurudev ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_683ef6980fa4c_854x480.jpg',
      heading: 'Dealing With Anger',
      description: 'Ancestors, Children, Dealing With Anger  ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_683ef07d55ca3_854x480.jpg',
      heading: 'A Conversation With The Master',
      description: 'In this concise yet powerful video, Gurudev Sri Sri Ravi Shankar distills timeless truths into simple, practical steps you can wea ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: [2002]
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67dd5fc11f596_854x480.jpg',
      heading: 'आदि शंकराचार्य  (Aadi Shankaracharya) ',
      description: 'In a divided India, reeling under the threat of invasions, a child is born, a prodigy of ethereal brilliance but destined for a short life. This is the untold story of Adi Shankara ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: [2024, 'Hindi']
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6841715e67fb0_854x480.jpg',
      heading: 'The Real Meaning of Gayatri Mantra!',
      description: 'Wisdom talk by Gurudev ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6840184917eaa_854x480.jpg',
      heading: 'Mind A Cloud of Energy ',
      description: 'Meditation of the Week | Experience Mind Magic with this Guided Meditation by Gurudev ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6830305b1be2b_854x480.jpg',
      heading: 'Daily Sanyam Level- 2 Sadhana',
      description: 'The practice includes Sanyam Sadhana along with Sudarshan Kriya and Mudra Pranayama. Note: For those who have completed the Sanya ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67d959114e5be_854x480.jpg',
      heading: 'Just Wonder!',
      description: 'Gurudev Live in San Jose, California - 2023 Series Recap ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/info.svg', label: 'More Info' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: [2023]
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67fcf54236e9d_854x480.jpg',
      heading: 'Live Daily Sadhana 7 AM | 11 AM | 7 PM',
      description: 'Yoga, Padmasadhana, Home Sudarshan Kriya Practise ...',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' }
      ],
      points: []
    },
  ];

  goToDetail(index: number) {
    this.router.navigate(['/detail', index]);
  }

  touchStartX = 0;
  touchEndX = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd() {
    const distance = this.touchStartX - this.touchEndX;
    const threshold = 50; // Minimum swipe distance

    if (distance > threshold) {
      this.next(); // swipe left → next slide
    } else if (distance < -threshold) {
      this.prev(); // swipe right → previous slide
    }

    // Reset
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  currentIndex = 0;
  fakeIndex = 1;
  isAnimating = false;
  transitionStyle = 'transform 0.45s ease';

  get visibleImages(): any[] {
    const last = this.images[this.images.length - 1];
    const first = this.images[0];
    return [last, ...this.images, first];
  }

  get transformStyle(): string {
    return `translateX(-${this.fakeIndex * 100}%)`;
  }

  goTo(index: number) {
    if (this.isAnimating || index === this.currentIndex) return;
    this.isAnimating = true;
    this.fakeIndex = index + 1;
    this.currentIndex = index;
    setTimeout(() => (this.isAnimating = false), 500);
  }

  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const total = this.images.length;

    if (this.currentIndex === total - 1) {
      this.fakeIndex = total + 1;
      setTimeout(() => {
        this.transitionStyle = 'none';
        this.fakeIndex = 1;
        this.currentIndex = 0;
        setTimeout(() => {
          this.transitionStyle = 'transform 0.45s ease';
          this.isAnimating = false;
        }, 50);
      }, 500);
    } else {
      this.currentIndex++;
      this.fakeIndex = this.currentIndex + 1;
      setTimeout(() => (this.isAnimating = false), 500);
    }
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const total = this.images.length;

    if (this.currentIndex === 0) {
      this.fakeIndex = 0;
      setTimeout(() => {
        this.transitionStyle = 'none';
        this.fakeIndex = total;
        this.currentIndex = total - 1;
        setTimeout(() => {
          this.transitionStyle = 'transform 0.45s ease';
          this.isAnimating = false;
        }, 50);
      }, 500);
    } else {
      this.currentIndex--;
      this.fakeIndex = this.currentIndex + 1;
      setTimeout(() => (this.isAnimating = false), 500);
    }
  }

}
