/*------------------Ionic components----------------------*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon',
  standalone: true
})
export class WeatherIconPipe implements PipeTransform {
  transform(condition: string | undefined): string {
    if (!condition) return '⛅';
    const main = condition.toLowerCase();

    if (main.includes('clear')) return '☀️';
    if (main.includes('cloud')) return '☁️';
    if (main.includes('rain') || main.includes('drizzle')) return '🌧️';
    if (main.includes('thunder')) return '⛈️';
    if (main.includes('snow')) return '❄️';
    if (main.includes('mist') || main.includes('fog') || main.includes('smoke')) return '🌫️';

    return '⛅';


  }
}
