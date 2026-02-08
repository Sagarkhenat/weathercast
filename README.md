# 🌦️ WeatherCast

##

### [🔴 **View Live Demo**](https://weathercast-beige.vercel.app)

![Ionic](https://img.shields.io/badge/Ionic-7.0-3880FF?style=flat&logo=ionic)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular)
![Capacitor](https://img.shields.io/badge/Capacitor-Native-1199EE?style=flat&logo=capacitor)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat&logo=pwa)

---

### **Overview**

 Unlike standard portfolio apps, WeatherCast demonstrates a **Secure CI/CD Pipeline**, ensuring that sensitive API keys are never exposed in the source code while maintaining automated deployments.

### **✨ Key Features**

#### 1. Real-Time Weather & Forecast
  
  Fetches current weather and a 5-day forecast using the **OpenWeatherMap API**.
  Displays critical data: Temperature, Humidity, Wind Speed, and Weather Conditions.

### 2. **🌙 Dark Mode:**

  Fully adaptive UI featuring a "Midnight Blue" theme, glassmorphism search elements, and high-contrast accessibility.

### 3. **📍 Smart Geolocation:**
  
   Automatically detects user location on startup to display local weather.

### 4. **🔍 Global Search:**

  Search for current weather conditions in any city worldwide.

### 5. **🛡️ Robust Error Handling:**

  Dedicated "Error State" logic that gracefully handles network failures, invalid city names, or API timeouts, guiding the user back to a safe state.

### 6. **🔄 Pull-to-Refresh:**

  Instantly reload data with native gestures.

### 7. **📱 Native Mobile Support:**

  Fully compiled for Android and iOS using Capacitor.

---

### **🚀 Technical Highlights: Architecture & DevOps**

This project implements senior-level practices for security and stability.

#### **1. Secure CI/CD Pipeline (The `set-env` Workflow)**

One of the core challenges in frontend deployment is managing secrets.
  **The Problem:** API keys stored in `environment.ts` are often accidentally committed to GitHub, posing a security risk.
  **The Solution:** This project uses a custom **DevOps script (`set-env.js`)** injected into the Vercel build process.
    1.   The `environment.ts` file is **excluded** from Git via `.gitignore`.
    2.   During deployment, Vercel executes `node set-env.js` *before* the Angular build.
    3.   The script dynamically generates the environment file using encrypted environment variables stored securely in the Vercel dashboard.
  
#### **2. Progressive Web App (PWA) Implementation**

Transformed the standard Angular app into an installable native-like experience.
  **Installability:** Configured `manifest.webmanifest` with custom branding, allowing users to "Add to Home Screen" on iOS and Android.
  **Asset Management:** Automated generation of 20+ icon sizes (adaptive & maskable) using `pwa-asset-generator` to meet strict mobile standards.
  **Angular 17 Compatibility:** Re-architected asset delivery to utilize the modern `public/` directory structure, ensuring correct service worker registration and caching strategies.

#### **3. ⚡ Performance Optimization**

  **Lazy Loading:** Implemented **Route-Based Lazy Loading** (`loadComponent`) to split the application into smaller chunks, significantly reducing the initial bundle size
  **Preloading Strategy:** Configured `PreloadAllModules` to fetch remaining bundles in the background, ensuring instant navigation without wait times

### 🏗️ Clean Code Principles

* **Standalone Components:** Fully migrated to Angular 17's module-free architecture.
* **Services:** Business logic is strictly separated from UI components (`WeatherService`, `FavoritesService`).
* **Strict Typing:** utilized TypeScript Interfaces (`WeatherResponse`) to prevent runtime errors.
* **Pure Pipes:** Logic for icon mapping and unit conversion is abstracted into pure pipes (`WeatherIconPipe`) for performance and reusability.

---

### **🛠️ Tech Stack**

  **Frontend:** Ionic 7, Angular 17 (Standalone Components)
  **Runtime:** Capacitor 5/6 (Native iOS/Android)
  **PWA:** Angular Service Workers & Manifest
  **API:** OpenWeatherMap (Free Tier)
  **Hosting:** Vercel (Production)
  **DevOps:** Custom Node.js scripts for Environment Injection

---

### **📸 Screenshots**

| Home Screen | Search & Forecast | Error Handling |
| :---: | :---: | :---: |
| *(Add screenshot here)* | *(Add screenshot here)* | *(Add screenshot here)* |

---

### **⚙️ How to Run Locally**

Since the API keys are not in the repository (for security), you will need your own OpenWeatherMap key to run this locally.

**1. Clone the repository:**

```bash


git clone [https://github.com/Sagarkhenat/weathercast.git](https://github.com/Sagarkhenat/weathercast.git)
cd weathercast

```

**2. Install dependencies:**

```bash

npm install

```

**3. Configure Environment:**
Create a file at `src/environments/environment.ts` and add your key:

```typescript
export const environment = {
  production: false,
  apiKey: 'YOUR_OPENWEATHER_KEY',
  weatherBaseUrl: '[https://api.openweathermap.org/data/2.5/](https://api.openweathermap.org/data/2.5/)'
};

```

**4. Run the App:**

 **Web / PWA (with Proxy):**
  
```bash

ionic build --prod
npx http-server ./www --proxy http://localhost:8080?

```

**Web:**

```bash
ionic serve

```

**Android:**

```bash
ionic build
npx cap add android
npx cap run android

```

**iOS (macOS only):**

```bash
ionic build
npx cap add ios
npx cap run ios

```

---

### **License**

This project is open-source and available under the MIT License.
