// src/hooks/useLocalTime.ts
import { useEffect, useState } from 'react';

export default function useLocalTime(utcOffsetSeconds: number | undefined) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (utcOffsetSeconds === undefined) {
    return { localDate: now, hourDecimal: now.getHours() + now.getMinutes() / 60 };
  }

  // Hora UTC actual + el offset del lugar seleccionado (no el offset del navegador)
  const utcMillis = now.getTime() + now.getTimezoneOffset() * 60_000;
  const localDate = new Date(utcMillis + utcOffsetSeconds * 1000);

  return {
    localDate,
    hourDecimal: localDate.getHours() + localDate.getMinutes() / 60,
  };
}