# 🌦️ WeatherCast

### [🔴 **View Live Demo](https://www.google.com/search?q=https://weathercast-beige.vercel.app)**

*(Hosted on Vercel)*

---

### **Overview**

WeatherCast is a responsive weather application built with **Ionic** and **Angular**. It provides real-time weather forecasts using the OpenWeatherMap API.

This project demonstrates a production-ready **CI/CD pipeline** with a focus on security. Unlike standard tutorials, this app is deployed without exposing sensitive API keys in the source code.

### **Key Features**

* **📍 Real-Time Forecasts:** Fetches live data including temperature, humidity, and wind speed.
* **📱 Cross-Platform UI:** Built with Ionic components for a native-like experience on both mobile and desktop.
* **🛡️ Robust Error Handling:** Includes a dedicated "Error State" logic (previously implemented) that gracefully handles network failures, invalid city names, or API timeouts, guiding the user back to a safe state.

### **Technical Highlights: Secure CI/CD**

One of the core challenges in frontend deployment is managing secrets.

* **The Problem:** API keys stored in `environment.ts` are often accidentally committed to GitHub, posing a security risk.
* **The Solution:** This project uses a custom **DevOps script (`set-env.js`)** injected into the Vercel build process.
1. The `environment.ts` file is **excluded** from Git (`.gitignore`).
2. During deployment, Vercel executes `set-env.js` *before* the Angular build.
3. The script dynamically generates the environment file using encrypted environment variables stored securely in the Vercel dashboard.



### **Tech Stack**

* **Framework:** Ionic / Angular
* **Hosting:** Vercel (Production)
* **API:** OpenWeatherMap
* **Language:** TypeScript

### **How to Run Locally**

Since the API keys are not in the repo, you will need your own OpenWeatherMap key to run this locally.

1. **Clone the repo:**
```bash
git clone https://github.com/Sagarkhenat/weathercast.git
cd weathercast

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment:**
Create a file at `src/environments/environment.ts` and add your key:
```typescript
export const environment = {
  production: false,
  apiKey: 'YOUR_OPENWEATHER_KEY',
  weatherBaseUrl: 'https://api.openweathermap.org/data/2.5/'
};

```


4. **Run the app:**
```bash
ionic serve

```



---

### **Why this helps you**

* **The "Technical Highlights" section** is the money maker. It answers the interviewer's question ("How do you handle security?") before they even ask it.
* **The "Error Handling" bullet** proves you care about User Experience (UX), not just "happy path" coding.


