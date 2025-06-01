// src/components/UploadSound.jsx
import React, { useState, useRef } from 'react';

const UploadSound = ({ onSoundLoaded }) => {
  const [uploadedSoundURL, setUploadedSoundURL] = useState(null);
  const [uploadedSoundName, setUploadedSoundName] = useState('');
  const fileInputRef = useRef(null); // Referencia al input de archivo para resetearlo

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      // Verifica si es un archivo de audio
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file); // Crea una URL temporal para el archivo
        setUploadedSoundURL(url);
        setUploadedSoundName(file.name); // Guarda el nombre original del archivo

        // Llama a la función proporcionada por el padre para manejar el sonido cargado
        // Le pasamos un objeto con la misma estructura que en soundsData.js
        if (onSoundLoaded) {
          onSoundLoaded({
            id: `uploaded-${Date.now()}`, // ID único basado en el tiempo
            name: file.name.split('.').slice(0, -1).join('.'), // Nombre sin extensión
            category: 'Uploaded', // Una nueva categoría para sonidos subidos
            file: url,
            image: null,
          });
        }
      } else {
        alert('Por favor, selecciona un archivo de audio (MP3, WAV, OGG, etc.).');
        setUploadedSoundURL(null);
        setUploadedSoundName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Resetea el input de archivo
        }
      }
    }
  };

  return (
    <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-xl border-2 border-green-700 flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold text-green-400 mb-2 text-center">Upload Your Own Sound</h2>

      <input
        type="file"
        accept="audio/*" // Solo permite archivos de audio
        onChange={handleFileChange}
        ref={fileInputRef} // Asigna la referencia
        className="block w-full text-sm text-gray-300
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-green-50 file:text-green-700
                   hover:file:bg-green-100
                   cursor-pointer"
      />

      {uploadedSoundURL && (
        <div className="flex flex-col items-center gap-3 w-full">
          <h3 className="text-xl font-bold text-green-300">Preview: {uploadedSoundName}</h3>
          <audio controls src={uploadedSoundURL} className="w-full max-w-xs md:max-w-md"></audio>
        </div>
      )}
    </div>
  );
};

export default UploadSound;