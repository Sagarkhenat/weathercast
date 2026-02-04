import { WeatherIconPipe } from './weather-icon.pipe';

describe('WeatherIconPipe', () => {
  // 1. Create an instance of the pipe before each test
  let pipe: WeatherIconPipe;

  beforeEach(() => {
    pipe = new WeatherIconPipe();
  });

  // 2. Basic Sanity Check
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // 3. Test "Happy Paths" (Standard Inputs)
  it('should return 🌧️ for "Rain"', () => {
    const result = pipe.transform('Rain');
    expect(result).toBe('🌧️');
  });

  it('should return ☀️ for "Clear"', () => {
    const result = pipe.transform('Clear');
    expect(result).toBe('☀️');
  });

  it('should return ❄️ for "Snow"', () => {
    const result = pipe.transform('Snow');
    expect(result).toBe('❄️');
  });

  // 4. Test Case Insensitivity (Robustness)
  it('should handle different casing (e.g., "rain", "RAIN")', () => {
    expect(pipe.transform('rain')).toBe('🌧️');
    expect(pipe.transform('RAIN')).toBe('🌧️');
  });

  // 5. Test Partial Matches (e.g. "light rain")
  it('should detect keywords inside longer descriptions', () => {
    expect(pipe.transform('light rain')).toBe('🌧️');
    expect(pipe.transform('scattered clouds')).toBe('☁️');
    expect(pipe.transform('heavy intensity rain')).toBe('🌧️');
  });

  // 6. Test Edge Cases (Safety)
  it('should return default ⛅ for undefined or null', () => {
    expect(pipe.transform(undefined)).toBe('⛅');
    expect(pipe.transform(null as any)).toBe('⛅'); // Casting to simulate bad data
    expect(pipe.transform('')).toBe('⛅');
  });

  // 7. Test Fallback
  it('should return default ⛅ for unknown weather types', () => {
    expect(pipe.transform('Volcanic Ash')).toBe('⛅');
  });
});
