/*------------------Ionic components----------------------*/
import { Pipe, PipeTransform, inject } from '@angular/core';
import { WeatherService } from 'src/providers/providers';

@Pipe({
  name: 'weatherIcon',
  standalone: true
})
export class WeatherIconPipe implements PipeTransform {

  // Inject the service
  private iconService = inject(WeatherService);

  transform(condition: string | undefined | null ): string {
    // If condition is missing, pass an empty string
    const safeCondition = condition || '';
    return this.iconService.getIcon(safeCondition);
  }

}
