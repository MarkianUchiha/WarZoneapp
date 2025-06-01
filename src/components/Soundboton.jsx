// src/components/SoundButton.jsx
import React from 'react';

// Ahora, SoundButton recibe una prop `onPlaySound` en lugar de `onClick`
const SoundButton = ({ sound, onPlaySound }) => {

  const handleClick = () => {
    // Cuando se hace clic, llamamos a la función `onPlaySound` que viene del padre
    // y le pasamos la ruta del archivo de sonido.
    if (onPlaySound) {
      onPlaySound(sound.file);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        bg-gray-800 text-green-400 font-bold py-4 px-6
        rounded-lg shadow-lg hover:bg-gray-700 active:bg-gray-900
        transition duration-150 ease-in-out
        flex flex-col items-center justify-center text-center
        min-w-[120px] h-[100px] text-xl uppercase tracking-wider
        border-2 border-green-500 hover:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-75
      "
    >
      {sound.image && (
        <img src={sound.image} alt={sound.name} className="w-10 h-10 mb-2 object-contain" />
      )}
      <span>{sound.name}</span>
    </button>
  );
};

export default SoundButton;