import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WeatherService } from './weather.service';

describe('Weather', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
    providers: [provideRouter([])];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
