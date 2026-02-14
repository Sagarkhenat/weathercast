import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { IonContent,IonFab,IonIcon,IonFabButton,Platform,IonRouterLink} from "@ionic/angular/standalone";
import { Router, RouterLink } from '@angular/router';

import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { thermometer, rainy, leaf, cloudy, speedometer, layersOutline, locate, close,arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-weather-radar',
  templateUrl: './weather-radar.page.html',
  styleUrls: ['./weather-radar.page.scss'],
  standalone: true,
  imports:[CommonModule,IonContent,IonFab,IonIcon,IonFabButton,RouterLink,IonRouterLink]
})
export class WeatherRadarPage implements OnInit {

  map!: L.Map;
  weatherLayer!: L.TileLayer;
  showMenu = false;
  activeLayer = 'temp_new';

  // Utilizing the values from environment.ts file
  private apiKey = environment.apiKey;
  private baseUrl = environment.weatherBaseUrl;


  layers = [
    { id: 'temp_new', name: 'Temp', icon: 'thermometer' },
    { id: 'precipitation_new', name: 'Rain', icon: 'rainy' },
    { id: 'wind_new', name: 'Wind', icon: 'leaf' },
    { id: 'clouds_new', name: 'Clouds', icon: 'cloudy' },
    { id: 'pressure_new', name: 'Pressure', icon: 'speedometer' }
  ];

  constructor(private platform: Platform, private router: Router) {

    // Register icons so they display in standalone mode
    addIcons({ thermometer, rainy, leaf, cloudy, speedometer,arrowBack,'layers-outline': layersOutline, locate, close });

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/home']);
    });

  }

  ngOnInit() {
    console.log('Weather Radar Initialized');
  }

  ionViewDidEnter() {

    this.initMap();

    setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
    }, 400);
  }

  initMap() {
    if (this.map) return;   //Prevent re-initialization

    // 1. Initialize Map
    this.map = L.map('map',
      { zoomControl: false, attributionControl: false}).setView([20.5937, 78.9629], 5);

    // 2. Add Base Tiles (Dark Mode for that "Radar" look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(this.map);

    // 3. Load default weather layer
    this.changeLayer(this.activeLayer);
  }

  changeLayer(layerId: string) {
    this.activeLayer = layerId;

    if (this.weatherLayer) {
      this.map.removeLayer(this.weatherLayer);
    }

    this.weatherLayer = L.tileLayer(
      `https://tile.openweathermap.org/map/${layerId}/{z}/{x}/{y}.png?appid=${this.apiKey}`,
      { opacity: 0.7, zIndex: 100 }
    ).addTo(this.map);
  }

  async locateUser() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lng = coordinates.coords.longitude;

    console.log('Obtained lat/long values for locateUser in weather-radar page :::', lat,lng);

    // Zoom to user and add a blue marker
    this.map.flyTo([lat, lng], 10);

    L.circle([lat, lng], {
      color: '#3880ff',
      fillColor: '#3880ff',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.map);
  }

}
