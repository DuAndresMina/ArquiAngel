import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind()], // Cambiado para usar la integración correctamente
  adapter: vercel(),
  build: {
    minify: true,
    outDir: 'dist',
  },
  publicDir: 'public',
  experimental: {
    svg: {
      mode: 'sprite',
    }
  }
});