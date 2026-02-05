import { Injectable, signal, computed } from '@angular/core';

export type Unit = 'C' | 'F';

@Injectable({
  providedIn: 'root'
})
export class UnitStateService {
  // 1. The state signal
  private _unit = signal<Unit>('C');

  // 2. Read-only signal for components to consume
  readonly unit = this._unit.asReadonly();

  // 3. Action to toggle
  toggleUnit() {
    this._unit.update(current => current === 'C' ? 'F' : 'C');
  }
}
