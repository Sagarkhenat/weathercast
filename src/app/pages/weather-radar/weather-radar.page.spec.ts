import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherRadarPage } from './weather-radar.page';

describe('WeatherRadarPage', () => {
  let component: WeatherRadarPage;
  let fixture: ComponentFixture<WeatherRadarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherRadarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
