// src/utils/weatherCondition.ts
export type WeatherCondition =
  | 'clear' | 'partlyCloudy' | 'cloudy' | 'fog'
  | 'drizzle' | 'rain' | 'snow' | 'storm';

export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partlyCloudy';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'clear';
}

export function getConditionLabel(condition: WeatherCondition): string {
  const labels: Record<WeatherCondition, string> = {
    clear: 'Despejado',
    partlyCloudy: 'Parcialmente nublado',
    cloudy: 'Nublado',
    fog: 'Neblina',
    drizzle: 'Llovizna',
    rain: 'Lluvia',
    snow: 'Nieve',
    storm: 'Tormenta',
  };
  return labels[condition];
}