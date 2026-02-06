import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Import this
import { IonicModule } from '@ionic/angular';   // <--- Import this if using ion- components

import { environment } from 'src/environments/environment';

// Define interfaces for type safety (Great for Portfolios!)
interface GeoResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
}


@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class WeatherSearchComponent  implements OnInit {

  // Utilizing the values from environment.ts file
  private apiKey = environment.apiKey;
  private baseUrl = environment.weatherBaseUrl;

  errorMessage: string = '';

  // Create a "broadcast" channel
  @Output() citySearchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  // Function called when user hits Search
  async searchCity() {
    // 1. Get the input search term value
    const inputElement = document.getElementById('cityInput') as HTMLInputElement;
    const city = inputElement.value.trim();

    if (!city) return; // Stop if empty

    // Just emit the name! Let the parent handle the heavy lifting.
    this.citySearchEvent.emit(city);

    // Optional: Clear input after search
    inputElement.value = '';

    // try {
    //   this.errorMessage = ''; // Clear previous errors

    //   // ----------- STEP 1: Calling Geocoding API against entered search text (City -> Lat/Lon) ---
    //   const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;

    //   const geoResponse = await fetch(geoUrl);
    //   const geoData: GeoResponse[] = await geoResponse.json();

    //   console.log('Obtained geoResponse value :::', geoData);
    //   // Check if city exists
    //   if (!geoData || geoData.length === 0) {
    //     this.errorMessage = `Could not find weather for "${city}". Try another city.`;
    //     return;
    //   }

    //   // Get the lat-long values of obtained geoData - city, place name

    //   const { lat, lon, name, country } = geoData[0];

    //   // --- STEP 2: Fetch Weather (Lat/Lon -> Weather) ---
    //   // Note: Using the 'onecall' or standard 'weather' endpoint
    //   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;

    //   const weatherResponse = await fetch(weatherUrl);
    //   const weatherData = await weatherResponse.json();

    //   // --- STEP 3: Update UI ---
    //   console.log('Weather value found for search input field text:', weatherData);
    //   this.updateDisplay(weatherData, name, country);

    // } catch (error) {
    //   console.error('Search failed', error);
    //   this.errorMessage = 'Network error. Please check your internet connection.';
    // }
  }


  onSearchTriggered(cityName: string) {
    console.log('Inside onSearch Triggered function :::', cityName);

    if (cityName) {
      // Emit the city name up to the Home Page
      this.citySearchEvent.emit(cityName);
    }
  }

  updateDisplay(data: any, cityName: string, country: string) {
    // Logic to update your main variables (temperature, icon, etc.)
    // Example:
    // this.temperature = Math.round(data.main.temp);
    // this.cityName = `${cityName}, ${country}`;
  }

}
