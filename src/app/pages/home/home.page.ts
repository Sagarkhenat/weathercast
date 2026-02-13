import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA,inject } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Geolocation } from '@capacitor/geolocation';
import { IonChip, IonIcon, IonLabel, IonContent,RefresherCustomEvent, IonButton, IonSkeletonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {moon, sunny, heart, heartOutline, closeCircle } from 'ionicons/icons';

/*------------------ Components ----------------------*/
import { WeatherSearchComponent } from '../component/weather-search/weather-search.component';
import { WeatherDetailComponent } from '../component/weather-detail/weather-detail.component';
import { ErrorStateComponent } from '../component/error-state/error-state.component';
/*------------------ Providers ----------------------*/
import { WeatherService,CommonService,UnitStateService,FavoritesService,OfflineService } from 'src/providers/providers';

/*------------------Interfaces----------------------*/
import { CurrentWeatherResponse, WeatherItem, ForecastResponse } from '../../../interface/common-dto';


import { WeatherIconPipe } from 'src/pipes/weather-icon-pipe/weather-icon.pipe';
import { TempConvertPipe } from 'src/pipes/temp-convert-pipe/temp-convert.pipe';

// For initial load and manual refresh load
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

// --------------------------- DEFINING THE TOGGLE COMPONENT FOR TEMPERATURE HERE ---------------------------
@Component({
  selector: 'app-unit-toggle',
  standalone: true,
  template: `
    <button (click)="unitService.toggleUnit()" class="pill-toggle">

      <span [class.active-unit]="unitService.unit() === 'C'" class="unit-label">
        °C
      </span>
      <span class="divider"></span>
      <span [class.active-unit]="unitService.unit() === 'F'" class="unit-label">
        °F
      </span>

    </button>
  `,
  styles: [`
    /* The Pill Container */
    .pill-toggle {
      background: rgba(255, 255, 255, 0.15); /* Glassy background */
      border: 1px solid rgba(255, 255, 255, 0.25); /* Subtle border */
      border-radius: 50px;       /* Full rounding for pill shape */
      padding: 6px 14px;         /* Padding defines the pill size */
      display: flex;
      align-items: center;
      gap: 8px;                  /* Space between C, Divider, and F */
      cursor: pointer;
      transition: background 0.2s ease;
    }

    /* Optional: Hover effect */
    .pill-toggle:active {
      background: rgba(255, 255, 255, 0.25);
    }

    /* The Text Labels (Inactive State) */
    .unit-label {
      font-size: 0.95rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.5); /* Dimmed by default */
      transition: color 0.2s;
    }

    /* The Active Unit (Bright & Bold) */
    .active-unit {
      color: #ffffff;
      font-weight: 700;
    }

    /* The Vertical Divider Line */
    .divider {
      width: 1px;
      height: 14px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  `]
})


export class UnitToggleComponent {
  // Give it access to the service
  public unitService = inject(UnitStateService);
}



// --------------------------- 2.  MAIN HOME PAGE COMPONENT ---------------------------
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:true, //indicates a standalone component
  imports: [
    CommonModule,
    IonContent,
    WeatherSearchComponent,
    WeatherIconPipe,
    TempConvertPipe,
    UnitToggleComponent,
    IonChip,
    IonIcon,
    IonLabel,
    IonButton,
    IonSkeletonText,
    ErrorStateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  // Inject the service PUBLICLY
  public favoritesService = inject(FavoritesService);
  // Inject the service and make it PUBLIC so the HTML can see it
  public unitService = inject(UnitStateService);

  weatherData: CurrentWeatherResponse | null = null;
  isLoading = true; // Start true to show spinner immediately
  errorMsg = '';
  showLoader : HTMLIonLoadingElement | undefined;

  forecastData: WeatherItem[] = []; // Initialize as an array to store 5 day data of selected city

  constructor(public weatherService: WeatherService,
    public commonService: CommonService,
    private modalCtrl: ModalController,
    public unitStateService :  UnitStateService,
    public offlineService: OfflineService) {

    // Register the icons so <ion-icon> can use them
    addIcons({ moon, sunny, heart, 'heart-outline': heartOutline, 'close-circle': closeCircle });

  }

  async ngOnInit() {

    // App will always try to prioritize the GPS first (based on co-ordinates)
    // Using fallback logic for if the GPS fails, get last searched city details on home page
    try {

      await this.getCurrentLocation();
    } catch (error) {

      console.log('In catch block for ngOn Init :::', error);
      //Check for a saved city in localStorage
      const savedCity = localStorage.getItem('lastCity');

      console.log('Found saved city value in local storage as :', savedCity);
      this.loadWeather(savedCity || 'Pune');
    }

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
          this.loadFallbackCity();
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
      // Use the fallback helper here too
      this.loadFallbackCity();
      this.commonService.hideLoading();
    }
  }


  /**
   * Function used to call weather service after getting the co-ordinates
  */
  loadWeatherByCoords(lat: number, lon: number, event?: any) {

    console.log('Inside load weather by coords function  lat-long values :::', lat,lon);
    this.isLoading = true;
    this.errorMsg = '';

    // Use forkJoin to run both API calls in parallel

    if (!this.offlineService.isOnline()) {
      this.errorMsg = 'No internet connection. Please check your network.';
      this.isLoading = false;
      if (event) event.target.complete();
      return;
    }

    forkJoin({
      current: this.weatherService.getWeatherByCoords(lat, lon),
      forecast: this.weatherService.getForecastByCoords(lat, lon)
    })
    .pipe(
      // finalize runs whether the call succeeds or fails
      finalize(() => {
        this.isLoading = false;
        if (event) event.target.complete(); // Stop the refresher spinner
      })
    ).subscribe({

      next: (res:{ current: any, forecast: any }) => {

        // Handle Current Weather
        this.weatherData = res.current;

        // Extract condition ID and icon string (e.g., "01n")
        const conditionId = res.current.weather[0].id;
        const icon = res.current.weather[0].icon;

        console.log('conditionId and icon value received :::', conditionId,icon);

        //Theming action change - based on condition and icon received from response
        this.weatherService.updateWeatherTheme(res.current.weather[0].main);

        this.isLoading = false;

        // Handle Forecast
        if (res.forecast && res.forecast.list) {
          // Filter the list to get one entry per day (usually at 12:00:00)
          this.forecastData = res.forecast.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
          console.log('Obtained forecast Data for next 5 days in load weather by co-ords :::', this.forecastData,this.forecastData.length);
          this.commonService.hideLoading();
        }else{
          console.log('Forecast data list is missing in the response', res);
          this.forecastData = [];
        }

      },error:(err) =>{

        this.errorMsg = 'Error fetching weather data.';
        this.isLoading = false;
        this.forecastData = [];

        this.commonService.handleError('Error fetching weather data', err.message, false);
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

    console.log('Searching for city in load weather function :::', city);

    //1. Get current weather
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        console.log('Obtained weather data in load Weather function :::', data);

        this.weatherData = data;

        //Theming action change 2 - based on condition and icon received from response
        this.weatherService.updateWeatherTheme((data.weather[0].main));

        this.isLoading = false;

        // Success! The city exists. Save it for next time.
        localStorage.setItem('lastCity', city);

        //After getting current city weather-- call the loadForecast API (Chained call)
        this.loadForecast(city);

      },
      error: (err) => {
        console.error('Error block condition in load Weather function:', err);
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

      // Adds a little grey "drag bar" at the top so users know it slides
      handle: true,
      cssClass: 'custom-modal-style'
    });

    await modal.present();
  }


  /**
   * Add this helper method to your class (or just put the logic inside catch)
  */
  loadFallbackCity() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      console.log('GPS failed. Falling back to saved city from local storage:', lastCity);
      this.loadWeather(lastCity);
    } else {
      console.log('GPS failed and there is no saved city in storage. Loading default city value.');
      this.loadWeather('London');
    }
  }

  /**
   * Function to refresh page on pull down and update the location
  */
  async doManualRefresh(event: any) {
    console.log('User requested manual refresh to fetch weather against users current location :::', event);

    try {
      // We get users current coordinates first
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Co-ordinates value obtained after manual refresh action :::', coordinates);

      const { latitude, longitude } = coordinates.coords;

      // Pass coordinates AND the refresher event
      this.loadWeatherByCoords(latitude, longitude, event);

    } catch (error) {
      console.error('Error getting location after manual refresh action :::', error);
      this.commonService.handleError('Location Error', 'Please enable GPS to refresh weather.', false);
      event.target.complete();
    }
  }




}
