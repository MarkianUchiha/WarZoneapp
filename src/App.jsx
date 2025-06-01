// src/App.jsx
import React, { useState, useEffect } from 'react';
import { soundsData as initialSoundsData } from './data/soundsData'; // Renombramos la importación
import SoundButton from './components/Soundboton';
import CategoryNav from './components/Category';
import useSoundPlayer from './hooks/useSoundPlayer';
import UploadSound from './components/UploadSound'; // <-- ¡Importa el nuevo componente de subida!
import './index.css';

function App() {
  const { playSound } = useSoundPlayer();
  // Estado para la lista completa de sonidos, incluyendo los subidos por el usuario
  const [allAppSounds, setAllAppSounds] = useState(initialSoundsData);

  // Volvemos a calcular las categorías cada vez que los sonidos cambian
  const allCategories = [...new Set(allAppSounds.map(sound => sound.category))];
  const [currentCategory, setCurrentCategory] = useState(allCategories[0] || 'Alpha'); // Asegurarse de una categoría por defecto

  // Si la categoría actual ya no existe (ej. si se borraron todos los sonidos de esa categoría),
  // volvemos a la primera disponible o a 'Alpha'
  useEffect(() => {
    if (!allCategories.includes(currentCategory) && allCategories.length > 0) {
      setCurrentCategory(allCategories[0]);
    } else if (allCategories.length === 0) {
        setCurrentCategory(''); // No hay categorías
    }
  }, [allAppSounds, allCategories, currentCategory]);


  const filteredSounds = allAppSounds.filter(sound => sound.category === currentCategory);

  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
  };

  // Función para manejar el sonido subido por el componente UploadSound
  const handleUploadedSound = (newSound) => {
    // Añadimos el nuevo sonido a la lista de todos los sonidos
    setAllAppSounds(prevSounds => [...prevSounds, newSound]);
    // Opcional: Navegar a la categoría 'Uploaded' automáticamente
    setCurrentCategory('Uploaded');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-white font-mono flex flex-col items-center py-8 px-4">
      <h1 className="text-6xl md:text-7xl font-extrabold mb-12 text-green-500 drop-shadow-lg text-center">
        MILITARY SOUNDBOARD
      </h1>

      {/* Navegación de Categorías */}
      <CategoryNav
        categories={allCategories}
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Contenedor de Botones de Sonido */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
        {filteredSounds.map(sound => (
          <SoundButton key={sound.id} sound={sound} onPlaySound={playSound} />
        ))}
      </div>

      {/* Sección de Subida de Audio */}
      <UploadSound onSoundLoaded={handleUploadedSound} /> {/* <-- ¡Integra el componente de subida! */}

      {/* Sección de créditos o información adicional */}
      <footer className="mt-auto pt-16 text-gray-500 text-sm text-center">
        <p>&copy; 2025 Military Soundboard App. Designed with React & Tailwind CSS.</p>
        <p>Este proyecto esta desarrollado por MarkiDev.</p>
      </footer>
    </div>
  );
}

export default App;