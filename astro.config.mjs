import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(),
  build: {
    minify: true,
    outDir: 'dist',
  },
  publicDir: 'public',
});