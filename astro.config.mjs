import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { localOrders } from './scripts/local-orders';

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  vite: { plugins: [localOrders()] },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

