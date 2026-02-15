import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

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
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class WeatherSearchComponent  implements OnInit {

  // Create a "broadcast" channel
  @Output() citySearchEvent = new EventEmitter<string>();
  // Internal control to track the input
  searchControl = new FormControl('');

  errorMessage: string = '';

  constructor() { }

  ngOnInit = () => {

      this.searchControl.valueChanges.pipe(
            debounceTime(500),   // Wait 500ms after the user STOPS typing
            distinctUntilChanged(),    // Ignore if the next value is same as previous (e.g. user hit shift)
            filter(value => value !== null && value.length > 2)  // Only emit if length > 2 to avoid searching "A" or "Lo"

          ).subscribe(searchTerm => {
            // Emit the clean, debounced value to the Parent
            this.citySearchEvent.emit(searchTerm!);
          });
  }


  // Function called when user hits Search
  async searchCityManual() {

    const inputElement = document.getElementById('cityInput') as HTMLInputElement;
    const value = this.searchControl.value;

    if (!value) return; // Stop if empty

    if (value && value.length > 2) {
      // Just emit the name! Let the parent handle the heavy lifting.
      this.citySearchEvent.emit(value);
      // Clear input after search
      inputElement.value = '';

    }else{

    }
  }


  clearSearch = () => {
    this.searchControl.setValue(''); // Clears the input
    // Optional: If you want to clear the results on the main page too,
    // you can emit an empty string here:
    // this.citySearchEvent.emit('');
  }

}
