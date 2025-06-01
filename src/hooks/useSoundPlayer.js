// src/hooks/useSoundPlayer.js
import { useRef, useCallback, useEffect } from 'react';

const useSoundPlayer = () => {
  // `currentPlayingAudio` almacenará la instancia del objeto Audio que se está reproduciendo actualmente.
  // Usamos `useRef` para que el objeto Audio persista entre renders sin causar renderizados innecesarios,
  // y porque su valor se puede mutar directamente.
  const currentPlayingAudio = useRef(null);

  // La función `playSound` será la encargada de detener el sonido anterior y reproducir el nuevo.
  const playSound = useCallback((filePath) => {
    // 1. Detener el sonido que se estaba reproduciendo (si hay alguno)
    if (currentPlayingAudio.current) {
      currentPlayingAudio.current.pause();
      currentPlayingAudio.current.currentTime = 0; // Opcional: Reinicia el sonido al principio
    }

    // 2. Crear una nueva instancia de Audio para el sonido actual
    const audio = new Audio(filePath);

    // 3. Almacenar esta nueva instancia como el sonido actual en reproducción
    currentPlayingAudio.current = audio;

    // 4. Reproducir el nuevo sonido
    audio.play()
      .catch(error => {
        // Captura cualquier error de reproducción (ej. si el navegador bloquea la reproducción automática)
        console.error("Error al reproducir el sonido:", filePath, error);
        // Podríamos añadir una notificación al usuario aquí si quisiéramos.
      });
  }, []); // `useCallback` para memorizar la función y evitar recreaciones innecesarias

  // Efecto para limpiar (pausar y resetear) el sonido si el componente que usa el hook se desmonta
  useEffect(() => {
    return () => {
      if (currentPlayingAudio.current) {
        currentPlayingAudio.current.pause();
        currentPlayingAudio.current.currentTime = 0;
        currentPlayingAudio.current = null; // Liberar la referencia
      }
    };
  }, []);

  // El hook devuelve la función `playSound` que será usada por los componentes.
  return { playSound };
};

export default useSoundPlayer;