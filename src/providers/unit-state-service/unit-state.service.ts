import { Injectable, signal, computed, } from '@angular/core';

export type Unit = 'C' | 'F';

@Injectable({
  providedIn: 'root'
})
export class UnitStateService {

  // 1. Initialize Signal by checking localStorage first
  // If nothing is saved, default to 'C'
  private _unit = signal<Unit>(this.getSavedUnit());

  // 2. Read-only signal for components to consume
  readonly unit = this._unit.asReadonly();

  toggleUnit() {
    // 2. Update the signal
    this._unit.update(current => {
      const newUnit = current === 'C' ? 'F' : 'C';

      // 3. Save the new value to localStorage immediately
      localStorage.setItem('tempUnit', newUnit);

      return newUnit;
    });
  }

  // Helper to safely read from localStorage
  private getSavedUnit(): Unit {
    const saved = localStorage.getItem('tempUnit');
    // Only return it if it is strictly 'F', otherwise default to 'C'
    return saved === 'F' ? 'F' : 'C';
  }



}
