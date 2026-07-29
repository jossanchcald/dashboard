// src/hooks/useWeatherTheme.ts
import { useMemo } from 'react';
import useLocalTime from './useLocalTime';
import { getWeatherCondition } from '../utils/weatherCondition';
import { getSkyGradient, getConditionOverlay } from '../utils/skyGradient';
import { type Current, type Daily } from '../types/DashboardTypes';

function parseHour(isoString: string) {
  const d = new Date(isoString);
  return d.getHours() + d.getMinutes() / 60;
}

export default function useWeatherTheme(
  current: Current | undefined,
  daily: Daily | undefined,
  utcOffsetSeconds: number | undefined
) {
  const { hourDecimal, localDate } = useLocalTime(utcOffsetSeconds);

  return useMemo(() => {
    if (!current || !daily) {
      return {
        ready: false as const,
        isDay: true,
        condition: 'clear' as const,
        background: '#B8C4D4',
        overlay: 'transparent',
        localDate,
      };
    }

    const condition = getWeatherCondition(current.weather_code);
    const isDay = current.is_day === 1;
    const sunriseHour = parseHour(daily.sunrise[0]);
    const sunsetHour = parseHour(daily.sunset[0]);
    const background = getSkyGradient(hourDecimal, sunriseHour, sunsetHour);
    const overlay = getConditionOverlay(condition);

    return { ready: true as const, isDay, condition, background, overlay, localDate };
  }, [current, daily, hourDecimal, localDate]);
}