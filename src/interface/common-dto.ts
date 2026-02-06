export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  dt_txt?: string; // Optional for forecast
}

// 1. The basic weather description (e.g., "Clouds", "overcast clouds")
export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// 2. The main data block (Temp, Pressure, Humidity)
export interface MainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

// 3. Wind data
export interface WindData {
  speed: number;
  deg: number;
}

// 4. The Core Object: This represents ONE snapshot of weather
// (Used for both "Current Weather" and a single "Forecast Day")
export interface WeatherItem {
  dt: number;        // Unix timestamp
  dt_txt?: string;   // Date string (only present in Forecast API)
  main: MainData;
  weather: WeatherDescription[];
  wind: WindData;
  visibility?: number;
}

// 5. The Top-Level Response for "Current Weather" API
export interface CurrentWeatherResponse extends WeatherItem {
  name: string;      // City Name (only in Current Weather API)
  cod: number;
  timezone: number;
  id: number;
}

// 6. The Top-Level Response for "5-Day Forecast" API
export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[]; // Array of weather snapshots
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}
