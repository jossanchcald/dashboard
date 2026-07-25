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
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  wind_speed_10m: number
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
  return VARIABLE_OPTIONS.find((option) => option.key === key)?.label ?? key
}
