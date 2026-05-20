// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config

export default defineConfig({
  site: 'https://www.karmalab.tech',
  base: '/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    allowedHosts: ['f6b1d13c9442.ngrok.app'],
  },
});
