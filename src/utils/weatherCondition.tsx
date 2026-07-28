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

// A partir de qué probabilidad de precipitación (%) se considera un día lluvioso
const RAIN_PROBABILITY_THRESHOLD = 50;

export type DayCondition = 'soleado' | 'lluvioso';

// Calcula si un día es soleado o lluvioso en base a la probabilidad de precipitación máxima
export function getDayCondition(precipitationProbabilityMax: number): DayCondition {
  return precipitationProbabilityMax >= RAIN_PROBABILITY_THRESHOLD ? 'lluvioso' : 'soleado';
}

export function getDayConditionLabel(condition: DayCondition): string {
  const labels: Record<DayCondition, string> = {
    soleado: 'Soleado',
    lluvioso: 'Lluvioso',
  };
  return labels[condition];
}