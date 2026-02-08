import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  // 1. Initialize Signal from LocalStorage
  private _favorites = signal<string[]>(this.loadFavorites());

  // Read-only signal for the UI to track
  readonly favorites = this._favorites.asReadonly();

  constructor() {
    // This runs automatically whenever 'this._favorites()' changes.
    effect(() => {
      const currentList = this._favorites();
      localStorage.setItem('favoriteCities', JSON.stringify(currentList));
    });
  }

  // Add or Remove a city (Toggle Logic)
  toggleFavorite(city: string) {
    if (!city) return;

    const currentList = this._favorites();
    const cityLower = city.toLowerCase();

    // Check if city exists (case-insensitive)
    const exists = currentList.some(c => c.toLowerCase() === cityLower);

    let newList: string[];
    if (exists) {
      // Remove it
      newList = currentList.filter(c => c.toLowerCase() !== cityLower);
    } else {
      // Add it to the top of the list
      newList = [city, ...currentList];
    }

    // 3. Update State ONLY. The effect() above handles the storage!
    this._favorites.set(newList);
  }

  // 3. Helper to check if a city is favorited (for the Heart Icon)
  isFavorite(city: string): boolean {
    if (!city) return false;
    return this._favorites().some(c => c.toLowerCase() === city.toLowerCase());
  }

  // 4. Load users favorite cities from storage on startup
  private loadFavorites(): string[] {
    const saved = localStorage.getItem('favoriteCities');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }
}
