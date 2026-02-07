import { Injectable, signal, computed,Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

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

  // Added '!' to tell TypeScript we will assign it in the constructor
  private renderer!: Renderer2;
  private isDarkTheme = new BehaviorSubject<boolean>(false);

  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor( @Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2) {

    this.renderer = rendererFactory.createRenderer(null, null);

  }

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

  toggleTheme(): void {
    const newStatus = !this.isDarkTheme.value;
    this.isDarkTheme.next(newStatus);

    if (newStatus) {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  }



}
