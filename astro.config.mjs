import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cleik.dev', 
  base: '/portfolio-arquitetura', 
  
  integrations: [
    react() 
  ],

  vite: {
    plugins: [
      tailwindcss(), 
    ],
  },

  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});