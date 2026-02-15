# 🌦️ WeatherCast: Resilient Cross-Platform Weather App

##

### [🔴 **View Live Demo**](https://weathercast-beige.vercel.app) Stack: Ionic 7 • Angular 17 • Capacitor • OpenWeatherMap

![Ionic](https://img.shields.io/badge/Ionic-7.0-3880FF?style=flat&logo=ionic)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular)
![Capacitor](https://img.shields.io/badge/Capacitor-Native-1199EE?style=flat&logo=capacitor)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat&logo=pwa)

---

### **Project Overview**

 WeatherCast is a robust, mobile-first weather application designed to provide accurate real-time data and forecasts for travelers. Built with the latest web technologies, it bridges the gap between web and native mobile experiences using Capacitor, allowing it to run seamlessly as a PWA and an Android app.
 Unlike standard portfolio apps, WeatherCast demonstrates a **Secure CI/CD Pipeline**, ensuring that sensitive API keys are never exposed in the source code while maintaining automated deployments.

### **✨ Key Features**

#### 1. Real-Time Weather & Forecast

Fetches current weather and a 5-day midday forecast using the OpenWeatherMap API.

Displays critical data: Temperature, Humidity, Wind Speed, and Weather Conditions.

#### 2. 🌙 Midnight Blue Dark Mode

Fully adaptive UI featuring a "Midnight Blue" theme.

Implements glassmorphism search elements and high-contrast accessibility standards.

#### 3. 📍 Smart Geolocation & Global Search

Automatically detects user location on startup via native geolocation plugins.

Provides global search capabilities for current weather conditions in any city worldwide.

#### 4. 🛡️ Robust "Safe-State" Error Handling

Dedicated Error State logic that handles network failures, invalid city names, or API timeouts.

A specialized standalone UI component acts as an overlay to guide users back to a safe state during critical failures.

#### 5. 🔔 Push Notification System

Successfully integrated Firebase Cloud Messaging (FCM) into the AppComponent launch sequence.apabilities: Ready to receive weather alerts and daily briefings.

Privacy-Aware: Logic distinguishes between user-denied permissions (graceful skip) and technical system-level crashes.

### 6. **📱 Native Mobile Support:**

  Fully compiled for Android and iOS using Capacitor.

---

### **🚀 Technical Highlights: Architecture & DevOps**

This project implements senior-level practices for security and stability.

#### **1. Advanced Weather Radar Engine**

* **Interactive Mapping**: Integrated the **Leaflet.js** library to provide a high-performance geography interface optimized for mobile touch gestures.
* **Dynamic Weather Layers**: Developed a sophisticated toggle system allowing users to overlay real-time data for **Temperature, Precipitation, Wind, Clouds, and Pressure** using OpenWeatherMap Maps 2.0 tiles.
* **Visual Data Interpolation**: Engineered a custom, responsive color-gradient legend (e.g., -40°C to +40°C) to enable immediate user interpretation of complex atmospheric data.

#### **2.Modern Architecture & DevOps**

**Angular 17 Migration**: Successfully migrated the entire application to a **Standalone Component** architecture, removing the overhead of traditional NgModules.
One of the core challenges in frontend deployment is managing secrets.
  **The Problem:** API keys stored in `environment.ts` are often accidentally committed to GitHub, posing a security risk.
  **The Solution:** This project uses a custom **DevOps script (`set-env.js`)** injected into the Vercel build process.
    1.   The `environment.ts` file is **excluded** from Git via `.gitignore`.
    2.   During deployment, Vercel executes `node set-env.js` *before* the Angular build.
    3.   The script dynamically generates the environment file using encrypted environment variables stored securely in the Vercel dashboard.
  
#### **3. Progressive Web App (PWA) Implementation**

Transformed the standard Angular app into an installable native-like experience.
  **Installability:** Configured `manifest.webmanifest` with custom branding, allowing users to "Add to Home Screen" on iOS and Android.
  **Asset Management:** Automated generation of 20+ icon sizes (adaptive & maskable) using `pwa-asset-generator` to meet strict mobile standards.
  **Angular 17 Compatibility:** Re-architected asset delivery to utilize the modern `public/` directory structure, ensuring correct service worker registration and caching strategies.
  **Performance Optimization**: Utilized **Route-Based Lazy Loading** (`loadComponent`) and advanced preloading strategies to minimize initial bundle size and ensure instant page transitions.

#### **4. ⚡ Resilience & Connectivity**

  **"Safe-State" Error Handling**: Developed robust error-handling logic to manage network failures or API timeouts, guiding users back to a functional state via a specialized standalone UI component.
  **Offline Awareness**: Integrated an **OfflineService** to monitor network status and provide real-time feedback to the user when connectivity is lost.
  **Push Notifications**: Integrated **Firebase Cloud Messaging (FCM)** with privacy-aware permission handling to support future weather alert features.

### 🏗️ Clean Code Principles

* **Standalone Components:** Fully migrated to Angular 17's module-free architecture.
* **Services:** Business logic is strictly separated from UI components (`WeatherService`, `FavoritesService`).
* **Strict Typing:** utilized TypeScript Interfaces (`WeatherResponse`) to prevent runtime errors.
* **Pure Pipes:** Logic for icon mapping and unit conversion is abstracted into pure pipes (`WeatherIconPipe`) for performance and reusability.

---

### **🛠️ Tech Stack & Architecture**

  **Frontend:** Ionic 7, Angular 17 (Standalone Components), TypeScript, SCSS (Safe Areas/Viewport-fit)
  **Runtime**: Capacitor (Native Android/iOS Build), Geolocation API, FCM.
  **PWA:** Angular Service Workers & Manifest
  **API:** OpenWeatherMap API (Current Weather + 5-Day Forecast)
  **Hosting:** Vercel (Production)
  **DevOps:** Vercel CI/CD, Secret Management,Custom Node.js scripts for Environment Injection
  **Notification:** Firebase cloud messaging

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
