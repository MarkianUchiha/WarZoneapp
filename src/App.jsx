// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react'; // <-- Asegúrate de que useMemo esté importado
import { soundsData as initialSoundsData } from './data/soundsData';
import SoundButton from './components/Soundboton'; // Corregido según tu última info
import CategoryNav from './components/Category';    // Corregido según tu última info
import useSoundPlayer from './hooks/useSoundPlayer';
import UploadSound from './components/UploadSound';
import './index.css';

function App() {
  const { playSound } = useSoundPlayer();
  const [allAppSounds, setAllAppSounds] = useState(initialSoundsData);

  // Volvemos a calcular las categorías cada vez que los sonidos cambian
  const allCategories = useMemo(() => {
    return [...new Set(allAppSounds.map(sound => sound.category))];
  }, [allAppSounds]); // <-- ¡ESTO ES LO QUE FALTABA!

  const [currentCategory, setCurrentCategory] = useState(allCategories[0] || 'Alpha');

  // Si la categoría actual ya no existe (ej. si se borraron todos los sonidos de esa categoría),
  // volvemos a la primera disponible o a 'Alpha'
  useEffect(() => {
    if (!allCategories.includes(currentCategory) && allCategories.length > 0) {
      setCurrentCategory(allCategories[0]);
    } else if (allCategories.length === 0) {
        setCurrentCategory(''); // No hay categorías
    }
  }, [allAppSounds, allCategories, currentCategory]); // <-- Y este useEffect usa allCategories en sus deps

  const filteredSounds = allAppSounds.filter(sound => sound.category === currentCategory);

  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
  };

  const handleUploadedSound = (newSound) => {
    setAllAppSounds(prevSounds => [...prevSounds, newSound]);
    setCurrentCategory('Uploaded');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-white font-mono flex flex-col items-center py-8 px-4">
      <h1 className="text-6xl md:text-7xl font-extrabold mb-12 text-green-500 drop-shadow-lg text-center">
        MILITARY SOUNDBOARD
      </h1>

      <CategoryNav
        categories={allCategories}
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
        {filteredSounds.map(sound => (
          <SoundButton key={sound.id} sound={sound} onPlaySound={playSound} />
        ))}
      </div>

      <UploadSound onSoundLoaded={handleUploadedSound} />

      <footer className="mt-auto pt-16 text-gray-500 text-sm text-center">
        <p>&copy; 2025 Military Soundboard App. Designed with React & Tailwind CSS.</p>
        <p>Sounds from various public domain sources. For training purposes only.</p>
      </footer>
    </div>
  );
}

export default App;