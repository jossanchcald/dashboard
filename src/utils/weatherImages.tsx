// src/utils/weatherImages.ts
import clearDay from '../assets/weather/clear-day.png';
import clearNight from '../assets/weather/clear-night.png';
import partlyCloudyDay from '../assets/weather/partly-cloudy-day.png';
import partlyCloudyNight from '../assets/weather/partly-cloudy-night.png';
import cloudyDay from '../assets/weather/cloudy-day.png';
import cloudyNight from '../assets/weather/cloudy-night.png';
import fogDay from '../assets/weather/fog-day.png';
import fogNight from '../assets/weather/fog-night.png';
import drizzleDay from '../assets/weather/drizzle-day.png';
import drizzleNight from '../assets/weather/drizzle-night.png';
import rainDay from '../assets/weather/rain-day.png';
import rainNight from '../assets/weather/rain-night.png';
import snowDay from '../assets/weather/snow-day.png';
import snowNight from '../assets/weather/snow-night.png';
import stormDay from '../assets/weather/storm-day.png';
import stormNight from '../assets/weather/storm-night.png';
import { type WeatherCondition } from './weatherCondition';

// Un solo mapa con las 16 combinaciones -- más fácil de mantener
// que un switch largo, y más difícil de olvidar un caso.
const WEATHER_IMAGES: Record<WeatherCondition, { day: string; night: string }> = {
  clear: { day: clearDay, night: clearNight },
  partlyCloudy: { day: partlyCloudyDay, night: partlyCloudyNight },
  cloudy: { day: cloudyDay, night: cloudyNight },
  fog: { day: fogDay, night: fogNight },
  drizzle: { day: drizzleDay, night: drizzleNight },
  rain: { day: rainDay, night: rainNight },
  snow: { day: snowDay, night: snowNight },
  storm: { day: stormDay, night: stormNight },
};

export function getWeatherImage(condition: WeatherCondition, isDay: boolean): string {
  const pair = WEATHER_IMAGES[condition];
  return isDay ? pair.day : pair.night;
}