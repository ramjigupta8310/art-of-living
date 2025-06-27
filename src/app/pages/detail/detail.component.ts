import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Angular ki built-in service hai, jo route info deti hai
import { EpisodeSliderComponent } from '../../components/episode-slider/episode-slider.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, EpisodeSliderComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data: any; // isme selected slide ka full object store hoga
  CurrentId!: number; // isme route se aaya hua id number store hoga

  images = [
    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_682ac7934fed0_854x480.jpg',
      heading: 'Three Types of Maya',
      description: "Step into the past with 'From the Archives' playlist, featuring timeless talks by Gurudev, some dating back more than 15-20 years.",
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: [],
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6836ba9f25bf3_854x480.jpg',
      heading: 'Yoga Vasistha Sessions By Nakul Dhawan ',
      description: 'The Yoga Vasistha is a significant philosophical text in Hinduism, traditionally attributed to the sage Valmiki. It presents a dialogue between sage Vasistha and Prince Rama, explo',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: ['2015', 'Wisdom']
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67e7a4694a8e5_854x480.jpg',
      heading: 'Yoga Vasishtha Season 2 By Nakul Dhawan',
      description: "Step into the world of Yoga Vasishtha, where ancient wisdom meets modern-day seekers. Through its illuminating teachings, you'll uncover the secrets of existence and consciousness",
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: ['2015', 'Wisdom']
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6841328d3470c_854x480.jpg',
      heading: 'Who Is More Efficient, Us Or Nature?',
      description: 'Wisdom Talk by Gurudev',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_683ef6980fa4c_854x480.jpg',
      heading: 'Dealing With Anger',
      description: 'Ancestors, Children, Dealing With Anger ',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_683ef07d55ca3_854x480.jpg',
      heading: 'A Conversation With The Master',
      description: 'In this concise yet powerful video, Gurudev Sri Sri Ravi Shankar distills timeless truths into simple, practical steps you can wea',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: [2002]
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67dd5fc11f596_854x480.jpg',
      heading: 'आदि शंकराचार्य  (Aadi Shankaracharya) ',
      description: 'In a divided India, reeling under the threat of invasions, a child is born, a prodigy of ethereal brilliance but destined for a short life. This is the untold story of Adi Shankara ',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: [2024, 'Hindi']
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6841715e67fb0_854x480.jpg',
      heading: 'The Real Meaning of Gayatri Mantra!',
      description: 'Wisdom talk by Gurudev ',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6840184917eaa_854x480.jpg',
      heading: 'Mind A Cloud of Energy ',
      description: 'Meditation of the Week | Experience Mind Magic with this Guided Meditation by Gurudev',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_6830305b1be2b_854x480.jpg',
      heading: 'Daily Sanyam Level- 2 Sadhana',
      description: 'The practice includes Sanyam Sadhana along with Sudarshan Kriya and Mudra Pranayama. Note: For those who have completed the Sanya',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: []
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67d959114e5be_854x480.jpg',
      heading: 'Just Wonder!',
      description: 'Gurudev Live in San Jose, California - 2023 Series Recap',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' },
        { iconPath: 'assets/playlist.svg', label: 'Add to My list' }
      ],
      points: [2023]
    },

    {
      imgUrl: 'https://aolvideos.multitvsolution.com/multitv/source/jpg/717_67fcf54236e9d_854x480.jpg',
      heading: 'Live Daily Sadhana 7 AM | 11 AM | 7 PM',
      description: 'Yoga, Padmasadhana, Home Sudarshan Kriya Practise ',
      buttons: [
        { iconPath: 'assets/play.svg', label: 'Play' }
      ],
      points: []
    },
  ];

  // 1. ActivatedRoute Angular ki built-in service hai jo current route ki information deti hai
  // 2. ActivatedRoute ek built-in service hai jise hum dependency injection mechanism ke through constructor me inject karte hain
  // 3. constructor ek special function hota hai jisme Angular ki services ko dependency injection mechanism ke through inject kiya jata hai
  // 4. private route: ActivatedRoute → yahan 'route' ek variable hai jiska type ActivatedRoute hai
  // 5. hume ActivatedRoute ka reference 'route' variable se milta hai jisse hum route ke params access kar pate hain

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // 1. paramMap → ActivatedRoute ka ek RxJS observable property hai jo route params ko observe karta hai
    // 2. .subscribe() → RxJS ka method hai jo observable (paramMap) se data listen karta hai aur jaise hi ise data milta hai to iske andar ka code run karta hai
    // 3. params.get('id') → 'id' route param ko get karta hai
    // 4. Number(...) → string id ko number me convert karta hai
    // 5. this.CurrentId = id → id ko local variable me store kar rahe hain
    // 6. this.data = this.images[id - 1] → id ke basis par data array se object le rahe hain
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.CurrentId = id;
      this.data = this.images[id - 1];
    });
  }
}