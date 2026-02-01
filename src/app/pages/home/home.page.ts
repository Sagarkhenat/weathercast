import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherService } from '../../../providers/weather-service/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Required for *ngIf

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:true, //indicates a standalone component
  imports: [CommonModule,IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  weatherData: any;
  isLoading = true; // Start true to show spinner immediately
  errorMsg = '';

  forecastData: any[] = []; // Initialize as an empty array to store 5 day data of selected city

  constructor(public weatherService: WeatherService) {
    console.log('Home page constructor loaded:::');
  }

  async ngOnInit() {
    await this.getCurrentLocation();
  }

  /**
   * Fetch the co-ordinates to show the current weather location
  */
  async getCurrentLocation() {
    try {

      // 1. Check user has granted location permissions first (Optional but recommended)
      const permission = await Geolocation.checkPermissions();
      console.log('permission variable value :::', permission);

      // 2. Request permission if not granted
      if (permission.location !== 'granted') {
        const request = await Geolocation.requestPermissions();
        console.log('request variable value :::', request);
        if (request.location !== 'granted') {

          console.log('Request location is not granted condition :::');
          // Fallback if user denies: Load default city
          this.loadWeather('Pune');
          return;
        }
      }

      // 3. Get the actual position
      const obtainedCoordinates = await Geolocation.getCurrentPosition();

      console.log('Obtained co-ordinates value :::', obtainedCoordinates);

      // 4. Call API with coords
      this.loadWeatherByCoords(obtainedCoordinates.coords.latitude,obtainedCoordinates.coords.longitude);

    }catch(error){

    console.error('Error getting location', error);
    // Fallback: If GPS fails (e.g. disabled), load default
    this.loadWeather('Pune');

    }
  }

  /**
   * Function used to call weather service after getting the co-ordinates
  */
  loadWeatherByCoords(lat: number, lon: number) {
    this.isLoading = true;
    this.errorMsg = '';

    this.weatherService.getWeatherByCoords(lat, lon).subscribe({
      next: (data) => {

        console.log('data obtained in loadWeatherByCoords function :::', data);

        this.weatherData = data;
        this.isLoading = false;

        // Check if res and res.list exist to avoid the "undefined" error
        if (data && data.list) {
          // Filter the list to get one entry per day (usually at 12:00:00)
          this.forecastData = data.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
        }else{
          console.error('Forecast data list is missing in the response', data);
          this.forecastData = [];
        }

      },
      error: (err) => {
        this.errorMsg = 'Error fetching local weather.';
        this.isLoading = false;
        this.forecastData = [];
      }
    });
  }

  /**
   * Fallback case for loading the weather
  */
    loadWeather(city: string) {
    this.isLoading = true;
    this.errorMsg = ''; // Reset errors
    this.weatherData = null; // Clear old data while loading

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        console.log('Obtained weather data in loadWeather function :::', data);
        this.weatherData = data;
        this.isLoading = false;

        // Check if res and res.list exist to avoid the "undefined" error
        if (data && data.list) {
          // Filter the list to get one entry per day (usually at 12:00:00)
          this.forecastData = data.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
        }else{
          console.error('Forecast data list is missing in the response', data);
          this.forecastData = [];
        }

      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
        this.forecastData = [];
        // Handle standard 404 (City not found)
        if (err.status === 404) {
          this.errorMsg = 'City not found. Please try again.';
        } else {
          this.errorMsg = 'Unable to connect to weather service.';
        }
      }
    });
  }


}
