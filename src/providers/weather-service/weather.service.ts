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
   * Fetch 5-day forecast for the selected city name
   * @param city - City name
   */
  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`);
  }

  /**
   * Fetch weather by coordinates
  */
  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
  }


}
