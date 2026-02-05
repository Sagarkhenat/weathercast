import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment'; // Import the file

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  // Utilizing the values from environment.ts file
  private apiKey = environment.apiKey;
  private baseUrl = environment.weatherBaseUrl;

  constructor(private http: HttpClient) {

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



}
