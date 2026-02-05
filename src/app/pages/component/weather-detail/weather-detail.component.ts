import { Component, Input, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

import { WeatherItem } from 'src/interface/common-dto';
import { WeatherIconPipe } from 'src/pipes/weather-icon-pipe/weather-icon.pipe';
import { TempConvertPipe } from 'src/pipes/temp-convert-pipe/temp-convert.pipe';

import { UnitStateService } from 'src/providers/providers';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,WeatherIconPipe, TempConvertPipe]

})
export class WeatherDetailComponent  implements OnInit {

  // @Input allows us to pass data INTO this component
  @Input() data: WeatherItem | undefined;
  // Inject the service and make it PUBLIC so the HTML can see it
  public unitService = inject(UnitStateService);

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

  // Returns a dynamic emoji based on the API's "main" weather tag
  getWeatherIcon(condition: string | undefined ): string {
    if (!condition) return '⛅';

    const main = condition.toLowerCase();

    if (main.includes('clear')) return '☀️';
    if (main.includes('cloud')) return '☁️';
    if (main.includes('rain') || main.includes('drizzle')) return '🌧️';
    if (main.includes('thunder')) return '⛈️';
    if (main.includes('snow')) return '❄️';
    if (main.includes('mist') || main.includes('fog')) return '🌫️';

    return '⛅'; // Default fallback
  }

}
