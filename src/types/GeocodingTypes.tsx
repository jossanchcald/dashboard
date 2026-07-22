export interface GeocodingResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    country: string;
    admin1?: string; // provincia/estado
    timezone: string;
}

export interface GeocodingResponse {
    results?: GeocodingResult[];
}