import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSliderComponent } from './episode-slider.component';

describe('EpisodeSliderComponent', () => {
  let component: EpisodeSliderComponent;
  let fixture: ComponentFixture<EpisodeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
