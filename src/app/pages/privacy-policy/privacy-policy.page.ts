import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader,IonBackButton } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/providers/providers';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
  standalone:true,
  imports:[CommonModule,IonHeader,IonBackButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrivacyPolicyPage implements OnInit {
  currentDate: string = '';
  weatherCondition: string = 'default';

  constructor(private weatherService: WeatherService) { }

  ngOnInit = () => {
    this.updateDate();
    this.getWeatherTheme();
  }

  updateDate = () => {
    const date = new Date();
    this.currentDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getWeatherTheme = () => {
    // Replace this with your actual service call or signal
    // Example: this.weatherCondition = this.weatherService.currentWeather()?.weather[0]?.main.toLowerCase();

    // For now, let's assume 'clouds' for demo purposes as seen in your screenshot
    this.weatherCondition = 'clouds';
  }

}
