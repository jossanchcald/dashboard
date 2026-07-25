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
  location_id?: number
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  wind_speed_10m: string
  weather_code: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  wind_speed_10m: number
  weather_code: number
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
}

// Variables disponibles para comparar en el gráfico y la tabla.
// Cada key coincide con el nombre del campo devuelto por OpenMeteo en "hourly".
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


// A lo mejor se podria cambiar a VARIABLE_OPTIONS.find((option) => option.key === key)?.label ?? "La clave no existe"
export function getVariableLabel(key: VariableKey): string {
  return VARIABLE_OPTIONS.find((option) => option.key === key)?.label ?? "No Encontrada"
}

export type RangeFilter = '24h' | '48h' | 'todo'

export interface RangeFilterOption {
  key: RangeFilter
  label: string
  hours?: number // undefined = mostrar todo
}

export const RANGE_FILTER_OPTIONS: RangeFilterOption[] = [
  { key: '24h', label: '24 horas', hours: 24 },
  { key: '48h', label: '48 horas', hours: 48 },
  { key: 'todo', label: 'Mostrar todo' },
]

export function sliceByRange<T>(arr: T[], filter: RangeFilter): T[] {
  const limit = RANGE_FILTER_OPTIONS.find((option) => option.key === filter)?.hours ?? arr.length
  return arr.slice(0, limit)
}

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error'

export interface WeatherAlert {
  emoji: string
  message: string
  severity: AlertSeverity
}

interface WeatherCodeMapping {
  codes: number[]
  emoji: string
  message: string
  severity: AlertSeverity
}

const WEATHER_CODE_MAP: WeatherCodeMapping[] = [
  { codes: [0, 1], emoji: '☀️', message: 'Cielo despejado', severity: 'success' },
  { codes: [2, 3], emoji: '⛅', message: 'Nublado', severity: 'success' },
  { codes: [45, 48], emoji: '🌫️', message: 'Hay niebla en este momento', severity: 'info' },
  { codes: [51, 53, 55, 56, 57], emoji: '🌦️', message: 'Hay llovizna actualmente', severity: 'info' },
  { codes: [61, 63, 65, 66, 67], emoji: '🌧️', message: 'Está lloviendo actualmente', severity: 'warning' },
  { codes: [71, 73, 75, 77], emoji: '❄️', message: 'Está nevando actualmente', severity: 'warning' },
  { codes: [80, 81, 82], emoji: '🌦️', message: 'Se presentan chubascos', severity: 'warning' },
  { codes: [85, 86], emoji: '🌨️', message: 'Chubascos de nieve', severity: 'warning' },
  { codes: [95, 96, 99], emoji: '⛈️', message: 'Tormenta eléctrica en curso', severity: 'error' },
]

const DEFAULT_ALERT: WeatherAlert = { emoji: '✅', message: 'Sin precipitaciones actualmente', severity: 'success' }

export function getWeatherAlert(weatherCode: number): WeatherAlert {
  const match = WEATHER_CODE_MAP.find((entry) => entry.codes.includes(weatherCode))
  return match ?? DEFAULT_ALERT
}