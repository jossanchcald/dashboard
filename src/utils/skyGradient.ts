// src/utils/skyGradient.ts

export type ColorStop = { hour: number; color: [number, number, number] };

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToCss([r, g, b]: [number, number, number]): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(c1: [number, number, number], c2: [number, number, number], t: number): [number, number, number] {
  return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
}

/** 
 * Normaliza cualquier hora para que siempre caiga estrictamente entre 0 y 23.999.
 * Esto evita bugs de ordenamiento cuando los cálculos (ej: sunsetHour + 1.5) superan las 24 horas.
 */
function normalizeHour(h: number): number {
  return ((h % 24) + 24) % 24;
}

function getColorAtHour(stops: ColorStop[], hourDecimal: number): [number, number, number] {
  // 1. Normalizar las horas de todos los stops antes de ordenar
  const normalizedStops = stops.map(s => ({
    ...s,
    hour: normalizeHour(s.hour)
  }));

  // 2. Ordenar estrictamente por hora
  const sorted = normalizedStops.sort((a, b) => a.hour - b.hour);

  // 3. Crear el loop para el cruce de medianoche
  const wrapped = [...sorted, { ...sorted[0], hour: sorted[0].hour + 24 }];

  // 4. Ajustar la hora actual para la interpolación
  let h = normalizeHour(hourDecimal);
  if (h < sorted[0].hour) {
    h += 24;
  }

  for (let i = 0; i < wrapped.length - 1; i++) {
    const a = wrapped[i];
    const b = wrapped[i + 1];
    
    if (h >= a.hour && h <= b.hour) {
      // Interpolación lineal estándar (t va de 0 a 1)
      let t = (h - a.hour) / (b.hour - a.hour);
      
      // --- MEJORA: Suavizado (Smoothstep) ---
      // Hace que la transición empiece lento, acelere en el medio y termine lento.
      // Esto elimina los tonos grises mecánicos al mezclar colores complementarios (ej: azul y naranja).
      const smoothT = t * t * (3 - 2 * t); 
      
      return lerpColor(a.color, b.color, smoothT);
    }
  }
  
  return sorted[0].color; // Fallback seguro por si ocurre algún error matemático
}

/**
 * Genera un gradiente CSS de cielo (top/bottom) según la hora local decimal
 * y los horarios reales de amanecer/atardecer del lugar seleccionado.
 */
export function getSkyGradient(hourDecimal: number, sunriseHour: number, sunsetHour: number): string {
  const topStops: ColorStop[] = [
    { hour: 0, color: hexToRgb('#0B1C3D') },
    { hour: sunriseHour - 1.5, color: hexToRgb('#1B3A6B') },
    { hour: sunriseHour, color: hexToRgb('#F7A45C') },
    { hour: sunriseHour + 1.5, color: hexToRgb('#6FB8E8') },
    { hour: 13, color: hexToRgb('#2E86DE') },
    { hour: sunsetHour - 1.5, color: hexToRgb('#5AA0D8') },
    { hour: sunsetHour, color: hexToRgb('#E8703A') },
    { hour: sunsetHour + 1.5, color: hexToRgb('#1B3A6B') }, 
    { hour: 23, color: hexToRgb('#0B1C3D') },
  ];

  const bottomStops: ColorStop[] = [
    { hour: 0, color: hexToRgb('#152B52') },
    { hour: sunriseHour - 1.5, color: hexToRgb('#2C4E80') },
    { hour: sunriseHour, color: hexToRgb('#FFC98A') },
    { hour: sunriseHour + 1.5, color: hexToRgb('#BEE4FA') },
    { hour: 13, color: hexToRgb('#8FD3F4') },
    { hour: sunsetHour - 1.5, color: hexToRgb('#A9D3EA') },
    { hour: sunsetHour, color: hexToRgb('#F5A461') },
    { hour: sunsetHour + 1.5, color: hexToRgb('#2C4E80') },
    { hour: 23, color: hexToRgb('#152B52') },
  ];

  const top = rgbToCss(getColorAtHour(topStops, hourDecimal));
  const bottom = rgbToCss(getColorAtHour(bottomStops, hourDecimal));

  // --- MEJORA VISUAL: Empujar el tope del gradiente ---
  // Un cielo real rara vez es un gradiente perfecto 0-100.
  // Empujar el tope al 15% ayuda a darle más profundidad al cielo superior.
  return `linear-gradient(180deg, ${top} 15%, ${bottom} 100%)`;
}

/** Overlay semitransparente encima del gradiente, según la condición climática */
export function getConditionOverlay(condition: string): string {
  const overlays: Record<string, string> = {
    clear: 'transparent',
    partlyCloudy: 'rgba(120,130,140,0.15)',
    cloudy: 'rgba(90,100,110,0.35)',
    fog: 'rgba(200,205,210,0.45)',
    drizzle: 'rgba(60,75,90,0.35)',
    rain: 'rgba(40,55,70,0.45)',
    snow: 'rgba(220,225,235,0.3)',
    storm: 'rgba(20,25,35,0.55)',
  };
  return overlays[condition] ?? 'transparent';
}