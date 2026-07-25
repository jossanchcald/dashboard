export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
  location_id?: number
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  wind_speed_10m: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  wind_speed_10m: number
  weather_code: number
  is_day: 0 | 1
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  relative_humidity_2m: string
  wind_speed_10m: string
  apparent_temperature: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
  wind_speed_10m: number[]
  apparent_temperature: number[]
  weather_code: number[]
  precipitation_probability: number[]
}

export interface DailyUnits {
  temperature_2m_max: string
  temperature_2m_min: string
  sunrise: string
  sunset: string
}

export interface Daily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: string[]
  sunset: string[]
  weather_code: number[]
  precipitation_probability_max: number[]
}

export type VariableKey =
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'wind_speed_10m'
  | 'apparent_temperature'

export interface VariableOption {
  key: VariableKey
  label: string
}

export const VARIABLE_OPTIONS: VariableOption[] = [
  { key: 'temperature_2m', label: 'Temperatura' },
  { key: 'relative_humidity_2m', label: 'Humedad' },
  { key: 'wind_speed_10m', label: 'Viento' },
  { key: 'apparent_temperature', label: 'Temperatura aparente' },
]

export function getVariableLabel(key: VariableKey): string {
  return VARIABLE_OPTIONS.find((option) => option.key === key)?.label ?? key
}

export type RangeFilter = '24h' | '48h' | 'todo'

export interface RangeFilterOption {
  key: RangeFilter
  label: string
  hours?: number
}

export const RANGE_FILTER_OPTIONS: RangeFilterOption[] = [
  { key: '24h', label: '24 horas', hours: 24 },
  { key: '48h', label: '2 dias', hours: 48 },
  { key: 'todo', label: '7 dias' },
]

export function sliceByRange<T>(arr: T[], filter: RangeFilter): T[] {
  const limit =
    RANGE_FILTER_OPTIONS.find((option) => option.key === filter)?.hours ?? arr.length

  return arr.slice(0, limit)
}