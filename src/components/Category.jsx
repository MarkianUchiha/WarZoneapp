// src/components/CategoryNav.jsx
import React from 'react';

const CategoryNav = ({ categories, currentCategory, onSelectCategory }) => {
  return (
    <nav className="mb-8 flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            py-3 px-6 rounded-full text-lg font-semibold uppercase tracking-wide
            transition duration-150 ease-in-out
            ${currentCategory === category
              ? 'bg-green-600 text-white shadow-lg border-2 border-green-700' // Estilo para la categoría activa
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600' // Estilo para categorías inactivas
            }
            focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-75
          `}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;