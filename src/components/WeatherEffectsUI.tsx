// src/components/WeatherEffectsUI.tsx
import Box from '@mui/material/Box';
import { type WeatherCondition } from '../utils/weatherCondition';

interface WeatherEffectsUIProps {
  condition: WeatherCondition;
  isDay: boolean;
}

// Genera partículas con posiciones "aleatorias" pero deterministas (mismo resultado cada render,
// no cambian de posición cada vez que el componente se re-renderiza)
function buildParticles(count: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const pseudo = Math.sin(seed + i * 12.9898) * 43758.5453;
    const frac = pseudo - Math.floor(pseudo);
    return {
      left: (frac * 100).toFixed(1),
      delay: (frac * 3).toFixed(2),
      duration: (1.2 + frac * 1.3).toFixed(2),
      size: (2 + frac * 3).toFixed(1),
    };
  });
}

export default function WeatherEffectsUI(props: WeatherEffectsUIProps) {
  const rainDrops = buildParticles(30, 1);
  const snowFlakes = buildParticles(24, 2);
  const clouds = buildParticles(4, 3);

  const showRain = props.condition === 'rain' || props.condition === 'drizzle' || props.condition === 'storm';
  const showSnow = props.condition === 'snow';
  const showClouds = props.condition === 'cloudy' || props.condition === 'partlyCloudy' || props.condition === 'storm';
  const showFog = props.condition === 'fog';
  const showLightning = props.condition === 'storm';

  return (
    <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes weatherFall {
          from { transform: translateY(-10%); }
          to { transform: translateY(120%); }
        }
        @keyframes cloudDrift {
          from { transform: translateX(-10%); }
          to { transform: translateX(110%); }
        }
        @keyframes lightningFlash {
          0%, 92%, 100% { opacity: 0; }
          94%, 96% { opacity: 0.5; }
        }
      `}</style>

      {showRain && rainDrops.map((drop, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: 0,
            left: `${drop.left}%`,
            width: '2px',
            height: '16px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.5)',
            animation: `weatherFall ${drop.duration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}

      {showSnow && snowFlakes.map((flake, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: 0,
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.85)',
            animation: `weatherFall ${(Number(flake.duration) * 2.5).toFixed(2)}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}

      {showClouds && clouds.map((cloud, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${10 + i * 15}%`,
            left: 0,
            width: '140px',
            height: '40px',
            borderRadius: '50px',
            background: props.isDay ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)',
            filter: 'blur(4px)',
            animation: `cloudDrift ${18 + i * 6}s linear infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {showFog && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.15) 100%)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {showLightning && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: '#fff',
            animation: 'lightningFlash 6s ease-in-out infinite',
          }}
        />
      )}
    </Box>
  );
}