import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IonHeader, IonToolbar, IonTitle, IonContent,RefresherCustomEvent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { ModalController } from '@ionic/angular/standalone';

import { Network } from '@capacitor/network';

/*------------------ Components ----------------------*/
import { WeatherSearchComponent } from '../component/weather-search/weather-search.component'; // <--- Check this path matches your folder structure
import { WeatherDetailComponent } from '../component/weather-detail/weather-detail.component';

/*------------------ Providers ----------------------*/
import { WeatherService,CommonService } from 'src/providers/providers';

/*------------------Interfaces----------------------*/
import { CurrentWeatherResponse, WeatherItem, ForecastResponse } from '../../../interface/common-dto';


import { WeatherIconPipe } from 'src/pipes/weather-icon-pipe/weather-icon.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:true, //indicates a standalone component
  imports: [CommonModule, IonContent, WeatherSearchComponent,WeatherIconPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  weatherData: CurrentWeatherResponse | null = null;
  isLoading = true; // Start true to show spinner immediately
  errorMsg = '';
  showLoader : HTMLIonLoadingElement | undefined;

  forecastData: WeatherItem[] = []; // Initialize as an array to store 5 day data of selected city

  constructor(public weatherService: WeatherService, public commonService: CommonService, private modalCtrl: ModalController) {


  }

  async ngOnInit() {

    await this.getCurrentLocation();

  }

  /**
   * Fetch the co-ordinates to show the current weather location
  */
  async getCurrentLocation() {

    this.commonService.showLoading();

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
          this.commonService.hideLoading();
          // Fallback if user denies: Load default city
          this.loadWeather('Pune');
          return;
        }else{

        }
      }

      // 3. Get the users actual position
      const obtainedCoordinates = await Geolocation.getCurrentPosition();

      console.log('Obtained co-ordinates value in get Current Location function :::', obtainedCoordinates);

      // 4. Call API with coords
      this.loadWeatherByCoords(obtainedCoordinates.coords.latitude,obtainedCoordinates.coords.longitude);

      this.commonService.hideLoading();

    }catch(error){

      console.log('In catch block for Error getting location', error);
      // Fallback: If location access fails (e.g. disabled), load default
      this.loadWeather('Pune');
      this.commonService.hideLoading();
    }
  }


  /**
   * Function used to call weather service after getting the co-ordinates
  */
  loadWeatherByCoords(lat: number, lon: number) {
    console.log('Inside load weather by coords function  lat-long values :::', lat,lon);
    this.isLoading = true;
    this.errorMsg = '';

    //1. Get current weather by co-ordinates
    this.weatherService.getWeatherByCoords(lat, lon).subscribe({
      next: (res) => {

        console.log('res obtained in load Weather By Coords function :::', res);

        this.weatherData = res;
        this.isLoading = false;

        //After getting current city weather-- call the getforecast API by passing co-ordinates (Chained call)

        this.weatherService.getForecastByCoords(lat, lon).subscribe({
          next: (data) => {
            console.log('Data received for obtaining forecast by co-ordinates :::', data);
            if (data && data.list) {
              // Filter the list to get one entry per day (usually at 12:00:00)
              this.forecastData = data.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
              console.log('Obtained forecast Data for next 5 days in load weather by co-ords :::', this.forecastData,this.forecastData.length);
              this.commonService.hideLoading();
            }else{
              console.log('Forecast data list is missing in the response', data);
              this.forecastData = [];
            }
          },
          error: (err) => {

          }
        });

      },
      error: (err) => {
        this.errorMsg = 'Error fetching your local weather.';
        this.isLoading = false;
        this.forecastData = [];
      }
    });
  }

  /**
   * Function called for loading the weather
  */
    loadWeather(city: string) {
    this.isLoading = true;
    this.errorMsg = ''; // Reset errors
    this.weatherData = null; // Clear old data while loading

    // 1. Basic Validation: Don't call API if string is empty
    if (!city || city.trim() === '') return;

    console.log('Searching for city:', city);

    //1. Get current weather
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        console.log('Obtained weather data in loadWeather function :::', data);
        this.weatherData = data;
        this.isLoading = false;

        //After getting current city weather-- call the loadForecast API (Chained call)
        this.loadForecast(city);

      },
      error: (err) => {
        console.error('Error block condition in loadWeather function:', err);
        this.isLoading = false;
        this.forecastData = [];
        // Handle standard 404 (City not found)
        if (err.status === 404) {
          this.errorMsg = `Could not find weather for "${city}". Please check for correct city name.`;
        }else if (err.status === 0) {
          // Network / Offline error
          this.errorMsg = 'No internet connection. Please check your network.';
        } else {
          // Generic server error
          this.errorMsg = 'Service unavailable. Please try again later.';
        }
      }
    });
  }


  /**
   * Function called for loading the forecast for selected city
  */

  loadForecast(city: string) {
  console.log('City string passed to load the forecast call :::', city);
    this.weatherService.getForecast(city).subscribe({
      next: (data: ForecastResponse) =>{
        // Check if res and res.list exist to avoid the "undefined" error
        if (data && data.list) {
          // Filter the list to get one entry per day (usually at 12:00:00)
          this.forecastData = data.list.filter((item: WeatherItem) => item.dt_txt?.includes('12:00:00'));
          console.log('Obtained forecastData for next 5 days in load Forecast function :::', this.forecastData, this.forecastData.length);
        }else{
          console.log('Forecast data list is missing in the response', data);
          this.forecastData = [];
        }
      },
      error: (err) => {
        console.error('Error block condition in load Forecast function:', err);
        this.isLoading = false;

        this.forecastData = [];
        // Handle standard 404 (City not found)
        if (err.status === 404) {
          this.errorMsg = 'City not found. Please try again.';
        } else {
          this.errorMsg = 'Unable to connect to forecast service.';
        }
      }
    });

  }




  /**
   * Function to pull modal and show selected day details
  */
  async openDetails(dayData: any) {
    console.log('Open details function called to show modal :::', dayData);
    let myThis = this;

    const modal = await myThis.modalCtrl.create({
      component: WeatherDetailComponent,
      componentProps: {
        data: dayData // Pass the clicked day's object
      },

      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75,

      // BONUS: Adds a little grey "drag bar" at the top so users know it slides
      handle: true,
      cssClass: 'custom-modal-style'
    });

    await modal.present();
  }


  /**
   * Function to refresh page on pull down and update the location
  */
  public doRefreshLocation = (event:RefresherCustomEvent) => {
    console.log('Begin refresh operation to update users current location', event);

    setTimeout(() => {
      console.log('refresher operation has ended');
      event.target.complete();
    }, 2000);

  }



}
