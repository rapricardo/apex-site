/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        apex: {
          dark: '#0a0a0a',
          panel: '#121212',
          accent: '#10b981', // Emerald 500
          muted: '#525252',
        }
      }
    }
  },
  plugins: [],
}

