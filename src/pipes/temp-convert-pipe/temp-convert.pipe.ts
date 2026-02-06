import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperaturePipe',
  standalone: true
})
export class TempConvertPipe implements PipeTransform {

  // Temperature conversion logic to be implemented
  // User passes 'F', it means the shown input is in Celsius and wants to convert to Fahrenheit
  // User pass 'C', it means the shown input is in Fahrenheit and wants to convert to Degree Celsius

  transform(value: any , outputUnit : 'C' | 'F'): number | string {
    if(value === null || value === '' || value === undefined ){
      return ''; // return empty response
    }

    const inputTemp = Number(value); //Get the input temperature value

    // Exit early if input is not a valid number
    if (isNaN(inputTemp)) {
      return value;
    }

    // Convert Celsius to Fahrenheit
    if (outputUnit === 'F') {
       // F = (C * 9/5) + 32
      //outputTemp = (inputTemp * 9 / 5) + 32;
      const fahrenheit = (value * 9/5) + 32;
      return `${Math.round(fahrenheit)}°F`; //Rounding up to 1 decimal digit for clean UI
    }else{
      // Convert Fahrenheit to Celsius
      // C = (F - 32) * 5/9
      //outputTemp = (inputTemp - 32) * 5 / 9; //Mathematical formula

       return `${Math.round(value)}°C`; //Rounding up to 1 decimal digit for clean UI

    }
  }

}
