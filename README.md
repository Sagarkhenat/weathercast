# 🌦️ WeatherCast

##

### [🔴 **View Live Demo**](https://weathercast-beige.vercel.app)

![Ionic](https://img.shields.io/badge/Ionic-7.0-3880FF?style=flat&logo=ionic)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular)
![Capacitor](https://img.shields.io/badge/Capacitor-Native-1199EE?style=flat&logo=capacitor)

---

### **Overview**

 Unlike standard portfolio apps, WeatherCast demonstrates a **Secure CI/CD Pipeline**, ensuring that sensitive API keys are never exposed in the source code while maintaining automated deployments.

### **✨ Key Features**

  **🌙 Dark Mode:** Fully adaptive UI featuring a "Midnight Blue" theme, glassmorphism search elements, and high-contrast accessibility.
  **📍 Smart Geolocation:** Automatically detects user location on startup to display local weather.
  **🔍 Global Search:** Search for current weather conditions in any city worldwide.
  **📅 5-Day Forecast:** Horizontal scrolling view of the upcoming week's weather.
  **🛡️ Robust Error Handling:** Dedicated "Error State" logic that gracefully handles network failures, invalid city names, or API timeouts, guiding the user back to a safe state.
 **🔄 Pull-to-Refresh:** Instantly reload data with native gestures.
  **📱 Native Mobile Support:** Fully compiled for Android and iOS using Capacitor.

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

#### **2. User Experience Engineering**

  **Glassmorphism UI:** Custom CSS implementation for modern aesthetics.
  **Resilient State Management:** The app anticipates API failures (e.g., rate limits or bad queries) and presents user-friendly feedback instead of breaking.

---

### **🛠️ Tech Stack**

  **Frontend:** Ionic 7, Angular 17 (Standalone Components)
  **Runtime:** Capacitor 5/6 (Native iOS/Android)
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

* **Web / Browser:**

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
