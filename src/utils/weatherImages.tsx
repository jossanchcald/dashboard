// src/utils/weatherImages.tsx
import clearDay from '../assets/weather/day/clearDay.jpg';
import clearNight from '../assets/weather/night/clearNight.jpg';
import partlyCloudyDay from '../assets/weather/day/partlyCloudyDay.jpg';
import partlyCloudyNight from '../assets/weather/night/partlyCloudyNight.jpg';
import cloudyDay from '../assets/weather/day/cloudyDay.jpg';
import cloudyNight from '../assets/weather/night/cloudyNight.jpg';
import fogDay from '../assets/weather/day/fogDay.jpg';
import fogNight from '../assets/weather/night/fogNight.jpg';
import drizzleDay from '../assets/weather/day/drizzleDay.jpg';
import drizzleNight from '../assets/weather/night/drizzleNight.jpg';
import rainDay from '../assets/weather/day/rainDay.jpg';
import rainNight from '../assets/weather/night/rainNight.jpg';
import snowDay from '../assets/weather/day/snowDay.jpg';
import snowNight from '../assets/weather/night/snowNight.jpg';
import stormDay from '../assets/weather/day/stormDay.jpg';
import stormNight from '../assets/weather/night/stormNight.jpg';
import { type WeatherCondition } from './weatherCondition';

// Mapeamos los nombres
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