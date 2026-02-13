import { Injectable, Inject, signal  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

export type WeatherType = 'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  // Utilizing the values from environment.ts file
  private apiKey = environment.apiKey;
  private baseUrl = environment.weatherBaseUrl;

  // Use Angular Signals for reactive state
  isDarkMode = signal<boolean>(false);
  currentWeather = signal<WeatherType>('clear');

   // Use @Inject(DOCUMENT) instead of Renderer2
  constructor(private http: HttpClient,@Inject(DOCUMENT) private document: Document) {

  }

  /**
  * Fetch current weather for a city
  * @param city - City name (e.g., "London", "New York")
  */
  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`);
  }

  /**
   * Fetch weather by coordinates
  */
  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
  }

  /**
   * Fetch 5-day forecast for the selected city name
   * @param city - City name
  */
  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`);
  }

  /**
   * Fetch 5-day forecast for the shared co-ordinates
   * @param city - City name
  */
  getForecastByCoords(lat: number, lon: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
  }

  /**
   * Function to get the weather-icon based on response sent by open weather map api
  */

  getIcon(condition: string): string {

    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'assets/imgs/sun.svg';
      case 'cloudy':
      case 'clouds':
      case 'overcast':
        return 'assets/imgs/cloud.svg';
      case 'rain':
      case 'drizzle':
        return 'assets/imgs/rain.svg';
      case 'snow':
        return 'assets/imgs/snow.svg';
      case 'storm':
      case 'thunder':
        return 'assets/imgs/storm.svg';
      default:
        return 'assets/imgs/sun.svg';
    }

  }

  updateWeatherTheme(condition: string) {
    console.log('Inside update weather theme condition value passed :::', condition);

    const weather = this.mapConditionToType(condition);

    console.log('Weather value received from function to set at home page ::',weather);

    this.currentWeather.set(weather);

    this.applyThemeClasses();
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
    this.applyThemeClasses();
  }

    private applyThemeClasses() {
    const body = document.body;
    // Use a regex or a list to remove ANY existing weather- class
    // to prevent "weather-clear" and "weather-snow" from being active at once
    const classesToRemove = Array.from(body.classList).filter(c => c.startsWith('weather-'));
    body.classList.remove(...classesToRemove);

    // Add current states
    body.classList.toggle('ion-palette-dark', this.isDarkMode());
    body.classList.add(`weather-${this.currentWeather()}`);
  }

  private mapConditionToType(cond: string): WeatherType {
    // Map API strings (e.g., "Broken Clouds") to your internal types
    const c = cond.toLowerCase();
    if (c.includes('thunderstorm')) return 'thunderstorm';
    if (c.includes('snow')) return 'snow';
    if (c.includes('cloud')) return 'clouds';
    if (c.includes('rain')) return 'rain';
    // Add atmospheric conditions here
    if (c.includes('mist') || c.includes('fog') || c.includes('haze')) return 'clouds';
    return 'clear';
  }
}
