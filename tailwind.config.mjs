/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        'zoom': 'zoom 20s linear forwards',
        'typewriter': 'typewriter 2s steps(40) 1s 1 normal both',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#F27405',
        secondary: '#262223',
        neutral: '#F5F6F7',
      },
    },
  },
  plugins: [],
}