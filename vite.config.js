// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Plugin esencial para que Vite funcione con React

// Importación de Tailwind CSS.
// Confirmado que esta es la forma correcta si usaste el plugin @tailwindcss/vite.
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Habilita el soporte para React JSX y Fast Refresh
    tailwindcss(), // Habilita el plugin de Tailwind CSS para Vite
  ],
});